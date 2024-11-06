import axios from "axios"; //Biblioteca para hacer solicitudes HTTP
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../componentsUtil/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  // Estado inicial para el email y password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Creando hooks
  const { login } = useAuth();
  const navigate = useNavigate(); //Redirige a otra pagina

  // Manejar los cambios en el input
  const handleChangue = (e) => {
    //Destructuracion
    const { name, value } = e.target; //.target solo es una propiedad de la estructura de e. ,puede llevar otro nombre
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para iniciar sesión
  const iniciarSesion = (e) => {
    e.preventDefault(); //evita que el formulario se envie de manera tradicional
    axios
      .post("http://localhost:8000/auth/login", formData) // Llamada al endpoint de login
      .then((response) => {
        // Si el login es exitoso, recibimos el token y los datos del usuario
        const { token, user } = response.data; //token y user viene d emi backend

        // Guardar el token en el localStorage
        //("token->es la clave",token->es el valor)

        login(token);
        navigate("/ejemplo");
        // Mostrar mensaje de éxito...............................................................................................................................................
        // Swal.fire({
        //   title: "Login exitoso",
        //   text: `Bienvenido ${user.name}`, //...............................user ES DE MI AUTHCONTROLLER DE MI BACK?
        //   icon: "success",
        //   confirmButtonText: "OK",
        // });

        // Aquí podrías redirigir al usuario a otra página, por ejemplo:
        // window.location.href = "/dashboard";
      })
      .catch((error) => {
        // Manejar errores
        Swal.fire({
          title: "Error!",
          text: `Error al iniciar sesión: ${error.response.data.error}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <>
      <form>
        <label>Email:</label>
        <input
          onChange={handleChangue}
          value={formData.email}
          type="email"
          id="email"
          name="email"
          required
        />

        <label>Contraseña:</label>
        <input
          onChange={handleChangue}
          value={formData.password}
          type="password"
          id="password"
          name="password"
          required
        />

        <button onClick={iniciarSesion} type="submit">
          Iniciar sesión
        </button>
      </form>
    </>
  );
}
export default LoginForm;
