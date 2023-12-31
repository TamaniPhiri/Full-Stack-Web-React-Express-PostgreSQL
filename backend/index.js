const express = require('express');
const cors = require('cors');
const pool =require("./database")

const app = express();
const PORT=8080;

app.use(express.json());
app.use(cors());

//get all users from database
app.get('/users', async(req, res)=>{
    try {
        const allUsers= await pool.query(
            "SELECT * FROM users"
        );
        res.json(allUsers.rows);
    } catch (error) {
        res.json(error);
    }
});

//get a specific user from database
app.get('/users/:id', async(req, res)=>{
    const {id} =req.params;
    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE id =$1",
            [id]
        );
        res.json(user.rows[0]);
    } catch (error) {
        res.json(error);
    }
});

//update a specific user by id
app.put('/users/:id', async(req, res)=>{
    const {id} =req.params;
    const {names,email}=req.body;
    try {
        const user= await pool.query(
            "UPDATE users SET names = $1, email = $2 WHERE id = $3",
            [names,email,id] 
        );
        res.json("User updated successfully! 😎");
    } catch (error) {
        res.json(error);
    }
});

//post a username and email to the database
app.post("/user",async(req, res)=>{
    try {
        const {names,email}=req.body;
        const newUser= await pool.query(
            "INSERT INTO users(names,email) VALUES($1,$2) RETURNING *",
            [names,email]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        res.json(error);
    }
});

//delete a user according to id
app.delete("/users/:id", async(req, res)=>{
    const {id}=req.params;
    try {
        const deletedUser= await pool.query(
            "DELETE FROM users WHERE id = $1",
            [id]
        );
        res.json("User was successfully deleted");
    } catch (error) {
        res.json(error);
    }
});


app.get('/',(req,res) =>{
    res.send('Welcome to our express server, please buy me a coffee 😎');
});

app.listen(PORT,() =>{
    console.log(`Server is listening on http://localhost:${PORT}`);
});