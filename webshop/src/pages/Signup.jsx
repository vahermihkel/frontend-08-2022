import { useRef } from "react";

function Signup() {
  const personCodeRef = useRef();
  const emailRef = useRef();
  // const firstNameRef = useRef();
  // const lastNameRef = useRef();
  // const telephoneRef = useRef();
  // const addressRef = useRef();
  const passwordRef = useRef();

  const signup = () => {
    const signupData = {
      "personCode": personCodeRef.current.value,
      "email": emailRef.current.value,
      "password": passwordRef.current.value
    }

    fetch("http://localhost:8080/signup",{
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {"Content-Type": "application/json"}
    }).then(res => console.log(res))
      // .then(json => sessionStorage.setItem("token", json.token));
  }

  return ( 
    <div>
      <label>Isikukood</label> <br />
      <input ref={personCodeRef} type="text" /> <br />
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="text" /> <br />
      <button onClick={signup}>Registreeru</button>
    </div> );
}

export default Signup;