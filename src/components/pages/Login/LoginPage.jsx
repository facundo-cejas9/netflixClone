import React, { useState } from "react";
import "./Login.css";
import Logo from "../../../assets/logo.png";
import { login, signup } from "../../../firebase";
import netflix_spinner from "../../../assets/netflix_spinner.gif";

export default function LoginPage() {
  const [signState, setSignState] = useState("Crea tu cuenta");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signState === "Iniciar sesión") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="spinner">
      <img src={netflix_spinner} alt="Spinner" />
    </div>
  ) : (
    <div className="login">
      <img className="login-logo" src={Logo} alt="Netflix Logo" />
      {signState === "Iniciar sesión" ? (
        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={user_auth}>
            <input
              type="email"
              placeholder="Email o número de celular"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar Sesión</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label>Recuérdame</label>
              </div>
              <p>Necesitas ayuda?</p>
            </div>
          </form>
          <div className="form-switch">
            <p>
              ¿Primera vez en Netflix?
              <span onClick={() => setSignState("Crea tu cuenta")}>
                Súscribete ahora
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={user_auth}>
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
            />
            <input
              type="email"
              placeholder="Email o número de celular"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Crear Cuenta</button>
            <div className="form-help">
              <p>Necesitas ayuda?</p>
            </div>
          </form>
          <div className="form-switch">
            <p>
              ¿Ya tienes una cuenta?
              <span onClick={() => setSignState("Iniciar sesión")}>
                Inicia Sesión
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
