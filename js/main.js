import api from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const content = document.getElementById('view-section');
    const template = document.getElementById('item-card-template');
    const assignment = document.getElementById('item-list-template');

    // CARGAR ESTUDIANTES
    async function renderStudents() {
        content.innerHTML = '';
        content.classList.add('orientation-horizontal');
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
                async function reviewStudent() {
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

                        async function populateCombobox() {
                            const allAssignments = await api.getMats();
                            const studentAssignments = await api.getStudentMat(student.codigo);
                            const assignedCodes = studentAssignments.map((asign) => asign.asignatura.codigo);

                            const combobox = document.getElementById('assign-combobox');
                            combobox.innerHTML = ''; // Clear previous options

                            allAssignments
                                .filter((assignment) => !assignedCodes.includes(assignment.codigo))
                                .forEach((assignment) => {
                                    const option = document.createElement('option');
                                    option.value = assignment.codigo;
                                    option.textContent = assignment.nombre;
                                    combobox.appendChild(option);
                                });
                        }

                        populateCombobox();

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

                            clonet.querySelector('#delete-assign').addEventListener('click', async () => {
                                try {
                                    const response = await fetch('./delete.html');
                                    if (!response.ok) {
                                        throw new Error('Failed to load delete.html');
                                    }
                                    const htmlContent = await response.text();
                                    content.innerHTML = '';
                                    content.innerHTML = htmlContent;

                                    // Populate delete.html with assignment data
                                    document.getElementById('item-type').textContent = 'Asignatura por Estudiante';
                                    document.getElementById('item-name').textContent = assignment.nombre;
                                    document.getElementById('item-id').textContent = assignment.codigo;

                                    document.getElementById('cancel-delete').addEventListener('click', () => {
                                        reviewStudent(); // Call reviewStudent to return to the review view
                                    });

                                    document.getElementById('confirm-delete').addEventListener('click', () => {
                                        try {
                                            api.deleteAssignForStudent(student.codigo, assignment.codigo).then(() => {
                                                alert('Assignment deleted successfully!');
                                                reviewStudent(); // Refresh the review view after deletion
                                            }).catch((error) => {
                                                console.error('Error deleting assignment:', error);
                                                alert('Error deleting assignment. API Fail.');
                                            });
                                        } catch (error) {
                                            console.error('Error deleting assignment:', error);
                                            alert('Error deleting assignment. Please try again later.');
                                            window.history.back();
                                        }
                                    });
                                } catch (error) {
                                    console.error('Error loading delete.html:', error);
                                    content.innerHTML = '<p>Error loading delete confirmation. Please try again later.</p>';
                                }
                            });

                            clonet.querySelector('#review-assign').addEventListener('click', async () => {
                                try {
                                    const response = await fetch('./viewAsign.html');
                                    if (!response.ok) {
                                        throw new Error('Failed to load viewAsign.html');
                                    }
                                    const htmlContent = await response.text();
                                    content.innerHTML = '';
                                    content.innerHTML = htmlContent;

                                    document.getElementById('asign-title').textContent = assignment.nombre;
                                    document.getElementById('asign-codigo').textContent = assignment.codigo;
                                    document.getElementById('asign-creditos').textContent = assignment.creditos;
                                    document.getElementById('asign-descripcion').textContent = assignment.descripcion;

                                    document.getElementById('back-home-button').addEventListener('click', () => {
                                        reviewStudent();
                                    });
                                } catch (error) {
                                    console.error('Error loading viewAsign.html:', error);
                                    content.innerHTML = '<p>Error loading assignment details. Please try again later.</p>';
                                }
                            });

                            asignlist.appendChild(clonet);
                        });

                        // Add functionality to "Regresar" button
                        document.getElementById('back-home-button').addEventListener('click', () => {
                            renderStudents();
                        });

                        

                        document.getElementById('add-assign-button').addEventListener('click', () => {
                            //¿?
                        });

                        document.getElementById('edit-student-button').addEventListener('click', async () => {
                            try {
                                const response = await fetch('./edit.html');
                                if (!response.ok) {
                                    throw new Error('Failed to load edit.html');
                                }
                                const htmlContent = await response.text();
                                content.innerHTML = '';
                                content.innerHTML = htmlContent;

                                // Fetch student details using API
                                const student = await api.getStudentByCode(ent.codigo);

                                // Populate edit.html with student data
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
                                        renderStudents();
                                    }).catch((error) => {
                                        console.error('Error updating student:', error);
                                        alert('Error updating student. Please try again later.');
                                    });
                                });

                                document.getElementById('cancel-edit').addEventListener('click', () => {
                                    renderStudents();
                                });
                            } catch (error) {
                                console.error('Error loading edit.html:', error);
                                content.innerHTML = '<p>Error loading edit view. Please try again later.</p>';
                            }
                        });
                    } catch (error) {
                        console.error('Error loading review.html:', error);
                        content.innerHTML = '<p>Error loading review. Please try again later.</p>';
                    }
                }
                reviewStudent();
            });

            clone.querySelector('#delete-student').addEventListener('click', async () => {
                try {
                    const response = await fetch('./delete.html');
                    if (!response.ok) {
                        throw new Error('Failed to load delete.html');
                    }
                    const htmlContent = await response.text();
                    content.innerHTML = '';
                    content.innerHTML = htmlContent;

                    // Fetch student details using API
                    const student = await api.getStudentByCode(ent.codigo);

                    // Populate review.html with student data
                    document.getElementById('item-type').textContent = 'Estudiante';
                    document.getElementById('item-name').textContent = student.nombre;
                    document.getElementById('item-id').textContent = student.codigo;

                    document.getElementById('cancel-delete').addEventListener('click', () => {
                        renderStudents();
                    });

                    document.getElementById('confirm-delete').addEventListener('click', () => {
                        try {
                            api.deleteStudent(student.codigo).then(() => {
                                alert('Student deleted successfully!');
                                renderStudents();
                            }).catch((error) => {
                                console.error('Error deleting student:', error);
                                alert('Error deleting student. Please try again later.');
                            });
                        } catch (error) {
                            console.error('Error deleting student:', error);
                            alert('Error deleting student. Please try again later.');
                            window.history.back();
                        }
                    });
                } catch (error) {
                    console.error('Error loading review.html:', error);
                    content.innerHTML = '<p>Error loading review. Please try again later.</p>';
                }
            });

            content.appendChild(clone);
        });
    }

    async function renderAssignments() {
        content.innerHTML = '';
        content.classList.add('orientation-vertical');
        const assignments = await api.getMats();
        assignments.forEach((ent) => {
            const clonev = assignment.content.cloneNode(true);

            clonev.querySelector('#item-title').textContent = ent.nombre;
            clonev.querySelector('#item-description').textContent = ent.descripcion;

            clonev.querySelector('#metadata-codigo').textContent = ent.codigo || '';
            clonev.querySelector('#metadata-creditos').textContent = ent.creditos || '';

            clonev.querySelector('#delete-assign').addEventListener('click', async () => {
                try {
                    const response = await fetch('./delete.html');
                    if (!response.ok) {
                        throw new Error('Failed to load delete.html');
                    }
                    const htmlContent = await response.text();
                    content.innerHTML = '';
                    content.innerHTML = htmlContent;

                    // Populate delete.html with assignment data
                    document.getElementById('item-type').textContent = 'Asignatura';
                    document.getElementById('item-name').textContent = ent.nombre;
                    document.getElementById('item-id').textContent = ent.codigo;

                    document.getElementById('cancel-delete').addEventListener('click', () => {
                        renderAssignments();
                    });

                    document.getElementById('confirm-delete').addEventListener('click', () => {
                        try {
                            api.deleteAssign(ent.codigo).then(() => {
                                alert('Assignment deleted successfully!');
                                renderAssignments();
                            }).catch((error) => {
                                console.error('Error deleting assignment:', error);
                                alert('Error deleting assignment. API Fail.');
                            });
                        } catch (error) {
                            console.error('Error deleting assignment:', error);
                            alert('Error deleting assignment. Please try again later.');
                            window.history.back();
                        }
                    });
                } catch (error) {
                    console.error('Error loading delete.html:', error);
                    content.innerHTML = '<p>Error loading delete confirmation. Please try again later.</p>';
                }
            });

            clonev.querySelector('#review-assign').addEventListener('click', async () => {
                try {
                    const response = await fetch('./viewAsign.html');
                    if (!response.ok) {
                        throw new Error('Failed to load viewAsign.html');
                    }
                    const htmlContent = await response.text();
                    content.innerHTML = '';
                    content.innerHTML = htmlContent;

                    document.getElementById('asign-title').textContent = ent.nombre;
                    document.getElementById('asign-codigo').textContent = ent.codigo;
                    document.getElementById('asign-creditos').textContent = ent.creditos;
                    document.getElementById('asign-descripcion').textContent = ent.descripcion;

                    document.getElementById('back-home-button').addEventListener('click', () => {
                        renderAssignments();
                    });
                } catch (error) {
                    console.error('Error loading viewAsign.html:', error);
                    content.innerHTML = '<p>Error loading assignment details. Please try again later.</p>';
                }
            });
            content.appendChild(clonev);
        });
    }

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
                    renderStudents();
                } catch (error) {
                    console.error('Error creating student:', error);
                    alert('Error creating student. Please try again later.');
                }
            });
            document.getElementById('cancel-student').addEventListener('click', () => {
                renderStudents();
            });
        } catch (error) {
            alert('Error loading form. Please try again later.');
            console.error('Error loading form.html:', error);
            viewSection.innerHTML = '<p>Error loading form. Please try again later.</p>';
        }
    });

    // ADD NEW ASSIGNMENT BUTTON
    document.getElementById('add-assign-button').addEventListener('click', async () => {
        const viewSection = document.getElementById('view-section');
        try {
            const response = await fetch('./asignForm.html');
            if (!response.ok) {
                throw new Error('Failed to load asignForm.html');
            }
            const htmlContent = await response.text();
            viewSection.innerHTML = '';
            viewSection.innerHTML = htmlContent;

            const form = viewSection.querySelector('form');
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const assignment = {
                    codigo: form.codigo.value,
                    nombre: form.nombre.value,
                    descripcion: form.descripcion.value,
                    creditos: parseInt(form.creditos.value, 10)
                };

                try {
                    await api.addAssigment(assignment);
                    alert('Assignment created successfully!');
                    form.reset();
                    renderAssignments();
                } catch (error) {
                    console.error('Error creating assignment:', error);
                    alert('Error creating assignment. Please try again later.');
                }
            });

            document.getElementById('cancel-asignatura').addEventListener('click', () => {
                renderAssignments();
            });
        } catch (error) {
            alert('Error loading form. Please try again later.');
            console.error('Error loading asignForm.html:', error);
            viewSection.innerHTML = '<p>Error loading form. Please try again later.</p>';
        }
    });

    document.getElementById('students-button').addEventListener('click', renderStudents);

    document.getElementById('assigments-button').addEventListener('click', renderAssignments);
});