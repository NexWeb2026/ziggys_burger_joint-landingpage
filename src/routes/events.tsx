import { createFileRoute } from "@tanstack/react-router";
import { EventsList, GallerySection, PrivateHireCTA } from "@/components/sections/EventsAndGallery";
import { siteConfig } from "@/siteConfig";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: `Events & Private Hire - ${siteConfig.restaurantName}` },
      { name: "description", content: `What's on, private hire, and big group nights at ${siteConfig.restaurantName}.` },
      { property: "og:title", content: `Events at ${siteConfig.restaurantName}` },
      { property: "og:description", content: "Events, parties, and loud good times at the joint." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <>
      <EventsList />
      <GallerySection />
      <PrivateHireCTA />
    </>
  );
}
