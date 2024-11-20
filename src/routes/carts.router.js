import { Router } from 'express';
import CartManager from '../services/carts.manager.js';

const router = Router();
const cartManager = new CartManager();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Obtener los productos de un carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const updatedCart = await cartManager.addProductToCart(cartId, productId);
    if (!updatedCart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

export default router;
