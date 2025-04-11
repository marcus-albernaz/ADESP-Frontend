import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarIcon } from "@heroui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "/Logo_Festival1.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const userName = "João Silva";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/auth/signin");
  };

  return (
    <div
      className="flex justify-between items-center px-3 py-4 mb-8"
      ref={ref}
    >
      <img
        src={logo}
        alt="Logo Festival"
        className="h-20 cursor-pointer"
        onClick={() => navigate("/admin/menuPrincipal")}
      />


      {/* Avatar e Dropdown */}
      <div className="relative">
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          <Avatar>
            <AvatarIcon />
          </Avatar>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-10 p-4"
            >
              <p className="text-black font-semibold font-grotesk mb-2">
                {userName}
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-[#e72708] text-white py-1 px-3 rounded-lg hover:bg-[#810808] transition"
              >
                Sair
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
