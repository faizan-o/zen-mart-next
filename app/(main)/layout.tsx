import { auth } from "@/auth";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default ProtectedLayout;
