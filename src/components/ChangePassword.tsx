import { Alert, Breadcrumb, Button, Label, TextInput } from "flowbite-react";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  HiCheckCircle,
  HiInformationCircle,
  HiLockClosed,
} from "react-icons/hi";
import { changePassword } from "./services/AccountService";
import CustomModal from "./utils/CustomModal";

const ChangePassword: FC = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      await changePassword(newPassword);
      setErrorMessage(null);
      setNewPassword("");
      setConfirmPassword("");
      setShowSuccessModal(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocurrió un error desconocido");
      }
    }
  };

  return (
    <>
      <div className="mx-4 mt-4">
        <Breadcrumb>
          <Breadcrumb.Item icon={HiLockClosed}>Seguridad</Breadcrumb.Item>
          <Breadcrumb.Item>Cambiar contraseña</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="flex flex-col mx-4 mt-4 space-y-4">
        {/* Columna 1 */}
        <div className="w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Información de contraseña
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="sr-only">
                <Label htmlFor="username" value="Nombre de usuario" />
                <TextInput
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
              <div>
                <Label htmlFor="new-password" value="Nueva contraseña" />
                <div className="relative">
                  <TextInput
                    type={showNewPassword ? "text" : "password"}
                    name="new-password"
                    id="new-password"
                    placeholder="••••••••"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
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
              <div>
                <Label
                  htmlFor="confirm-password"
                  value="Confirmar contraseña"
                />
                <div className="relative">
                  <TextInput
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
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
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Requisitos de contraseña:
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                  <li>Al menos 8 caracteres (y hasta 24 caracteres)</li>
                  <li>Al menos un carácter en mayúscula</li>
                  <li>Al menos un carácter en minúscula</li>
                  <li>Y menos un número</li>
                </ul>
              </div>
              {errorMessage && (
                <div className="mt-4">
                  <Alert
                    color="failure"
                    icon={HiInformationCircle}
                    onDismiss={() => setErrorMessage(null)}
                    rounded
                  >
                    <span className="font-medium">Error:</span> {errorMessage}
                  </Alert>
                </div>
              )}
              <div>
                <Button type="submit" color="blue" size="mc">
                  Guardar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <CustomModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        icon={HiCheckCircle}
        message="Contraseña cambiada correctamente"
        iconColor="text-green-500"
      />
    </>
  );
};

export default ChangePassword;
