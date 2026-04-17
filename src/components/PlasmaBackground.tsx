"use client";
import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_press;
uniform vec3 u_clicks[8];

float hash(vec2 p){ return fract(sin(dot(p, vec2(27.17, 91.3))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*u_res) / min(u_res.x, u_res.y);
  vec2 m  = (u_mouse - 0.5*u_res) / min(u_res.x, u_res.y);

  float t = u_time * 0.22;
  vec2 q = uv;

  vec2 d = uv - m;
  float dl = length(d);
  float pull = exp(-dl*2.0) * (0.5 + u_press*0.9);
  q += normalize(d + 1e-5) * pull * 0.28;

  for(int i=0;i<8;i++){
    vec3 c = u_clicks[i];
    if(c.z <= 0.0) continue;
    vec2 cp = (c.xy - 0.5*u_res)/min(u_res.x, u_res.y);
    float cd = distance(uv, cp);
    float wave = sin(cd*26.0 - c.z*6.0) * exp(-cd*3.0) * exp(-c.z*1.6);
    q += normalize(uv-cp+1e-5) * wave * 0.05;
  }

  vec2 p = q*1.35;
  vec2 w = vec2(fbm(p+t), fbm(p-t+3.2));
  float n = fbm(p + 2.6*w + t*0.55);

  vec3 c1 = vec3(0.00, 0.00, 0.00);
  vec3 c2 = vec3(0.07, 0.11, 0.16);
  vec3 c3 = vec3(0.30, 0.48, 0.66);
  vec3 c4 = vec3(0.92, 0.96, 1.00);
  vec3 col = mix(c1, c2, smoothstep(0.02, 0.38, n));
  col = mix(col, c3, smoothstep(0.40, 0.72, n));
  col = mix(col, c4, smoothstep(0.78, 1.0, n));

  col += exp(-dl*3.5) * 0.18 * vec3(0.7, 0.85, 1.0);

  float vg = smoothstep(1.6, 0.15, length(uv));
  col *= vg;

  col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.014;

  float lum = dot(col, vec3(0.30, 0.59, 0.11));
  col = mix(vec3(lum), col, 0.7);

  gl_FragColor = vec4(col, 1.0);
}`;

export default function PlasmaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) {
      canvas.style.background = "radial-gradient(ellipse at 50% 30%, #0b1220 0%, #000 70%)";
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src); gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(s));
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);

    const loc = gl.getAttribLocation(prog, "a_pos");
    const u_res = gl.getUniformLocation(prog, "u_res");
    const u_mouse = gl.getUniformLocation(prog, "u_mouse");
    const u_time = gl.getUniformLocation(prog, "u_time");
    const u_press = gl.getUniformLocation(prog, "u_press");
    const u_clicks = gl.getUniformLocation(prog, "u_clicks[0]");

    let W = 0, H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = Math.floor(W * DPR);
      canvas!.height = Math.floor(H * DPR);
    }
    window.addEventListener("resize", resize); resize();

    const mouse = { x: W * 0.5, y: H * 0.5, tx: W * 0.5, ty: H * 0.5 };
    let pressing = 0, pressTarget = 0;
    const clicks: { x: number; y: number; age: number }[] = [];
    const MAX_CLICKS = 8;

    const onMove = (e: PointerEvent) => { mouse.tx = e.clientX; mouse.ty = e.clientY; };
    const onDown = (e: PointerEvent) => {
      pressTarget = 1;
      clicks.push({ x: e.clientX * DPR, y: (H - e.clientY) * DPR, age: 0 });
      if (clicks.length > MAX_CLICKS) clicks.shift();
    };
    const onUp = () => { pressTarget = 0; };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerleave", onUp);

    const t0 = performance.now();
    let lastT = t0;
    let raf: number;
    const clickBuf = new Float32Array(MAX_CLICKS * 3);

    function render(now: number) {
      const dt = Math.max(0.001, (now - lastT) / 1000);
      lastT = now;
      const time = (now - t0) / 1000;

      const smooth = 1 - Math.pow(0.001, dt);
      mouse.x += (mouse.tx - mouse.x) * smooth;
      mouse.y += (mouse.ty - mouse.y) * smooth;
      pressing += (pressTarget - pressing) * Math.min(1, dt * 10);

      for (const c of clicks) c.age += dt;
      while (clicks.length && clicks[0].age > 3.5) clicks.shift();

      for (let i = 0; i < MAX_CLICKS; i++) {
        if (i < clicks.length) {
          clickBuf[i * 3] = clicks[i].x;
          clickBuf[i * 3 + 1] = clicks[i].y;
          clickBuf[i * 3 + 2] = clicks[i].age;
        } else {
          clickBuf[i * 3] = 0; clickBuf[i * 3 + 1] = 0; clickBuf[i * 3 + 2] = 0;
        }
      }

      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.useProgram(prog);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
      gl!.enableVertexAttribArray(loc);
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0);
      gl!.uniform2f(u_res, canvas!.width, canvas!.height);
      gl!.uniform2f(u_mouse, mouse.x * DPR, (H - mouse.y) * DPR);
      gl!.uniform1f(u_time, time);
      gl!.uniform1f(u_press, pressing);
      gl!.uniform3fv(u_clicks, clickBuf);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerleave", onUp);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", inset: 0,
          width: "100vw", height: "100vh",
          display: "block", zIndex: 0,
          pointerEvents: "none",
          opacity: 0.85,
        }}
      />
      {/* Dimming veil to keep text readable */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: `
          radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.7) 100%),
          linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))
        `,
      }} />
    </>
  );
}
