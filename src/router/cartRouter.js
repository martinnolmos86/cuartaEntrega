import express from "express";
import { cartManagar } from "../main.js";

export const cartsRouter = express.Router();

// Creamos el nuevo carrito

cartsRouter.post("/", async (req, res) => {
  try {
    const data = await cartManagar.newCart();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Listamos los productos con el id del carrito

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const data = await cartManagar.getCartProducts(cid);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Agregar un producto al Carrito

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartManagar.addProduct(cid, pid);
    res.send("Agregado exitosamente");
  } catch (error) {
    console.log(error);
  }
});

export default cartsRouter;
