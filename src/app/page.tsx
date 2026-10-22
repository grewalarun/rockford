import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReelStage from "@/components/ReelStage";
import StudioMarquee from "@/components/StudioMarquee";
import SelectedWorks from "@/components/SelectedWorks";
import BehindTheDesign from "@/components/BehindTheDesign";
import Brands from "@/components/Brands";
import Orbit from "@/components/Orbit";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Header />
      <main>
        <Hero />
        <ReelStage />
        <StudioMarquee />
        <SelectedWorks />
        <BehindTheDesign />
        <Brands />
        <Orbit />
      </main>
      <Footer />
    </>
  );
}
