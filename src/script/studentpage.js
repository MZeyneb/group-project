import { endpoints } from "../constants/api.js";
import { addNewData, editDataById, getAllData } from "../services/api/index.js";

async function getTasks() {
    console.log("Fetching tasks...");
    const res = await getAllData(endpoints.tasks);
    displayTasks(res.data);
}

getTasks();
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');

    if (tasks.length === 0) {
        taskList.innerHTML = '<p>Heç bir tapşırıq mövcud deyil.</p>';
    } else {
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            const inp = document.querySelector(".inp")


            taskElement.innerHTML = `
                <h2>${task.title}</h2>
                <p><strong>Topic:</strong> ${task.topic}</p>
                <p><strong>Deadline:</strong> ${task.deadline}</p>
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Assignments:</strong></p>
                <ul>
                    ${task.assignments.map(assignment => `
                        <li>
                            <strong>Student ID:</strong> ${assignment.studentId}<br>
                            <strong>Assignment Date:</strong> ${assignment.assignDate}
                            <p>Task File</p>
                            <strong>
                                <input type="url" placeholder="task" class="inp" id="task-file-${assignment.studentId}" /> 
                                <input type="checkbox" class="checkbox" id="checkbox-${assignment.studentId}" /> 
                                <button class="submit-btn"  data-student-id="${assignment.studentId}">Submit</button>
                            </strong>
                        </li>
                    `).join('')}
                </ul>
            `;

          
            const submitButtons = taskElement.querySelectorAll('.submit-btn');
            submitButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const studentId = button.getAttribute('data-student-id');
                    const inp = document.getElementById(`task-file-${studentId}`);
                    const taskUrl = inp.value.trim();
                    const assignmentToUpdate = task.assignments.find(assignment => assignment.studentId === studentId);
                    const checkbox = document.getElementById(`checkbox-${studentId}`);
                    const isChecked = checkbox.checked
                    
                    

                    if (assignmentToUpdate) {
                        assignmentToUpdate.taskUrl = taskUrl;
                        assignmentToUpdate.isChecked = isChecked;

                           

                        // const newAssignment = {
                        //     studentId: studentId,  // You can set this dynamically based on the current user
                        //     taskUrl: "",           // Placeholder for the new URL, user will fill this
                        //     assignDate: new Date().toISOString() // You can adjust the date format as required
                        // };
                        // task.assignments.push(newAssignment);

                            
                            editDataById(endpoints.tasks, task.id, {
                                assignments: task.assignments  
                            });

           



                        // addNewData(endpoints.tasks, task.id, {
                        //     assignments: task.assignments  // send the updated assignments array
                        // });

                        // Optionally, update the status after submission
                        const statusElement = document.getElementById(`status-${studentId}`);
                       
                    }
                });
            });

            taskList.appendChild(taskElement);
        });
    }
}
