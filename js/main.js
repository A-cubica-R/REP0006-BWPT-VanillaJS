import api from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {

    const content = document.getElementById('view-section');
    const template = document.getElementById('item-card-template');

    async function renderEntities() {
        content.innerHTML = '';
        const students = await api.getStudents();
        students.forEach((ent) => {
            console.log(ent);
            const clone = template.content.cloneNode(true);

            clone.querySelector('#item-title').textContent = ent.nombre;
            clone.querySelector('#item-description').textContent = ent.email;

            clone.querySelector('#metadata-codigo').textContent = ent.codigo || '';
            clone.querySelector('#metadata-direccion').textContent = ent.direccion || '';
            clone.querySelector('#metadata-fecha-nacimiento').textContent = ent.fechaNacimiento || '';
            clone.querySelector('#metadata-nombre').textContent = ent.nombre || '';
            clone.querySelector('#metadata-telefono').textContent = ent.telefono || '';

            clone.querySelector('#item-action1').addEventListener('click', () => {
                console.log(`Action 1 clicked for ${ent.nombre}`);
            });

            clone.querySelector('#item-action2').addEventListener('click', () => {
                console.log(`Action 2 clicked for ${ent.nombre}`);
            });

            clone.querySelector('#item-action3').addEventListener('click', () => {
                console.log(`Action 3 clicked for ${ent.nombre}`);
            });

            content.appendChild(clone);
        });

        // ADD NEW STUDENT

        document.getElementById('add-student-button').addEventListener('click', async () => {
            const viewSection = document.getElementById('view-section');
            try {
                const response = await fetch('./form.html');
                if (!response.ok) {
                    throw new Error('Failed to load form.html');
                }
                const htmlContent = await response.text();
                viewSection.innerHTML = htmlContent;

                const form = viewSection.querySelector('form');
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const student = {
                        codigo: form.codigo.value,
                        direccion: form.direccion.value,
                        fecha_nacimiento: form['fecha-nacimiento'].value,
                        nombre: form.nombre.value,
                        telefono: form.telefono.value,
                        email: form.email.value
                    };

                    try {
                        await api.createStudent(student);
                        alert('Student created successfully!');
                        form.reset();
                        location.reload(); // Refresh the page
                    } catch (error) {
                        console.error('Error creating student:', error);
                        alert('Error creating student. Please try again later.');
                    }
                });
            } catch (error) {
                alert('Error loading form. Please try again later.');
                console.error('Error loading form.html:', error);
                viewSection.innerHTML = '<p>Error loading form. Please try again later.</p>';
            }
        });

        //     document.getElementById('add-tech-button').addEventListener('click', async () => {
        //         const modalTemplate = document.getElementById('addTech');
        //         const modalClone = modalTemplate.content.cloneNode(true);
        //         document.body.appendChild(modalClone);

        //         const modal = document.querySelector('#add-tech-panel');

        //         modal.querySelector('.close').addEventListener('click', () => {
        //             modal.style.display = 'none';
        //             document.body.removeChild(modal);
        //         });

        //         const allTechnologies = await api.getTechnologies();
        //         const studentTechnologies = await api.getStudentTechnologies(student.code);
        //         const studentTechCodes = studentTechnologies.map(tech => tech.technology.code);
        //         const availableTechnologies = allTechnologies.filter(tech => !studentTechCodes.includes(tech.code));

        //         const selectTech = modal.querySelector('#select-tech');
        //         availableTechnologies.forEach(tech => {
        //             const option = document.createElement('option');
        //             option.value = tech.code;
        //             option.textContent = tech.name;
        //             selectTech.appendChild(option);
        //         });

        //         modal.querySelector('.addTechnology').addEventListener('click', async (event) => {
        //             event.preventDefault();
        //             const techTechn = modal.querySelector('#select-tech').value;
        //             const techLevel = modal.querySelector('#select-level').value;
        //             const studentTech = {
        //                 level: techLevel,
        //                 student_code: student.code,
        //                 technology_code: techTechn
        //             };
        //             try {
        //                 await api.addStudentTechnology(studentTech);
        //                 alert('Technology added successfully!');
        //                 modal.style.display = 'none';
        //                 document.body.removeChild(modal);
        //                 location.reload();
        //             } catch (error) {
        //                 console.error('Error adding technology:', error);
        //                 alert('Failed to add this technology.');
        //             }
        //         });
        //     });

    }
    await renderEntities();
});

document.getElementById('add-student-button').addEventListener('click', async () => {
    const viewSection = document.getElementById('view-section');
    try {
        const response = await fetch('./form.html');
        if (!response.ok) {
            throw new Error('Failed to load form.html');
        }
        const htmlContent = await response.text();
        viewSection.innerHTML = htmlContent;

        // Wait for the form to load and add event listener
        const form = viewSection.querySelector('form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent page reload
            const student = {
                codigo: form.codigo.value,
                direccion: form.direccion.value,
                fecha_nacimiento: form['fecha-nacimiento'].value,
                nombre: form.nombre.value,
                telefono: form.telefono.value,
                email: form.email.value
            };

            try {
                await api.createStudent(student);
                alert('Student created successfully!');
                form.reset(); // Clear the form fields
            } catch (error) {
                console.error('Error creating student:', error);
                alert('Error creating student. Please try again later.');
            }
        });
    } catch (error) {
        alert('Error loading form. Please try again later.');
        console.error('Error loading form.html:', error);
        viewSection.innerHTML = '<p>Error loading form. Please try again later.</p>';
    }
});