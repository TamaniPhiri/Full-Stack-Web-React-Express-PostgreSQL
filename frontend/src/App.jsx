import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [getData, setGetData] = useState([]);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState({
    names: "",
    email: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setPostData({
      ...postData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      names: postData.names,
      email: postData.email.trim(),
    }
    
    if (postData.names === "" || postData.email === "") {
      alert("Please fill out name and email");
    } else {
      try {
        axios.post("http://localhost:8080/user", userData).then((response) => {
          console.log(response.status, response.data.token);
        });
        alert("Success! Please refresh your browser to see the new user");
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get("http://localhost:8080/users");
        setGetData(result.data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={postData.email}
              name="email"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter full name"
              value={postData.names}
              name="names"
              onChange={handleChange}
            />
            <button type="submit">Post</button>
          </form>
          <div>{error && <p>Something went wrong 😥</p>}</div>
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
