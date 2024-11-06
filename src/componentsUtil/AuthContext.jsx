import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

//Todo lo que el provider compartira,en vuelve a todo lo que se compartira
export const AuthProvider = ({ children }) => {
  const storedAuth =
    JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  // const[guardamosla variable,gurdamos la funcion que modifica ese estado]
  const [isAuthenticated, setisAuthenticated] = useState(storedAuth);

  const storeToken = localStorage.getItem("token") || null;
  const [token, setToken] = useState(storeToken);

  //Cuando alguien este en login se convierte en true
  //Creando la funcion login
  //Guradar booolean en un local storage para que no me bote de la pagina que dirigio login
  const login = (tokenparam) => {
    setToken(tokenparam);
    setisAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    //localStorage es una API de almacenamiento web proporcionada por los navegadores
    localStorage.setItem("token", tokenparam);
  };
  //Cuando alguien este en login se convierte en false
  //Borra el token
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    setisAuthenticated(false);
    setToken(null);
  };

  return (
    //Dentro de value son(todos los componentes que se compartiran los enviamos en un objeto)
    //Usamos el contexto par no hardcodear el ProtectedRoute
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Creamos nuestro propiO hook maraca advertencia no error
export const useAuth = () => {
  //provider esta dentro de UseAuth
  return useContext(AuthContext);
};
