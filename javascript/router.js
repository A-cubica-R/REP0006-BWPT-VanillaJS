import { renderHome } from './views/homeView.js';
import { renderForm } from './views/formView.js';

const routes = {
    home: renderHome,
    form: renderForm
};

export function navigate(viewName) {
    const container = document.querySelector('main.element-content');
    const view = routes[viewName];
    if (view) {
        view(container);
    } else {
        container.innerHTML = '<h2>Error 404</h2><p>Vista no encontrada.</p>';
    }
}
