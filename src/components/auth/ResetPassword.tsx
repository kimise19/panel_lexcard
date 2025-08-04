import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "/logo.webp";
import { resetPassword } from "../services/AccountService";
import CustomModal from "../utils/CustomModal";

export function ResetPassword() {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setSuccessMessage("Correo de restablecimiento enviado correctamente");
      setAlertMessage(null);
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(error.message);
      } else {
        setAlertMessage("Ocurrió un error desconocido");
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
            Por favor, ingrese su correo electrónico para restablecer su
            contraseña.
          </p>
        </div>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campo de Email */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Correo Electrónico" />
            </div>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              required
              className="bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
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
            Enviar
          </Button>
        </form>

        {/* Enlace Olvidé mi Contraseña */}
        <div className="text-center">
          <Link to="/" className="text-sm text-primary-600">
            Regresar al Inicio
          </Link>
        </div>
      </Card>

      {/* Modal de Éxito */}
      <CustomModal
        show={!!successMessage}
        onClose={() => setSuccessMessage("")}
        icon={HiCheckCircle}
        message={successMessage}
        iconColor="text-green-500"
      />
    </div>
  );
}

export default ResetPassword;
