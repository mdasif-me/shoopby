import { BrandStrip } from "@/components/home/brand-strip";
import { CustomerReviewsSection } from "@/components/home/customer-reviews-section";
import { DressStyleSection } from "@/components/home/dress-style-section";
import { HeroSection } from "@/components/home/hero-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { TopSellingSection } from "@/components/home/top-selling-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BrandStrip />
      <NewArrivalsSection />
      <TopSellingSection />
      <DressStyleSection />
      <CustomerReviewsSection />
    </main>
  );
}
