import express from "express";
import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";
import productsRouter from "./router/productsRouter.js";
import cartRouter from "./router/cartRouter.js";

const app = express();

export const productManager = new ProductManager();
export const cartManagar = new CartManager();

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => {
  console.log("puerto funcionando");
});
