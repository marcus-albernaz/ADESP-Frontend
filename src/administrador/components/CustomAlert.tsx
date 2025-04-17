import { Alert } from "@heroui/alert";
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

type AlertType = "success" | "error";

interface CustomAlertProps {
  type: AlertType;
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function CustomAlert({
  type,
  title,
  message,
  isVisible,
  onClose,
}: CustomAlertProps) {
  const Icon = type === "success" ? CheckCircleIcon : ExclamationTriangleIcon;
  const textClass = type === "success" ? "text-green-700" : "text-red-700";
  const foregroundClass = type === "success" ? "text-green-600" : "text-red-600";

  return (
    <Alert
      color={type === "success" ? "success" : "danger"}
      variant="faded"
      isVisible={isVisible}
      isClosable
      onClose={onClose}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl md:max-w-2xl rounded-lg shadow-lg py-5 bg-white"
      icon={<Icon className={`w-15 h-15 ${foregroundClass}`} />} // Aumentando o ícone aqui
    >
      <div className="text-left">
        <h3 className={`font-semibold text-base ${textClass}`}>{title}</h3>
        <p className={`text-sm ${foregroundClass}`}>{message}</p>
      </div>
    </Alert>
  );
}
