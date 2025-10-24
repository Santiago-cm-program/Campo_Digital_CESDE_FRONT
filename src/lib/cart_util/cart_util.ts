import { Product } from "@/types/Product";
import { toast } from "sonner";

export type CartItem = Product & { quantity: number };

export const addToCart = (product: Product) => {
  try {
    const storedCart = localStorage.getItem("cart");
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const existingIndex = cart.findIndex(
      (item) => item.idProducto === product.idProducto
    );

    let updatedCart: CartItem[];

    if (existingIndex !== -1) {
      updatedCart = cart.map((item, i) =>
        i === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      toast.success(`Cantidad actualizada de ${product.producto}`);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success(`${product.producto} agregado al carrito`);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    toast.error("No se pudo agregar el producto al carrito");
  }
};
