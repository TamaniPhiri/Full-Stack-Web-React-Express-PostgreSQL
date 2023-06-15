import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [getData, setGetData] = useState([]);
  const [data, setData] = useState({
    names: "",
    email: "",
  });

  const handleChange = (e) => {
    const value=e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const userData={
      names:data.names,
      email:data.email.trim()
    }
    if(data.names===""||data.email===""){
      alert("Please fill out name and email")
    }
    else{
      axios.post("http://localhost:8080/user",userData)
      .then((response)=>{
        console.log(response.status,response.data.token);
      });
      alert("Success! Please refresh your browser to see the new user")
    }
  };

  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:8080/users");
      setGetData(result.data);
    })();
  }, []);

  return (
    <>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="email"
              placeholder="Enter your email"
              value={data.email}
              name="email"
              onChange={handleChange}
             />
             <input type="text"
              placeholder="Enter full name"
              value={data.names}
              name="names"
              onChange={handleChange}
             />
             <button type="submit">Post</button>
          </form>
        </div>
        {getData.map((results) => (
          <div key={results.id}>
            <h1>{results.names}</h1>
            <p>{results.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
