import { createFileRoute } from "@tanstack/react-router";
import { ContactDetails, EventEnquiryForm, LocationSection } from "@/components/sections/Contact";
import { siteConfig } from "@/siteConfig";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact & Find Us - ${siteConfig.restaurantName}` },
      { name: "description", content: `Hit up ${siteConfig.restaurantName} for bookings, directions, and delivery info.` },
      { property: "og:title", content: `Contact ${siteConfig.restaurantName}` },
      { property: "og:description", content: "Call, message, or find us. We'll point you to the grill." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <ContactDetails />
      <EventEnquiryForm />
      <LocationSection />
    </>
  );
}
