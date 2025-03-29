import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Test from "@/components/home/Test";

export default function Home() {
  return (
    <main className="main">
      <Header />
      <Hero />
      <Test />
      <Footer />
    </main>
  );
}
