import HeroSection from "@/components/home/hero";
import ProductsSection from "@/components/home/home-products-section";
import PromiseSection from "@/components/home/promise-section/promise-section";

const Home = async () => {
  return (
    <main className="">
      <HeroSection />
      <ProductsSection />
      <PromiseSection />
    </main>
  );
};

export default Home;
