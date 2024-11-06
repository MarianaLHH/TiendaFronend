import { Route, Routes, BrowserRouter } from "react-router-dom"; //Se importa Route
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import Ejemplo from "./pages/Ejemplo";
import ProtectedRoute from "./componentsUtil/ProtectedRoute";
import { AuthProvider } from "./componentsUtil/AuthContext";

function App() {
  return (
    //Todo lo que esta en AuthProvider accedera a mi contexto
    <AuthProvider>
      <h1>Bienvenido a la plataforma</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* Usamos el nuevo componente ProtectedRoute ,son tutas protegidas siguiendo lo que esta en mi componente ProtectedRoute*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/ejemplo" element={<Ejemplo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
