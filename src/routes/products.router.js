import {Router} from 'express';
import ProductMananger from '../services/products.mananger.js';

const router = Router();

//Vamos a Importar una Clase Mananger - ProductManager.js

const productManager = new ProductMananger();


//-------Apis------------//

//Listar

router.get('/', async (req,res)=>{

    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const producs = await productManager.getAllProducts(limit)
        res.json(producs) 
    } catch (error) {
        console.log(error);
    }

    res.send('Get - Listado de Productos');
});

// Obtener un Producto por id

router.get('/:pid',async (req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const produc = await productManager.getProductById(productId);
        if(!produc){
            return res.status(404).send('Producto no Encontrado');
        }

        res.json(produc);
    } catch (error) {
        console.log(error);
    }
});


//Crear un Producto

router.post('/',async (req,res)=>{
   try {
    const {title, description, code, price, stock, category, thumbnails } = req.body
    if(!title || !description || !code || !price || !stock || !category){
        return res.status(400).json({error:'Todos los Campos son obligatorios excepto thumbnails'});
    }

    const newProduct = await productManager.addProduct({title, description, code, price, stock, category, thumbnails });
    res.status(201).json(newProduct)
   } catch (error) {
      console.log(error);
   }
});

//Actualizar un Producto por ID

router.put('/:pid',async (req,res)=>{
    try {
        const productId = parseInt(req.params.pid)

        const upDatedProduc = await productManager.upDateProduct(productId, req.body);
        if(upDatedProduc){
            res.json(upDatedProduc)
        }else{
            res.status(404).json({error:'Producto no Encontrado'})
        }
    } catch (error) {
        console.log(error);
    }
});


//Eliminar un Producto Por Id

router.delete('/.pid',async (req,res)=>{

   try {
    const productId = parseInt(req.params.pid);
    const deletedProduct = await productManager.deleteProduct(productId);
    if(deletedProduct){
        res.json(deletedProduct);
    }else{
        res.status(404).json({error:'Producto no encontrado'})
    }
   } catch (error) {
    console.log(error);
   } 
    
   
});










export default router;