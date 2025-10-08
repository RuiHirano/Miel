import { Box } from "@mui/material";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import FeaturesSection from "../components/home/FeaturesSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
    </Box>
  );
};

export default Home;
