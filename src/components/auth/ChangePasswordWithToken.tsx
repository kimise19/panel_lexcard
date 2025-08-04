import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { Navigate, useSearchParams } from "react-router-dom";
import logo from "/logo.webp";
import { changePasswordWithToken } from "../services/AccountService";
import CustomModal from "../utils/CustomModal";

export function ChangePasswordWithToken() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  if (!token) {
    return <Navigate to="*" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setAlertMessage("No se ha proporcionado la clave de seguridad necesaria");
      return;
    }
    if (newPassword !== confirmPassword) {
      setAlertMessage("Las contraseñas no coinciden");
      return;
    }
    if (newPassword === confirmPassword) {
      try {
        await changePasswordWithToken(token, newPassword);
        setSuccessMessage("Contraseña cambiada correctamente");
        setAlertMessage(null);
      } catch (error) {
        if (error instanceof Error) {
          setAlertMessage(error.message);
        } else {
          setAlertMessage("Ocurrió un error desconocido");
        }
      }
    }
  };

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
            Por favor, ingrese su nueva contraseña.
          </p>
        </div>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campo de Nueva Contraseña */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="newPassword" value="Nueva Contraseña" />
            </div>
            <div className="relative">
              <TextInput
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingrese su nueva contraseña"
                required
                className="bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="Confirmar Contraseña" />
            </div>
            <div className="relative">
              <TextInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita su nueva contraseña"
                required
                className="bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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

          {/* Botón de Enviar */}
          <Button type="submit" className="w-full bg-primary-600">
            Cambiar Contraseña
          </Button>
        </form>

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

export default ChangePasswordWithToken;
