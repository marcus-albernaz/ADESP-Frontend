import Header from "../components/Header"; // ajuste o caminho se necessário
import { Card } from "@heroui/card";
import {
  UserGroupIcon,
  MusicalNoteIcon,
  FireIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function AdminMenu() {
  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] p-5">
        <div className="w-full max-w-3xl">
          {/* Título alinhado à esquerda */}
          <h1 className="text-2xl font-bold text-[#fee9c9] mb-6 font-space">
            Menu
          </h1>

          {/* Lista centralizada */}
          <div className="flex flex-col gap-4 w-full">
            <Card className="hover:shadow-lg cursor-pointer p-4 bg-[#ffeac9] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FireIcon className="w-6 h-6 text-pink-900" />
                <div>
                  <h2 className="text-lg font-semibold text-black font-space">
                    Festival Gastronômico
                  </h2>
                  <p className="text-sm text-gray-500 font-space">
                    Gerenciar Festival Gastronômico
                  </p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-500 ml-4" />
            </Card>

            <Card className="hover:shadow-lg cursor-pointer p-4 bg-[#ffeac9] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MusicalNoteIcon className="w-6 h-6 text-pink-900" />
                <div>
                  <h2 className="text-lg font-semibold text-black font-space">
                    Festival Musical
                  </h2>
                  <p className="text-sm text-gray-500 font-space">
                    Gerenciar Festival Musical
                  </p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-500 ml-4" />
            </Card>

            <Card className="hover:shadow-lg cursor-pointer p-4 bg-[#ffeac9] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <UserGroupIcon className="w-6 h-6 text-pink-900" />
                <div>
                  <h2 className="text-lg font-semibold text-black font-space">
                    Administradores
                  </h2>
                  <p className="text-sm text-gray-500 font-space">
                    Gerenciar Administradores
                  </p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-500 ml-4" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
