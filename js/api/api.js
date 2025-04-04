const API_URL = 'https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts';

// API Service
const api = {
    // Headers for API requests
    headers: {
        'apikey': API_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    },



    //   GET /alumno

    // POST /alumno

    // PATCH /alumno?codigo=eq.<codigo>

    // DELETE /alumno?codigo=eq.<codigo>

    // Fetch all students
    async getStudents() {
        try {
            const response = await fetch(`${API_URL}/alumno`, {
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    },


    // // Fetch a single student by code
    // async getStudentByCode(code) {
    //     try {
    //         const response = await fetch(`${API_URL}/student?code=eq.${code}&select=*`, {
    //             headers: this.headers
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch student');
    //         }

    //         const data = await response.json();
    //         return data[0] || null;
    //     } catch (error) {
    //         console.error(`Error fetching student with code ${code}:`, error);
    //         throw error;
    //     }
    // },


    // // Create a new student
    // async createStudent(student) {
    //     try {
    //         const response = await fetch(`${API_URL}/student`, {
    //             method: 'POST',
    //             headers: this.headers,
    //             body: JSON.stringify(student)
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to create student');
    //         }

    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error creating student:', error);
    //         throw error;
    //     }
    // },


    // // Update an existing student
    // async updateStudent(code, student) {
    //     try {
    //         const response = await fetch(`${API_URL}/student?code=eq.${code}`, {
    //             method: 'PATCH',
    //             headers: this.headers,
    //             body: JSON.stringify(student)
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to update student');
    //         }

    //         return await response.json();
    //     } catch (error) {
    //         console.error(`Error updating student with code ${code}:`, error);
    //         throw error;
    //     }
    // },


    // // Fetch all technologies
    // async getTechnologies() {
    //     try {
    //         const response = await fetch(`${API_URL}/technology?select=*`, {
    //             headers: this.headers
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch technologies');
    //         }

    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error fetching technologies:', error);
    //         throw error;
    //     }
    // },


    // // Fetch technologies for a specific student
    // async getStudentTechnologies(studentCode) {
    //     try {
    //         const response = await fetch(
    //             `${API_URL}/student_technology?student_code=eq.${studentCode}&select=*,technology:technology_code(*)`, {
    //             headers: this.headers
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch student technologies');
    //         }

    //         return await response.json();
    //     } catch (error) {
    //         console.error(`Error fetching technologies for student ${studentCode}:`, error);
    //         throw error;
    //     }
    // },


    // // Add a technology to a student
    // async addStudentTechnology(studentTech) {
    //     try {
    //         const response = await fetch(`${API_URL}/student_technology`, {
    //             method: 'POST',
    //             headers: this.headers,
    //             body: JSON.stringify(studentTech)
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to add technology to student');
    //         }

    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error adding technology to student:', error);
    //         throw error;
    //     }
    // },


    // // Update a student's technology
    // async updateStudentTechnology(studentCode, technologyCode, level) {
    //     try {
    //         const response = await fetch(
    //             `${API_URL}/student_technology?student_code=eq.${studentCode}&technology_code=eq.${technologyCode}`, {
    //             method: 'PATCH',
    //             headers: this.headers,
    //             body: JSON.stringify({ level })
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to update student technology');
    //         }

    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error updating student technology:', error);
    //         throw error;
    //     }
    // },


    // // Delete a student's technology
    // async deleteStudentTechnology(studentCode, technologyCode) {
    //     try {
    //         const response = await fetch(
    //             `${API_URL}/student_technology?student_code=eq.${studentCode}&technology_code=eq.${technologyCode}`, {
    //             method: 'DELETE',
    //             headers: this.headers
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to delete student technology');
    //         }

    //         return true;
    //     } catch (error) {
    //         console.error('Error deleting student technology:', error);
    //         throw error;
    //     }
    // }
};

export default api;