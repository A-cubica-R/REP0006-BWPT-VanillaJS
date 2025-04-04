import { navigate } from './router.js';
import { getData } from './API/DataFetcher.js';
import { renderList } from './API/RenderList.js';
import { renderCard } from './API/RenderCard.js';

export async function loadView(wrapper = document.querySelector('main.element-content')) {
    // Limpia el contenido del wrapper y agrega la view-section
    wrapper.innerHTML = `<div class="view-section"></div>`;
    const container = wrapper.querySelector('.view-section');

    const loadingHtml = await fetch('./views/loading.html').then(res => res.text());
    container.innerHTML = loadingHtml;

    try {
        const data = await getData();
        container.innerHTML = "";

        //CAMBIAR si es card o list
        setViewMode("card");
        renderCard(data, container);
    } catch (err) {
        container.innerHTML = "<p>Error al cargar los datos.</p>";
    }
}


// Vincular botones
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button[data-view]').forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            navigate(view);
        });
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
    }else{
        setOrientation("horizontal");
    }
    const viewSection = document.querySelector(".view-section");
    if (!viewSection) return;

    viewSection.classList.remove("card-mode", "list-mode");
    viewSection.classList.add(`${mode}-mode`);
}


document.addEventListener("DOMContentLoaded", loadView);
