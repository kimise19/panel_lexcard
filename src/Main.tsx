import { Flowbite } from "flowbite-react";
import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserProvider} from "./context/UserContext";
import {useUser } from "./context/useUser";
import Login from "./components/auth/Login";
import { Register } from "./components/auth/Register";

import DashboardPage from "./components/Dashboard";
import Dashboard from "./components/admin/componentsAdmin/Dashboard";
import QuestionComponet from "./components/admin/componentsAdmin/question/Question";
import CreateCategory from "./components/admin/componentsAdmin/category/CreateCategory";
import SubcategoryComponent from "./components/admin/componentsAdmin/subcategory/Subcategory";
import TestComponent from "./components/admin/componentsAdmin/test/Test";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/utils/ScrollToTop";
import theme from "./FlowbiteTheme";
import NavbarSidebarLayout from "./layouts/NavbarSidebar";
import "./styles/Index.css";

const ChangePassword = lazy(() => import("./components/ChangePassword"));
const ChangePasswordWithToken = lazy(() => import("./components/auth/ChangePasswordWithToken"));
const Case = lazy(() => import("./components/cases/Case"));
const Trophie = lazy(() => import("./components/trophies/Trophie"));
const NotFound = lazy(() => import("./components/NotFound"));
const Notification = lazy(() => import("./components/Notification"));
const Learning = lazy(() => import("./components/learning/Learning"));
const Review = lazy(() => import("./components/review/Review"));
const SavedQuestion = lazy(() => import("./components/saved _questions/SavedQuestion"));
const Profile = lazy(() => import("./components/Profile"));
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));
const Setting = lazy(() => import("./components/app/Setting"));
const VerifyEmail = lazy(() => import("./components/auth/VerifyEmail"));
const Ask = lazy(() => import("./components/ask/Ask"));
const Test = lazy(() => import("./components/test/Test"));
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions"));

const container = document.getElementById("root");

if (!container) {
  throw new Error("¡El elemento root de React no existe!");
}

const root = createRoot(container);

const App = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Cargando...</div>; // Puedes personalizar este mensaje o agregar un spinner
  }

  return (
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <ScrollToTop />
        {user ? (
          <NavbarSidebarLayout>
            <Routes>
              {user.roles.includes('ADMINISTRADOR') && (
                <>
                  <Route path="/" element={<Dashboard />} index />
                  <Route path="/createask" element={<QuestionComponet />} />
                  <Route path="/createcategory" element={<CreateCategory />} />
                  <Route path="/createsubcategory" element={<SubcategoryComponent />} />
                  <Route path="/createtest" element={<TestComponent />} />
                </>
              )}
              {user.roles.includes('USUARIO') && (
                <>
                  <Route path="/" element={<DashboardPage />} index />
                  <Route path="/ask" element={<Ask />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/case" element={<Case />} />
                  <Route path="/learning" element={<Learning />} />
                  <Route path="/review" element={<Review />} />
                  <Route path="/savedquestion" element={<SavedQuestion />} />
                  <Route path="/trophi" element={<Trophie />} />
                </>
              )}
              {/* Rutas comunes para ambos roles */}
              <Route path="/notification" element={<Notification />} />
              <Route path="/security/change-password" element={<ChangePassword />} />
              <Route path="/configuration/profile" element={<Profile />} />
              <Route path="/configuration/setting" element={<Setting />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </NavbarSidebarLayout>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/change-password" element={<ChangePasswordWithToken />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </Flowbite>
  );
};

export default App;

root.render(
  <StrictMode>
    <UserProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </UserProvider>
  </StrictMode>
);