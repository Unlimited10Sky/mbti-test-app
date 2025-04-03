import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Test from "@/components/home/Test";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="main">
      <Header />
      <Hero />
      <Features />
      <Test />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
