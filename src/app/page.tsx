import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Menu } from "@/components/sections/menu";
import { Order } from "@/components/sections/order";
import { Reviews } from "@/components/sections/reviews";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Menu />
      <Highlights />
      <Order />
      <Gallery />
      <Reviews />
      <Contact />
    </div>
  );
}
