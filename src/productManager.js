import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "src/products.json";
  }

  //   Metodo para agregar productos

  addProduct = async ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  }) => {
    const id = uuidv4();

    // verificando si hay algun producto con el mismo codigo

    if (this.products.some((product) => product.code === code)) {
      throw new Error("Error: El código ya existe en la lista de productos.");
    }

    //   Creamos el producto y agregamos id

    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    };

    this.products = await this.getProduct();

    // Agregamos el producto con el metodo push

    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products));

    return newProduct;
  };

  // Metodo para mostrar lo que tengo en el array

  async getProduct() {
    const data = await fs.readFile(this.path, "utf-8");
    const dataJson = JSON.parse(data);

    return dataJson;
  }

  // Metodo mostrar el producto por id

  async getProductById(id) {
    // traemos los productos
    const searchProd = this.getProduct();

    const prodSearch = searchProd.find((p) => p.id === id);

    if (prodSearch) {
      return prodSearch;
    } else {
      throw new Error("No se encontro con ese id");
    }
  }

  // Metodo para actualizar producto

  updateProduct = async (id, { ...data }) => {
    const response = await this.getProduct();

    const index = response.findIndex((product) => product.id === id);

    if (index !== -1) {
      response[index] = { id, ...data };
      await fs.writeFile(this.path, JSON.stringify(response));
      return response[index];
    } else {
      console.log("Producto no encontrado");
    }
  };

  // Metodo para borrar producto

  async deleteProduct(id) {
    const data = await this.getProduct();
    const productIndex = data.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error("Error: Producto no encontrado (Not found).");
    }

    data.splice(productIndex, 1);

    await fs.writeFile(this.path, JSON.stringify(data));
  }

  // deleteProduct = async (id) => {
  //   const response = await this.getProduct();

  //   const index = response.findIndex((product) => product.id === id);

  //   if (index !== -1) {
  //     response.splice(index, 1);
  //     await fs.writeFile(this.path, JSON.stringify(response));
  //   } else {
  //     console.log("producto no encontrado");
  //   }
  // };
}
