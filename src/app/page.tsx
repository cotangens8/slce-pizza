import { StoryblokStory } from "@storyblok/react/rsc";
import { fetchStory } from "@/lib/storyblok";

export const revalidate = 0;

export default async function Home() {
  const story = await fetchStory("home");

  if (!story) {
    return (
      <main style={{ padding: 80, textAlign: "center", minHeight: "100vh" }}>
        <h1>No content found</h1>
      </main>
    );
  }

  return <StoryblokStory story={story} />;
}