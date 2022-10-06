import { useEffect, useState } from "react";

function Persons() {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/persons", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => setPersons(json))
  }, []);

  const addAsAdmin = (personCode) => {
    fetch("http://localhost:8080/change-to-admin/" + personCode, {
      method: "PATCH",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => setPersons(json))
  }

  const removeAsAdmin = (personCode) => {
    fetch("http://localhost:8080/change-to-user/" + personCode, {
      method: "PATCH",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => setPersons(json))
  }

  return ( 
    <div>
      <div>{message}</div>
      { persons.map( person => 
        <div key={person.personCode}>
          {person.personCode} - {person.email} 
          {person.role === "admin" && <span> (ADMIN) </span>}
          {person.role !== "admin" && <button onClick={() => addAsAdmin(person.personCode)}>Lisa</button>}
          {person.role === "admin" && <button onClick={() => removeAsAdmin(person.personCode)}>Eemalda</button>}
        </div> )}
    </div> );
}

export default Persons;