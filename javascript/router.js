import { renderHome } from './views/homeView.js';
import { renderForm } from './views/formView.js';

const routes = {
    home: renderHome,
    form: renderForm
};

export function navigate(viewName, params = {}) {
    const container = document.querySelector('main.element-content');
    const view = routes[viewName];
    if (view) {
        view(container, params);
    } else {
        container.innerHTML = '<h2>Error 404</h2><p>Vista no encontrada.</p>';
    }
}

// Leer parámetros desde la URL actual
export function initRouterFromURL() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view") || "home";
    const otherParams = Object.fromEntries(params.entries());
    navigate(view, otherParams);
}

// Navegar y actualizar la URL
export function navigateWithParams(viewName, params = {}) {
    const query = new URLSearchParams({ view: viewName, ...params }).toString();
    const newUrl = `${window.location.pathname}?${query}`;
    history.pushState({ view: viewName, ...params }, '', newUrl);
    navigate(viewName, params);
}

