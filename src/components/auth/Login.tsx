import {Alert,Button,Card,Checkbox,Label,TextInput} from "flowbite-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "/icon.webp";
import { login } from "../services/AccountService";
import { useUser } from "../../context/useUser"; // Importa useUser
import { getProfile } from "../services/AccountService"; // Importa la función getProfile


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Intentando iniciar sesión...");
      await login(email, password);
      console.log("Inicio de sesión exitoso, redirigiendo...");
      const profile = await getProfile();
      setUser(profile);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error de inicio de sesión:", error.message);
        setAlertMessage(error.message);
      } else {
        console.error("Error de inicio de sesión: Credenciales incorrectas");
        setAlertMessage("Credenciales incorrectas");
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

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campo de Usuario */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Usuario" />
            </div>
            <TextInput
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su usuario"
              required
              className="bg-gray-100 dark:bg-gray-700 dark:text-white"
              autoComplete="email"
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Contraseña" className="mb-2" />{" "}
            </div>
            <div className="relative">
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Botón de Ingreso */}
          <Button type="submit" className="w-full bg-primary-600">
            Ingresar
          </Button>
        </form>

        {/* Enlace Olvidé mi Contraseña */}
        <div className="text-center">
          <Link to="/reset-password" className="text-sm text-primary-600">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="text-center">
          <Link to="/register" className="text-sm text-primary-600">
            ¿Aún no tieens cuenta? Regístrate
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;
