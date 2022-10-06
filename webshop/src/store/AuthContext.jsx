import React from "react";
import { useState } from "react";

                      // null asemel saan kirjutada mis väärtused tal on
                      // kui vajutan muutuja peale punkti
const AuthContext = React.createContext({
  loggedIn: false,
  login: () => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(determineIfLoggedIn());
  const [isAdmin, setIsAdmin] = useState(determineIfAdmin());

  // const determineIfLoggedIn = () => {}
  function determineIfLoggedIn() {
    if (sessionStorage.getItem("token")) {
      // const authToken = sessionStorage.getItem("token");
      
      fetch("http://localhost:8080/check-if-logged-in", {
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            return res;
          }
        })
        .then(json => {
          if (json.status === 403) {
            console.log("pole õigusi")
            setLoggedIn(false);
            // setMessage("Sul pole toodete haldamise jaoks sobivaid õiguseid!");
          } else if (json.ok === false) {
            console.log("muu");
            setLoggedIn(false);
            // setMessage("Tundmatu viga!");
          } else {
            console.log("pääsesid ligi");
            setLoggedIn(true);
            // setProducts(json);
          }
        })

      // if (new Date(userData.expires).getTime() > (new Date().getTime())) {
      //   return true;
      // } else {
      //   return false;
      // }
    } else {
      return false;
    }
  }

  function determineIfAdmin() {
    
  }

  const loginHandler = () => {
    setLoggedIn(true);
  }

  const logoutHandler = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: isLoggedIn,
      login: loginHandler,
      logout: logoutHandler
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;