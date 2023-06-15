const express = require('express');
const cors = require('cors');
const pool =require("./database")

const app = express();
const PORT=8080;

app.use(express.json());
app.use(cors());

//post a username and email to the database
app.post("/user",async(req, res)=>{
    try {
        const {name,email}=req.body;
        const newUser= await pool.query(
            "INSERT INTO users(name,email) VALUES($1,$2) RETURNING *",
            [name,email]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        console.log(error);
    }
})

app.get('/',(req,res) =>{
    res.send('Welcome to our express server please buy me a coffee 😎');
});

app.listen(PORT,() =>{
    console.log(`Server is listening on http://localhost:${PORT}`);
})