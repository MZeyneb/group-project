import { endpoints } from "../constants/api.js";
import { addNewData, editDataById, getAllData } from "../services/api/index.js";

async function getTasks() {
    console.log("Fetching tasks...");
    const res = await getAllData(endpoints.tasks);
    displayTasks(res.data);
}

getTasks();

function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');

    if (tasks.length === 0) {
        taskList.innerHTML = '<p>Heç bir tapşırıq mövcud deyil.</p>';
    } else {
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');

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
                                <button class="submit-btn" data-student-id="${assignment.studentId}">Submit</button>
                                <p id="status-${assignment.studentId}" class="status"></p>
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
                    const statusElement = document.getElementById(`status-${studentId}`);
                    
                    if (!taskUrl) {
                        statusElement.textContent = 'Tapşırıq yoxdur';
                        statusElement.style.color = 'red';
                    } else {
                        const assignmentToUpdate = task.assignments.find(assignment => assignment.studentId === studentId);
                        if (assignmentToUpdate) {
                            assignmentToUpdate.taskUrl = taskUrl;

                            
                            editDataById(endpoints.tasks, task.id, {
                                assignments: task.assignments  
                            });

                           
                            statusElement.textContent = 'Uğurludur';
                            statusElement.style.color = 'green';
                        }
                    }
                });
            });

            taskList.appendChild(taskElement);
        });
    }
}
