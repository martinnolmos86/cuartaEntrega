import express from "express";

export const cartsRouter = express.Router();

cartsRouter.get("/carts");

cartsRouter.get("/", (req, res) => {
  // Lógica para obtener los carritos
  res.send("Estamos en el cartRouter");
});

export default cartsRouter;
