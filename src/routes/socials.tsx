import { createFileRoute } from "@tanstack/react-router";
import { EventsList, GallerySection, PrivateHireCTA } from "@/components/sections/EventsAndGallery";
import { siteConfig } from "@/siteConfig";

export const Route = createFileRoute("/socials")({
  head: () => ({
    meta: [
      { title: `Socials & Private Hire - ${siteConfig.restaurantName}` },
      { name: "description", content: `What's on, private hire, and gallery moments at ${siteConfig.restaurantName}.` },
      { property: "og:title", content: `Socials at ${siteConfig.restaurantName}` },
      { property: "og:description", content: "Social nights, private hire, and loud good times at the joint." },
    ],
  }),
  component: SocialsPage,
});

function SocialsPage() {
  if (!siteConfig.sections.socials) return null;
  return (
    <>
      <EventsList />
      <GallerySection />
      <PrivateHireCTA />
    </>
  );
}
