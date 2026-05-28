import { createFileRoute } from "@tanstack/react-router";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { siteConfig } from "@/siteConfig";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: `Reservations - ${siteConfig.restaurantName}` },
      { name: "description", content: `Book a table at ${siteConfig.restaurantName}. Big crews and private events welcome.` },
      { property: "og:title", content: `Reservations - ${siteConfig.restaurantName}` },
      { property: "og:description", content: "Lock in your table and we'll sort the rest." },
    ],
  }),
  component: () => <ReservationForm />,
});
