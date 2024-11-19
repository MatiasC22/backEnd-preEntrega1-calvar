import express from "express";
import products from './routes/products.router.js'
// import cards from './routes/card.router.js'
// import __dirname from "./utils.js";


const app = express();

// Midelware de configuracion, son configuraciones del 
// trafico entrante de los puertos

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 8080;

//Enpoint de telemetria , es una forma de saber si el servidor esta arriba 
app.get('/ping',(req,res)=>{
    res.send('pong')
})

//Routes
app.use("/producs",products)
// app.use("/cards",cards)

app.listen(PORT,()=>{
    console.log(`Server corriendo en el puerto ${PORT}`);
})