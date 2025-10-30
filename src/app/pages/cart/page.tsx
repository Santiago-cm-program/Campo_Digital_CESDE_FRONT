"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Product } from "@/types/Product";
import { Sale } from "@/types/Sale";
import { createSaleWithDetails } from "@/lib/api_sales/SalesApi";


type CartItem = Product & { quantity: number };

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;

        const storedCart = localStorage.getItem("cart");

        if (!storedCart) return;

        try {
            const parsed = JSON.parse(storedCart);
            if (Array.isArray(parsed)) {
                setCartItems(parsed);
            }
        } catch (err) {
            console.error("Error al parsear carrito:", err);
        }
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems]);


    const subtotal = useMemo(
        () => cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0),
        [cartItems]
    );

    const total = subtotal;

    const handleRemove = (idProducto: number) => {
        setCartItems((prev) => prev.filter((item) => item.idProducto !== idProducto));
        toast.success("Producto eliminado del carrito");
    };


    const handleCheckout = async () => {
        if (loading) return;
        setLoading(true);
        if (cartItems.length === 0) {
            toast.error("Tu carrito está vacío");
            return;
        }

        const user = localStorage.getItem("user");

        if (!user) {
            toast.error("Debes iniciar sesión antes de finalizar la compra");
            setLoading(false)
            return;
        }

        try {
            const parsedUser = JSON.parse(user);

            const sale: Sale = {
                usuario: parsedUser.idCliente,
                fecha: new Date().toISOString().split("T")[0],
                total: cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0),
                detalles: cartItems.map((item) => ({
                    product: item.idProducto,
                    cantidad: item.quantity,
                })),
            };

            const createdSale = await createSaleWithDetails(sale);

            toast.success(`Compra realizada con éxito ID Venta: ${createdSale.idVenta}`);

            setCartItems([]);
            localStorage.removeItem("cart");


        } catch (err: unknown) {
            console.error("Error al procesar compra:", err);
            toast.error("Error al procesar la compra. Intenta nuevamente.");
            setLoading(false)
        }
        setLoading(false);
    };
    return (
        <main className="container mx-auto py-10 p-3">
            <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.length === 0 ? (
                        <Card className="p-10 text-center text-muted-foreground">
                            Tu carrito está vacío.
                        </Card>
                    ) : (
                        cartItems.map((item) => (
                            <Card
                                key={item.idProducto}
                                className="grid grid-cols-[auto_1fr] gap-6 items-center p-5 rounded-2xl hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.producto}
                                        className="w-32 h-32 object-contain rounded-xl"
                                    />
                                </div>

                                <div className="flex flex-col justify-center h-full">
                                    <div className="flex flex-col justify-center gap-1 text-center sm:text-left">
                                        <h2 className="font-semibold text-lg leading-tight">
                                            {item.producto}
                                        </h2>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {item.descripcion}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {item.quantity} × ${item.precio.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex flex-row items-center justify-center gap-2 mt-4">
                                        <p className="font-semibold text-lg">
                                            ${(item.precio * item.quantity).toFixed(2)}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemove(item.idProducto)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                        ))
                    )}
                </div>



                <Card className="h-fit p-6">
                    <h2 className="text-xl font-semibold mb-4">Resumen</h2>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Button
                        className="w-full mt-6"
                        size="lg"
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0 || loading}
                    >
                        {loading ? "Procesando..." : "Finalizar compra"}
                    </Button>

                </Card>
            </div>
        </main>
    );
}
