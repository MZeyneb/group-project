import { endpoints } from "../constants/api.js";
import { getAllData } from "../services/api/index.js";

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
                            <strong>Task URL:</strong> <a href="${assignment.taskUrl}" target="_blank">${assignment.taskUrl}</a><br>
                            <strong>Assignment Date:</strong> ${assignment.assignDate}
                            <p>Task File</p>
                            <strong>
                                <input type="url" placeholder="task" id="task-file-${task.id}-${assignment.studentId}" value="${getStoredFile(task.id, assignment.studentId)}" /> 
                                <button class="submit-btn" data-task-id="${task.id}" data-student-id="${assignment.studentId}">Submit</button>
                            </strong>
                            <br>
                            <span id="status-${task.id}-${assignment.studentId}">${getStoredStatus(task.id, assignment.studentId)}</span>
                        </li>
                    `).join('')}
                </ul>
            `;

            taskList.appendChild(taskElement);
        });

        const submitButtons = document.querySelectorAll('.submit-btn');
        submitButtons.forEach(button => {
            button.addEventListener('click', handleSubmitClick);
        });
    }
}

function handleSubmitClick(event) {
    const taskId = event.target.getAttribute('data-task-id');
    const studentId = event.target.getAttribute('data-student-id');
    
    const statusElement = document.getElementById(`status-${taskId}-${studentId}`);
    const taskFileInput = document.getElementById(`task-file-${taskId}-${studentId}`).value;

    if (taskFileInput) {
        statusElement.textContent = "Uğurludur";
        statusElement.style.color = "green"; 
        storeData(taskId, studentId, taskFileInput, "Uğurludur");
    } else {
        statusElement.textContent = "Link Boşdur";
        statusElement.style.color = "red"; 
        storeData(taskId, studentId, taskFileInput, "Link Boşdur");
    }
}


function storeData(taskId, studentId, fileUrl, status) {
    const key = `task-${taskId}-student-${studentId}`;
    const data = {
        fileUrl,
        status
    };
    localStorage.setItem(key, JSON.stringify(data));
}


function getStoredFile(taskId, studentId) {
    const key = `task-${taskId}-student-${studentId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data).fileUrl : '';
}


function getStoredStatus(taskId, studentId) {
    const key = `task-${taskId}-student-${studentId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data).status : 'Link Boşdur';
}
