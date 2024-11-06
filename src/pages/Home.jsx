import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../componentsUtil/AuthContext";

function Home() {
  const { token } = useAuth();
  const [propiedades, setPropiedades] = useState([]); //Deconstruccion
  const consultarPropiedades = () => {
    axios
      .get("http://localhost:8000/property/", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPropiedades(response.data.propertys);
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
  useEffect(() => {
    consultarPropiedades();
  }, []);
  //Ahora se utiliza propiedad._id como clave única para cada propiedad
  return (
    <>
      <h1>Home</h1>
      <div className="container">
        {propiedades.map((propiedad) => (
          <div className="item" key={propiedad._id}>
            <h2>{propiedad.title}</h2>
            <p>Descripcio:{propiedad.description}</p>
            <p>Precio:{propiedad.price} $</p>
            <p>Ubicacion:{propiedad.location}</p>
          </div>
        ))}
        {/* <div className="item">Item1</div>
        <div className="item">Item2</div> */}
      </div>
    </>
  );
}
export default Home;
