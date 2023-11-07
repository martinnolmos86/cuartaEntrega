import express from "express";
export const router = express.Router();
import { productManager } from "../main.js";

// Ruta para obtener todos los productos y agregamos el limites de los porductos a mostrar

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProduct();

    if (limit) {
      const limitProducts = products.slice(0, limit);
      return res.json(limitProducts);
    }
    return res.json(products);
  } catch (error) {
    console.log(error);
  }
});

// Ruta para obtener un producto por ID

router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const products = await productManager.getProductById(id);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

// Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status = true,
      category,
    } = req.body;
    const response = await productManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

// Ruta para actualizar un producto

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status = true,
      category,
    } = req.body;
    const response = await productManager.updateProduct(pid, {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

// Ruta para borrar un producto

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await productManager.deleteProduct(pid);
    res.send(`Se elimino el producto ${pid}`);
  } catch (error) {
    console.log(error);
  }
});

export default router;
