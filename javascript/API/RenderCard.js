export function renderCard(data, container) {
    const template = document.querySelector("#item-card-template");

    data.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("#item-title").textContent = item.title;
        clone.querySelector("#item-description").textContent = item.description;
        container.appendChild(clone);
    });
}