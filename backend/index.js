import express from 'express';
import cors from 'cors';

const app = express();
const PORT=8080;

app.use(express.json());
app.use(cors());

app.get('/',(req,res) =>{
    res.send('Welcome to our express server');
});

app.listen(PORT,() =>{
    console.log(`Server is listening on http://localhost:${PORT}`);
})