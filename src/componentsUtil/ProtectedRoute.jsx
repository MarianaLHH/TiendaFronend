//Lo que hace es renderizar algo.
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

//Cuando un usuario no esta identificado enviamos a login
function ProtectedRoute() {
  //Deconstruyendo objeto
  const { isAuthenticated } = useAuth(); //useAuth es un hook
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // Otlet va rederizar todos los elementos que hay de por medio todo lo que sta en App.jsx.-->Route
  return <Outlet />;
}
export default ProtectedRoute;
