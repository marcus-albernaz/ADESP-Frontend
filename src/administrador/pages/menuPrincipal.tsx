import Header from "../components/Header";
import { Card } from "@heroui/card";

import {
  UserGroupIcon,
  MusicalNoteIcon,
  FireIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { cardVariants, fadeUpTitle } from "../../core/animations/cardVariants";
import { useNavigate } from "react-router-dom";

export default function AdminPrincipal() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Festival Gastronômico",
      description: "Gerenciar Festival Gastronômico",
      icon: <FireIcon className="w-6 h-6 text-pink-900" />,
      route: "/admin/menuGastronomico",
    },
    {
      title: "Festival Musical",
      description: "Gerenciar Festival Musical",
      icon: <MusicalNoteIcon className="w-6 h-6 text-pink-900" />,
      route: "/admin/menuMusical",
    },
    {
      title: "Administradores",
      description: "Gerenciar Administradores",
      icon: <UserGroupIcon className="w-6 h-6 text-pink-900" />,
      route: "/admin/MenuAdmin",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col justify-start items-center py-6 px-5">
        <div className="w-full max-w-3xl">
          <motion.h1
            className="text-3xl font-bold text-[#fee9c9] mb-6 font-title"
            initial={fadeUpTitle.initial}
            animate={fadeUpTitle.animate}
            transition={fadeUpTitle.transition}
          >
            Menu
          </motion.h1>

          <div className="flex flex-col gap-4 w-full">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="whileHover"
                whileTap="whileTap"
                custom={index}
                onClick={() => navigate(item.route)}
                className="cursor-pointer bg-[#ffeac9] p-4 flex items-center justify-between rounded-xl"
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <div>
                    <h2 className="text-lg font-semibold text-black font-title">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-700 font-title">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
              </motion.div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
