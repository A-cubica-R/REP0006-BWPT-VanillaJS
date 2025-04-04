import api from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // document.getElementById('add-tech-button').addEventListener('click', async () => {
    //     const modalTemplate = document.getElementById('addTech');
    //     const modalClone = modalTemplate.content.cloneNode(true);
    //     document.body.appendChild(modalClone);
    // });

    const entityList = document.getElementById('view-section');
    const template = document.getElementById('item-card-template');

    async function renderEntities() {
        entityList.innerHTML = '';
        const students = await api.getStudents();
        students.forEach((ent) => {
            console.log(ent);
            const clone = template.content.cloneNode(true);
            
            clone.querySelector('#item-title').textContent = ent.nombre;
            clone.querySelector('#item-description').textContent = ent.email;

            clone.querySelector('#item-action1').addEventListener('click', () => {
            });

            clone.querySelector('#item-action2').addEventListener('click', () => {
            });

            clone.querySelector('#item-action3').addEventListener('click', () => {
            });

            entityList.appendChild(clone);
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