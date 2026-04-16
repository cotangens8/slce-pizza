import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react/rsc";
import Hero from "@/components/blocks/Hero";
import Menu from "@/components/blocks/Menu";
import Slice from "@/components/blocks/Slice";
import About from "@/components/blocks/About";
import Locations from "@/components/blocks/Locations";
import Location from "@/components/blocks/Location";
import Page from "@/components/blocks/Page";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components: {
    page: Page,
    hero: Hero,
    menu: Menu,
    slice: Slice,
    about: About,
    locations: Locations,
    location: Location,
  },
});

export async function fetchStory(slug: string) {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "draft",
  });
  return data.story;
}