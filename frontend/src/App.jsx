import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [getData,setGetData]=useState([]);

  useEffect(()=>{
    (async()=>{
      const result=await axios.get('http://localhost:8080/users');
      setGetData(result.data);
    })()
  },[])

  return (
    <>
      <div>
        {getData.map((results)=>(
          <div key={results.id}>
            <h1>{results.name}</h1>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
