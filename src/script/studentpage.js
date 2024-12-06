import { endpoints } from "../constants/api.js";
import { addNewData, editDataById, getAllData } from "../services/api/index.js";

async function getTasks() {
    console.log("a");
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
                                <button class="submit-btn"  data-student-id="${assignment.studentId}">Submit</button>
                            </strong>
                            <br>
                            
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

                    if (assignmentToUpdate) {
                        assignmentToUpdate.taskUrl = taskUrl;

                        // Call the API to patch the updated task (this assumes you have a patch API)
                        editDataById(endpoints.tasks, task.id, {
                            assignments: task.assignments  // send the updated assignments array
                        });

                        // Optionally, update the status after submission
                        const statusElement = document.getElementById(`status-${studentId}`);
                        statusElement.textContent = 'Submitted';
                    }
                });
            });


            taskList.appendChild(taskElement);
        });




    }
}




























// function handleSubmitClick(event) {
//     const taskId = event.target.getAttribute('data-task-id');
//     const studentId = event.target.getAttribute('data-student-id');
    
//     const statusElement = document.getElementById(`status-${taskId}-${studentId}`);
//     const taskFileInput = document.getElementById(`task-file-${taskId}-${studentId}`).value;

//     if (taskFileInput) {
//         statusElement.textContent = "Uğurludur";
//         statusElement.style.color = "green"; 
//         storeData(taskId, studentId, taskFileInput, "Uğurludur");
//     } else {
//         statusElement.textContent = "Link Boşdur";
//         statusElement.style.color = "red"; 
//         storeData(taskId, studentId, taskFileInput, "Link Boşdur");
//     }
// }


// function storeData(taskId, studentId, fileUrl, status) {
//     const key = `task-${taskId}-student-${studentId}`;
//     const data = {
//         fileUrl,
//         status
//     };
//     localStorage.setItem(key, JSON.stringify(data));
// }


// function getStoredFile(taskId, studentId) {
//     const key = `task-${taskId}-student-${studentId}`;
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data).fileUrl : '';
// }


// function getStoredStatus(taskId, studentId) {
//     const key = `task-${taskId}-student-${studentId}`;
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data).status : 'Link Boşdur';
// }
