import Header from "@/core/components/Header";
import Footer from "@/core/components/Footer";
import banner from "/Banner_Principal.png";
import { useDisclosure } from "@heroui/modal";
import LoginForm from "@/authentication/components/LoginForm";
import RecoveryForm from "@/authentication/components/RecoveryForm";

export default function LoginPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div className="flex flex-col min-h-screen relative bg-[#2B1E49]">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-2xl">
          <div className="flex justify-center mb-6">
            <img
              src={banner}
              alt="Banner do Evento"
              className="w-full h-auto object-contain sm:w-3/4 md:w-full"
            />
          </div>
          <LoginForm onOpen={onOpen} openAction={onOpen}/>
          <RecoveryForm isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}/>
        </div>
      </div>

      <Footer />
    </div>
  );
}
