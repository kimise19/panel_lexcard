import {
  Alert,
  Button,
  Card,
  Checkbox,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "/icon.webp";
import { register } from "../services/AccountService";
import { RegisterData } from "../models/User";

export function Register() {
  const [registerData, setRegisterData] = useState<RegisterData>({
    displayName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(registerData);
      console.log('Usuario registrado');
      setIsModalOpen(true); // Abre el modal
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(error.message);
      } else {
        setAlertMessage("Error al registrar el usuario");
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
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

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campo de Usuario */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="displayName" value="Nombre de usuario" />
            </div>
            <TextInput
              id="displayName"
              name="displayName"
              type="text"
              value={registerData.displayName}
              onChange={handleChange}
              placeholder="Ingrese su usuario"
              required
              className="bg-gray-100 dark:bg-gray-700 dark:text-white"
              autoComplete="username"
            />
          </div>

          {/* Campo de Correo */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Correo electrónico" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="Ingrese su correo"
              required
              className="bg-gray-100 dark:bg-gray-700 dark:text-white"
              autoComplete="email"
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Contraseña" />
            </div>
            <div className="relative">
              <TextInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={registerData.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                required
                className="bg-gray-100 dark:bg-gray-700 dark:text-white"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Recordar Usuario */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              className="focus:ring-0 ring-0"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <Label
              htmlFor="rememberMe"
              className="text-gray-900 dark:text-gray-300"
            >
              Recordarme
            </Label>
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

          {/* Botón de Registro */}
          <Button type="submit" className="w-full bg-primary-600">
            Registrar
          </Button>
        </form>

        {/* Enlace a Iniciar Sesión */}
        <div className="text-center">
          <Link to="/login" className="text-sm text-primary-600">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </Card>

      {/* Modal de Registro Exitoso */}
      <Modal show={isModalOpen} onClose={handleModalClose}>
        <Modal.Header>
          Registro Exitoso
        </Modal.Header>
        <Modal.Body className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          <p>Verifica tu correo para completar el registro.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;