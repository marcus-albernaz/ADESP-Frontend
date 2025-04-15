import { Alert } from "@heroui/alert";
import tick_circle from "../assets/tick_circle.png";
import error_icon from "../assets/warning.png";

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
  const icon = type === "success" ? tick_circle : error_icon;
  const textClass = type === "success" ? "text-green-700" : "text-red-700";
  const foregroundClass = type === "success" ? "text-green-600" : "text-red-600";

  return (
    <Alert
      hideIconWrapper
      color={type === "success" ? "success" : "danger"}
      variant="faded"
      isVisible={isVisible}
      isClosable
      onClose={onClose}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-xl md:max-w-2xl rounded-md shadow-lg px-4 py-2"
    >
      <div className="flex items-center gap-3 w-full">
        <img src={icon} alt={type} className="h-5 w-5" />
        <div className="w-full text-left">
          <h3 className={`font-semibold text-base ${textClass}`}>{title}</h3>
          <p className={`text-sm ${foregroundClass}`}>{message}</p>
        </div>
      </div>
    </Alert>
  );
}
