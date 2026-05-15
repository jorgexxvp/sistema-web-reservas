import { ROUTE_DASHBOARD, ROUTE_LOGIN } from "@/presentation/toolbox";
import { useLoginStore } from "@/presentation/zustand";

export const NotFound = () => {
  const { token, name } = useLoginStore();

  const redirectUrl = token && name ? "/" + ROUTE_DASHBOARD : ROUTE_LOGIN;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl mb-4">Página no encontrada</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        La página que buscas no existe.
      </p>
      <a
        href={redirectUrl}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
      >
        Volver al inicio
      </a>
    </div>
  );
};
