import { navigate } from './router.js';
import { navigateWithParams } from './router.js';
import { initRouterFromURL } from './router.js';
import { getData } from './API/DataFetcher.js';
import { renderList } from './API/RenderList.js';
import { renderCard } from './API/RenderCard.js';

export async function loadView(
    wrapper = document.querySelector('main.element-content'),
    options = {}
) {
    wrapper.innerHTML = `<div class="view-section"></div>`;
    const container = wrapper.querySelector('.view-section');

    const loadingHtml = await fetch('./views/loading.html').then(res => res.text());
    container.innerHTML = loadingHtml;

    try {
        const data = await getData(options); //pass if it's necessary
        container.innerHTML = "";

        const mode = options.mode || "card";

        setViewMode(mode); // "card" o "list"

        if (mode === "list") {
            renderList(data, container);
        } else {
            renderCard(data, container);
        }

    } catch (err) {
        container.innerHTML = "<p>Error al cargar los datos.</p>";
    }
}



document.querySelectorAll('button[data-view]').forEach(button => {
    button.addEventListener('click', () => {
        const view = button.getAttribute('data-view');

        // Opcional: puedes extraer datos extra desde atributos
        const params = {};
        if (button.hasAttribute('data-user-id')) {
            params.userId = button.getAttribute('data-user-id');
        }

        navigateWithParams(view, params);
    });
});


function setOrientation(direction = "vertical") {
    const viewSection = document.querySelector(".view-section");
    if (!viewSection) return;

    viewSection.classList.remove("orientation-vertical", "orientation-horizontal");
    viewSection.classList.add(`orientation-${direction}`);
}

export function setViewMode(mode = "card") {
    if (mode == "list") {
        setOrientation("vertical");
    } else {
        setOrientation("horizontal");
    }
    const viewSection = document.querySelector(".view-section");
    if (!viewSection) return;

    viewSection.classList.remove("card-mode", "list-mode");
    viewSection.classList.add(`${mode}-mode`);
}


document.addEventListener("DOMContentLoaded", loadView);

document.addEventListener("DOMContentLoaded", () => {
    initRouterFromURL();
});

window.addEventListener("popstate", () => {
    initRouterFromURL();
});
