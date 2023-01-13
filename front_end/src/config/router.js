// Esta es la configuración del router de la aplicación.
export default function config(router) {
    // Configuración de la ruta raíz.
    router.urlService.rules.initial({ state: "login" });
};