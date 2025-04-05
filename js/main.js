import api from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const content = document.getElementById('view-section');
    const template = document.getElementById('item-card-template');

    // CARGAR LA PANTALLA PRINCIPAL
    async function renderStudents() {
        content.innerHTML = '';
        const students = await api.getStudents();
        students.forEach((ent) => {
            const clone = template.content.cloneNode(true);

            clone.querySelector('#item-title').textContent = ent.nombre;
            clone.querySelector('#item-description').textContent = ent.email;

            clone.querySelector('#metadata-codigo').textContent = ent.codigo || '';
            clone.querySelector('#metadata-direccion').textContent = ent.direccion || '';
            clone.querySelector('#metadata-fecha-nacimiento').textContent = ent.fechaNacimiento || '';
            clone.querySelector('#metadata-nombre').textContent = ent.nombre || '';
            clone.querySelector('#metadata-telefono').textContent = ent.telefono || '';

            // REVIEW STUDENT BUTTON
            clone.querySelector('#review-student').addEventListener('click', async () => {
                try {
                    const response = await fetch('./review.html');
                    if (!response.ok) {
                        throw new Error('Failed to load review.html');
                    }
                    const htmlContent = await response.text();
                    content.innerHTML = '';
                    content.innerHTML = htmlContent;

                    // Fetch student details using API
                    const student = await api.getStudentByCode(ent.codigo);

                    // Populate review.html with student data
                    document.getElementById('student-name').textContent = student.nombre;
                    document.getElementById('student-codigo').textContent = student.codigo;
                    document.getElementById('student-direccion').textContent = student.direccion;
                    document.getElementById('student-fecha-nacimiento').textContent = student.fecha_nacimiento;
                    document.getElementById('student-telefono').textContent = student.telefono;
                    document.getElementById('student-email').textContent = student.email;

                    // Render dynamic items in 'asignlist'
                    const asignlist = document.getElementById('asignlist');
                    const tempList = document.getElementById('item-list-template');
                    const assignments = await api.getStudentMat(student.codigo);
                    asignlist.innerHTML = ''; // Clear previous content
                    assignments.forEach((asign) => {
                        const assignment = asign.asignatura;
                        const clonet = tempList.content.cloneNode(true);
                        clonet.querySelector('#item-title').textContent = assignment.nombre;
                        clonet.querySelector('#item-description').textContent = assignment.descripcion;
                        clonet.querySelector('#metadata-codigo').textContent = assignment.codigo;
                        clonet.querySelector('#metadata-creditos').textContent = assignment.creditos;
                        asignlist.appendChild(clonet);
                    });

                    // Add functionality to "Regresar" button
                    document.getElementById('back-home-button').addEventListener('click', () => {
                        location.reload(); // Reload the main page
                    });

                    document.getElementById('edit-student-button').addEventListener('click', async () => {
                        try {
                            const response = await fetch('./edit.html');
                            if (!response.ok) {
                                throw new Error('Failed to load review.html');
                            }
                            const htmlContent = await response.text();
                            content.innerHTML = '';
                            content.innerHTML = htmlContent;

                            // Fetch student details using API
                            const student = await api.getStudentByCode(ent.codigo);

                            // Populate review.html with student data
                            document.getElementById('nombre').value = student.nombre;
                            document.getElementById('codigo').value = student.codigo;
                            document.getElementById('direccion').value = student.direccion;
                            document.getElementById('fecha-nacimiento').value = student.fecha_nacimiento;
                            document.getElementById('telefono').value = student.telefono;
                            document.getElementById('email').value = student.email;

                            document.getElementById('save-student').addEventListener('click', (event) => {
                                event.preventDefault();
                                const newStudent = {
                                    direccion: document.getElementById('direccion').value,
                                    fecha_nacimiento: document.getElementById('fecha-nacimiento').value,
                                    nombre: document.getElementById('nombre').value,
                                    telefono: document.getElementById('telefono').value,
                                    email: document.getElementById('email').value
                                };
                                api.updateStudent(student.codigo, newStudent).then(() => {
                                    alert('Student updated successfully!');
                                    location.reload();
                                }).catch((error) => {
                                    console.error('Error updating student:', error);
                                    alert('Error updating student. Please try again later.');
                                });
                            });

                            document.getElementById('cancel-edit').addEventListener('click', () => {
                                location.reload();
                            });
                        } catch (error) {
                            console.error('Error loading edit.html:', error);
                            content.innerHTML = '<p>Error loading review. Please try again later.</p>';
                        }
                    });
                } catch (error) {
                    console.error('Error loading review.html:', error);
                    content.innerHTML = '<p>Error loading review. Please try again later.</p>';
                }
            });

            content.appendChild(clone);
        });

        // ADD NEW STUDENT BUTTON
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
                document.getElementById('cancel-student').addEventListener('click', () => {
                    location.reload();
                });
            } catch (error) {
                alert('Error loading form. Please try again later.');
                console.error('Error loading form.html:', error);
                viewSection.innerHTML = '<p>Error loading form. Please try again later.</p>';
            }
        });
    }

    document.getElementById('students-button').addEventListener('click', renderStudents);
});