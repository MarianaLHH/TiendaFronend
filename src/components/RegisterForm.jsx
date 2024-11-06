import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function RegisterForm() {
  // Resitrar Usuario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  }); // useState(ESTADO INICIAL)
  const handleChangue = (e) => {
    const { name, value } = e.target; //Deconstruccion de objetos
    setFormData((prev) => ({
      ...prev, //spread operator
      [name]: value,
    }));
  };

  const registrarUsuario = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/auth/register", formData)
      .then((response) => {
        Swal.fire({
          title: "Usuario registrado",
          text: response.data.message,
          icon: "info",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: `Something went wrong: ${error.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  //type=submit no se borra permite que la pagina sea inclusiva
  return (
    <>
      <form>
        <label>Nombre:</label>
        <input
          onChange={handleChangue}
          value={formData.name}
          type="text"
          id="name"
          name="name"
          required
        />

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

        <label>Teléfono:</label>
        <input
          onChange={handleChangue}
          value={formData.phone}
          type="tel"
          id="phone"
          name="phone"
          required
        />

        <label>Rol:</label>
        <select
          onChange={handleChangue}
          value={formData.role}
          id="role"
          name="role"
          required
        >
          <option value="">Selecciona un rol</option>
          <option value="admin">Admin</option>
          <option value="userp">Usuario</option>
        </select>

        <button onClick={registrarUsuario} type="submit">
          Registrar
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
