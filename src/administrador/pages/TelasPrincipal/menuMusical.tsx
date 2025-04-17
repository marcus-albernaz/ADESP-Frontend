import Header from "../../components/Header";
import { Card } from "@heroui/card";
import {
  UserGroupIcon,
  MusicalNoteIcon,
  ClipboardDocumentListIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  UserIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { cardVariants, fadeUpTitle } from "../../../core/animations/cardVariants";
import star from "../../assets/star.png";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../context/UserContext";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

export default function MenuMusical() {
  const { userRole } = useUser();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Votação",
      description: "Participe da votação por aqui!",
      icon: <ClipboardDocumentListIcon className="w-6 h-6 text-white" />,
      bg: "#fb844a",
      isSpecial: true,
      route: "/voting/vote",
      roleRequired: "jurado",
    },
    {
      title: "Artistas",
      description: "Gerenciar Artistas",
      icon: <UserIcon className="w-6 h-6 text-pink-900" />,
      bg: "#ffeac9",
      route: "/admin/artistas",
    },
    {
      title: "Músicas",
      description: "Gerenciar Artistas",
      icon: <MusicalNoteIcon className="w-6 h-6 text-pink-900" />,
      bg: "#ffeac9",
      route: "/admin/musicas",
    },
    {
      title: "Gerar QRCodes",
      description: "Gerenciar QRCodes",
      icon: <QrCodeIcon className="w-6 h-6 text-pink-900" />,
      bg: "#ffeac9",
      route: "/admin/gerar-qrcodes-musical",
      roleRequired: "administrador",
    },
    {
      title: "Jurados",
      description: "Gerenciar Jurados",
      icon: <UserGroupIcon className="w-6 h-6 text-pink-900" />,
      bg: "#ffeac9",
      route: "/admin/jurados",
      roleRequired: "administrador",
    },
    {
      title: "Relatórios",
      description: "Ver Relatórios",
      icon: <DocumentTextIcon className="w-6 h-6 text-pink-900" />,
      bg: "#ffeac9",
      route: "/admin/relatoriosMusical",
      roleRequired: "administrador",
    },
  ];

  const filteredMenuItems = menuItems.filter(item => !item.roleRequired || item.roleRequired === userRole);

  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col justify-start items-center py-6 px-5">
        <div className="w-full max-w-3xl">
          <motion.div className="flex items-center gap-3 mb-6" {...fadeUpTitle}>
            <Button
              onClick={() => window.history.back()}
              className="bg-[#FB844A] rounded-md px-1.5 py-0.5 text-white text-sm flex items-center w-10 min-w-0"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold text-[#fee9c9] font-title">
              Festival Musical
            </h1>
          </motion.div>

          <div className="flex flex-col gap-4 w-full">
            {filteredMenuItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="whileHover"
                whileTap={cardVariants.whileTap}
                custom={index}
                onClick={() => navigate(item.route)}
              >
                <Card
                  className="hover:shadow-lg cursor-pointer p-4 flex items-left relative"
                  style={{ backgroundColor: item.bg }}
                  onClick={() => (window.location.href = item.route)}
                >
                  <div className="flex items-center gap-4 pr-10">
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

                  {item.isSpecial ? (
                    <img
                      src={star}
                      alt="Estrela"
                      className="w-12 h-12 absolute right-4 top-1/2 -translate-y-1/2"
                    />
                  ) : (
                    <ChevronRightIcon
                      className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2"
                    />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
