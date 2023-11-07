import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export class CartManager {
  constructor() {
    this.path = "src/cart.json";
    this.carts = [];
  }

  // Metodo para mostrar lo que tengo en el array

  getCart = async () => {
    const data = await fs.readFile(this.path, "utf-8");
    const dataJson = JSON.parse(data);

    return dataJson;
  };

  getCartProducts = async (id) => {
    const allCarts = await this.getCart();
    const cart = allCarts.find((cart) => cart.id === id);

    if (cart) {
      return cart.products;
    } else {
      console.log("No se encontro el carrito");
    }
  };

  //   Metodo para crear un nuevo Carrito

  newCart = async () => {
    const id = uuidv4();
    const newCart = { id, products: [] };

    this.carts = await this.getCart();
    this.carts.push(newCart);

    await fs.writeFile(this.path, JSON.stringify(this.carts));
    return newCart;
  };

  //   Metodo para agregar productos al carrito

  addProduct = async (idCart, idProduct) => {
    const data = await this.getCart();
    const cartSearch = data.findIndex((carts) => carts.id === idCart);

    if (cartSearch !== -1) {
      const cartProducts = await this.getCartProducts(idCart);
      const existingProduct = cartProducts.findIndex(
        (product) => product.idProduct === idProduct
      );
      if (existingProduct !== -1) {
        cartProducts[existingProduct].quantity =
          cartProducts[existingProduct].quantity + 1;
      } else {
        cartProducts.push({ idProduct, quantity: 1 });
      }
      data[cartSearch].products = cartProducts;
      await fs.writeFile(this.path, JSON.stringify(data));
      console.log("Producto agregado");
    } else {
      console.log("Carrito no encontrado");
    }
  };
}
