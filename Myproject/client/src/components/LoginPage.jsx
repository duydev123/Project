import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import styles from '../style/LoginPage.module.css';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
//
//
//
function LoginPage() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nagivate = useNavigate();
  const handlesubmit = async (e) =>
  {
    e.preventDefault();
    let url = '';
    let datamode = {};
    if(mode === 'login') 
    {
      url = 'https://server-67ff.onrender.com/login'
      datamode = {username,password}
    }
    else if(mode === 'register' )
    {
       url = "https://server-67ff.onrender.com/register";
       datamode = { username, email , password };
    }
    else if(mode === 'forgot')
    {
      url = 'https://server-67ff.onrender.com/forgot'
      datamode = {username,email};
    }
    try {
      const res = await fetch(url ,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(datamode),
      });
      const data = await res.json();
      console.log(data);
      if(data.success) {
        localStorage.setItem('username' , data.username);
        alert(data.message);
        nagivate('/file');
      }
      else if(!data.success) alert(data.message);
    }
      catch (err)
      {
        console.error(err);
      }
  };
  return (
    <>
      <Helmet>
        <title>Socket: Login</title>
      </Helmet>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <div>
            {mode === "register" && (
              <div className={styles.left}>
                <h1>Create An Account</h1>
                <form>
                  <div>
                    <FontAwesomeIcon className={styles.icon} icon={faUser} />
                    <label>Username</label>
                  </div>
                  <input type="text" placeholder="Enter Username.." value = {username} onChange={(e) => setUsername(e.target.value)}></input>
                  <div>
                    <FontAwesomeIcon className={styles.icon}icon={faEnvelope}/>
                    <label>Email</label>
                  </div>
                  <input type="text" placeholder="Enter Email.." value={email} onChange={(e) => setEmail(e.target.value)}></input>
                  <div>
                    <FontAwesomeIcon className={styles.icon} icon={faLock} />
                    <label>Password</label>
                  </div>
                  <input type="password" placeholder="Enter Password.." value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </form>
                <button type="submit" onClick={handlesubmit}>Submit</button>
                <div className={styles.btn}>
                  <button onClick={() => setMode("login")}>Login Now</button>
                  <button onClick={() => setMode("forgot")}>Forgot Password ?</button>
                </div>
              </div>
            )}
            {mode === "login" && (
              <div className={styles.left}>
                <h1>Login</h1>
                <form>
                  <div>
                    <FontAwesomeIcon className={styles.icon} icon={faUser} />
                    <label>Username</label>
                  </div>
                  <input type="text" placeholder="Enter Username.." value={username} onChange={(e) => setUsername(e.target.value)}></input>
                  <div>
                    <FontAwesomeIcon className={styles.icon} icon={faLock} />
                    <label>Password</label>
                  </div>
                  <input type="password" placeholder="Enter Password.." value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                </form>
                <button type="submit" onClick={handlesubmit}>Submit</button>
                <div className={styles.btn}>
                  <button onClick={() => setMode("register")}>Register Now</button>
                  <button onClick={() => setMode("forgot")}>Forgot Password ?</button>
                </div>
              </div>
            )}
            {mode === "forgot" && (
              <div className={styles.left}>
                <h1>Forgot Pass</h1>
                <form>
                  <div>
                    <FontAwesomeIcon className={styles.icon} icon={faUser} />
                    <label>Username</label>
                  </div>
                  <input type="text" placeholder="Enter Username.." value={username} onChange={(e) => setUsername(e.target.value)}></input>
                  <div>
                    <FontAwesomeIcon className={styles.icon}icon={faEnvelope}/>
                    <label>Email</label>
                  </div>
                  <input type="text" placeholder="Enter Email.." value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </form>
                <button type="submit" onClick={handlesubmit}>Submit</button>
                <div className={styles.btn}>
                  <button onClick={() => setMode("register")}>Register Now</button>
                  <button onClick={() => setMode("login")}>Login</button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
