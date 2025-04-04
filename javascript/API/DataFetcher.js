export async function getData() {
    // Simulación: puedes reemplazar esto por una llamada real a tu API
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { title: "Elemento 1", description: "Descripción 1" },
                { title: "Elemento 2", description: "Descripción 2" },
                { title: "Elemento 3", description: "Descripción 3" },
                { title: "Elemento 4", description: "Descripción 4" },
                { title: "Elemento 5", description: "Descripción 5" },
                { title: "Elemento 6", description: "Descripción 6" },
                { title: "Elemento 7", description: "Descripción 7" },
                { title: "Elemento 8", description: "Descripción 8" },
                { title: "Elemento 9", description: "Descripción 9" },
                { title: "Elemento 10", description: "Descripción 10" },
                { title: "Elemento 11", description: "Descripción 11" },
                { title: "Elemento 12", description: "Descripción 12" }
            ]);
        }, 2000); // 2 segundos de carga simulada
    });
}
