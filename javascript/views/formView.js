export async function renderForm(container) {
    const html = await fetch('../../html/views/form.html').then(res => res.text());
    container.innerHTML = html;
}

