import { createFileRoute } from "@tanstack/react-router";
import { TodaysSpecial } from "@/components/sections/TodaysSpecial";
import { MenuSection } from "@/components/sections/MenuSection";
import { siteConfig } from "@/siteConfig";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: `Menu - ${siteConfig.restaurantName}` },
      { name: "description", content: `See the menu at ${siteConfig.restaurantName}. Loaded burgers, sides, and drinks.` },
      { property: "og:title", content: `Menu - ${siteConfig.restaurantName}` },
      { property: "og:description", content: "Smash burgers, hot sides, and proper grill fuel." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <>
      <TodaysSpecial />
      <MenuSection />
    </>
  );
}
