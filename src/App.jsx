import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Bienvenido a la plataforma</h1>
      <LoginForm />
      <SignUpForm />
    </div>
  );
}

export default App;
