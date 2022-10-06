import { useRef } from "react";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const login = () => {
    const loginData = {
      "email": emailRef.current.value,
      "password": passwordRef.current.value
    }

    fetch("http://localhost:8080/login",{
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {"Content-Type": "application/json"}
    }).then(res => res.json())
      .then(json => sessionStorage.setItem("token", json.token));
  }

  return ( 
    <div>
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="text" /> <br />
      <button onClick={login}>Logi sisse</button>
    </div> );
}

export default Login;