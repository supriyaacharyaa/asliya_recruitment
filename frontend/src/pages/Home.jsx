import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/sections/HeroSection";
import TrustedCompanies from "../components/sections/TrustedCompanies";
import StatsSection from "../components/sections/StatsSection";
import AboutPreviewSection from "../components/sections/AboutPreviewSection";
import ServicesSection from "../components/sections/ServicesSection";
import RecruitmentProcessSection from "../components/sections/RecruitmentProcessSection";
import IndustriesSection from "../components/sections/IndustriesSection";
import ClientsSection from "../components/sections/ClientsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import WhyChooseUsSection from "../components/sections/WhyChooseUsSection";
import CTASection from "../components/sections/CTASection";

import { industriesData, clientsData, testimonialsData } from "../mockData";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <TrustedCompanies />
        <StatsSection />
        <AboutPreviewSection />
        <ServicesSection />
        <RecruitmentProcessSection />
        <IndustriesSection industries={industriesData} />
        <ClientsSection clients={clientsData} />
        <TestimonialsSection testimonials={testimonialsData} />
        <WhyChooseUsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
