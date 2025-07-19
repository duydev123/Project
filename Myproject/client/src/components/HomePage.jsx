import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
//
//
//
function HomePage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="container">
      <div>
        {mode === "login" && (
          <div className="left">
            <h1>Login</h1>
            <form>
              <div>
                <FontAwesomeIcon icon={faUser} />
                <label>Username</label>
              </div>
              <input type="text" placeholder="Enter Username"></input>
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <label>Email</label>
              </div>
              <input type="text" placeholder="Enter Email"></input>
              <div>
                <FontAwesomeIcon icon={faLock} />
                <label>PassWord</label>
              </div>
              <input type="text" placeholder="Enter Password"></input>
              <label>Email</label>
            </form>
            <button onClick={() => setMode("register")}>Go to Register</button>
            <button onClick={() => setMode("forgot")}>Forgot Password</button>
          </div>
        )}
        {mode === "register" && (
          <div className="left">
            <h1>Login</h1>
            <button onClick={() => setMode("login")}>Go to Register</button>
          </div>
        )}
        {mode === "forgot" && (
          <div className="left">
            <h1>Login</h1>
            <button onClick={() => setMode("register")}>Go to Register</button>
            <button onClick={() => setMode("forgot")}>Forgot Password</button>
          </div>
        )}
      </div>
      <div className="right"></div>
    </div>
  );
}
export default HomePage;
