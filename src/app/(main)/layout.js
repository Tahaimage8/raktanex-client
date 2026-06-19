import Navbar from "@/components/shared/Navbar";
import FooterSection from "@/components/shared/FooterSection";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <FooterSection />
    </>
  );
};

export default MainLayout;