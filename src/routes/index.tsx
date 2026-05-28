import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TodaysSpecial } from "@/components/sections/TodaysSpecial";
import { Reviews } from "@/components/sections/Reviews";
import { Newsletter } from "@/components/sections/Newsletter";
import { siteConfig } from "@/siteConfig";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.restaurantName} | Crafted with Fire, Served with Heart` },
      { name: "description", content: `Ziggy's Burger Joint serves bold burgers, hot grills, and loud local energy.` },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <About />
      <TodaysSpecial />
      <Reviews />
      <Newsletter />
    </>
  );
}
