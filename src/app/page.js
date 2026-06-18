import FeaturedSection from "@/components/home/FeaturedSection";
import HeroBanner from "@/components/home/HeroBanner";
import HowItWorks from "@/components/home/HowItWorks";
import Image from "next/image";

export default function Home() {
  return (
  <>
  <HeroBanner/>
  <FeaturedSection/>
  <HowItWorks/>
  </>
  );
}
