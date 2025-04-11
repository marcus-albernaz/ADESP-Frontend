import Header from "../components/Header";
import { Card } from "@heroui/card";
import {
  FireIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { cardVariants, fadeUpTitle } from "../../core/animations/cardVariants";
import star from "../assets/star.png";
import returnIcon from "../assets/return.png";

export default function MenuGastronomico() {
  const menuItems = [
    {
      title: "Votação",
      description: "Veja o andamento da votação!",
      icon: <ClipboardDocumentListIcon className="w-6 h-6 text-white" />,
      bg: "#fb844a",
    },
    {
      title: "Restaurantes",
      description: "Gerenciar Restaurantes",
      icon: <BuildingStorefrontIcon className="w-6 h-6 text-pink-900" />,
      bg: "#ffeac9",
    },
    {
      title: "Pratos",
      description: "Gerenciar Pratos",
      icon: <FireIcon className="w-6 h-6 text-pink-900" />,
      bg: "#ffeac9",
    },
    {
      title: "Jurados",
      description: "Gerenciar Jurados",
      icon: <UserGroupIcon className="w-6 h-6 text-pink-900" />,
      bg: "#ffeac9",
    },
    {
      title: "Relatórios",
      description: "Ver Relatórios",
      icon: <DocumentTextIcon className="w-6 h-6 text-pink-900" />,
      bg: "#ffeac9",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col justify-start items-center py-6 px-5">
        <div className="w-full max-w-3xl">
          <motion.div
            className="flex items-center gap-3 mb-6"
            {...fadeUpTitle}
          >
            <img
              src={returnIcon}
              alt="Voltar"
              className="w-8 h-8 cursor-pointer"
              onClick={() => window.history.back()}
            />
            <h1 className="text-3xl font-bold text-[#fee9c9] font-title">
              Festival Gastronômico
            </h1>
          </motion.div>

          <div className="flex flex-col gap-4 w-full">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="whileHover"
                whileTap={cardVariants.whileTap}
                custom={index}
              >
                <Card
                  className="hover:shadow-lg cursor-pointer p-4 flex items-left relative"
                  style={{ backgroundColor: item.bg }}
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

                  {item.title === "Votação" ? (
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
