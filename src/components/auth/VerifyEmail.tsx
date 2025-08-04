import { Alert, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { Navigate, useSearchParams } from "react-router-dom";
import logo from "/icon.webp";
import { verifyEmail } from "../services/AccountService";
import CustomModal from "../utils/CustomModal";

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  if (!token) {
    return <Navigate to="*" />;
  }

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setSuccessMessage("Correo electrónico verificado correctamente");
        setAlertMessage(null);
        setTimeLeft(5);
      } catch (error) {
        if (error instanceof Error) {
          setAlertMessage(error.message);
        } else {
          setAlertMessage("Ocurrió un error desconocido");
        }
        setTimeLeft(5);
      }
    };
    verify();
  }, [token]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
      window.close();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) =>
        prevTime !== null && prevTime > 0 ? prevTime - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-sm w-full bg-white dark:bg-gray-800 shadow-md">
        {/* Logo */}
        <div className="text-center">
          <img
            src={logo}
            alt="Logo de la Aplicación"
            className="mx-auto mb-4 size-48"
          />
        </div>
        {/* Descripción del Componente */}
        <div className="text-center mb-4">
          <p className="text-gray-600 dark:text-gray-300">
            Verificando su correo electrónico
          </p>
          {timeLeft !== null && (
            <p className="mt-2 text-gray-700 dark:text-gray-400 text-sm">
              Cierre la pestaña en {timeLeft} segundos
            </p>
          )}
        </div>

        {/* Alert */}
        {alertMessage && (
          <Alert
            color="failure"
            icon={HiInformationCircle}
            onDismiss={() => setAlertMessage(null)}
            rounded
          >
            <span className="font-medium">Error:</span> {alertMessage}
          </Alert>
        )}

        {/* Modal de Éxito */}
        <CustomModal
          show={!!successMessage}
          onClose={() => setSuccessMessage("")}
          icon={HiCheckCircle}
          message={successMessage}
          iconColor="text-green-500"
        />
      </Card>
    </div>
  );
}

export default VerifyEmail;