import HeaderPrincipal from "@/components/HeaderPrincipal";
import Footer from "@/components/Footer";

export default function AdministrarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPrincipal />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <p className="mt-2">Aquí irán las opciones de administración del sistema.</p>
      </main>

      <Footer />
    </div>
  );
}
