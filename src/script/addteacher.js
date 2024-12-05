// #859A9D

document.getElementById('add-task-btn').addEventListener('click', () => {
    Swal.fire({
        title: 'Add New Task',
        html: `
            <div class="add-task">
                <div class="title">
                    <label for="title">Title</label>
                    <input type="text" id="title">
                </div>
                <div class="description">
                    <label for="description">Description</label>
                    <input type="text" id="description">
                </div>
                <div class="topic">
                    <label for="topic">Topic</label>
                    <select id="topic">
                        <option value="REACT">REACT</option>
                        <option value="JS">JS</option>
                        <option value="MangoDB">MangoDB</option>
                    </select>
                </div>
                <div class="task-url">
                    <label for="taskUrl">Task URL</label>
                    <input type="text" id="taskUrl">
                </div>
                <div class="assign-date">
                    <label for="assignDate">Assign Date</label>
                    <input type="date" id="assignDate">
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Add Task',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const topic = document.getElementById("topic").value;
            const taskUrl = document.getElementById("taskUrl").value;
            const assignDate = document.getElementById("assignDate").value;

            if (!title || !description || !topic || !taskUrl || !assignDate) {
                Swal.showValidationMessage('All fields must be filled!');
                return false;
            }

            const currentDate = new Date();
            const selectedDate = new Date(assignDate);

            if (selectedDate < currentDate) {
                Swal.showValidationMessage('Assign Date cannot be in the past!');
                return false;
            }

            const newTask = {
                title,
                description,
                topic,
                taskUrl,
                assignDate,
                createdAt: new Date().toISOString(),
                teacherId: "1",
                assignments: [
                    {
                        studentId: "1",
                        taskUrl: taskUrl,
                        assignDate: assignDate
                    }
                ]
            };

            return fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add task');
                    }
                })
                .catch(error => {
                    Swal.showValidationMessage(`Error: ${error.message}`);
                });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Task Added!',
                text: 'The new task has been added.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            RenderTasks();
        }
    });
});

let tasks = [];

document.addEventListener('DOMContentLoaded', RenderTasks);

function RenderTasks() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(data => {
            tasks = data;

            // Проверка на наличие задач
            const tableBody = document.getElementById('TaskTableBody');
            if (tasks.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center;">
                            <img src="https://v.wpimg.pl/MmJhNjg4YgwrCjhZSE9vGWhSbAMOFmFPP0p0SEgFf1V6EGEMDlgoHy8YIUQARjgdKx8-RBdYYgw6AWEcVhspBDkYIgseGygAKA0qRVdXfQwrXH9eSlB5XX1Fel5QBWBVcg16R1QFeF8oCXhSXw14C2gV" alt="No Tasks" style="width: 100px; height: 100px; border-radius: 50%;"/><br>
                            <span>You don't have any tasks</span>
                        </td>
                    </tr>
                `;
            } else {
                renderTable(tasks);
            }
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to load tasks. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
}

function renderTable(tasks) {
    const tableBody = document.getElementById('TaskTableBody');
    tableBody.innerHTML = tasks.map(task => `
        <tr data-id="${task.id}">
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.topic}</td>
            <td>${task.deadline}</td>
            <td>${task.createdAt}</td>
            <td><button class="edit-btn btn" onclick="editTask('${task.id}')">EDIT</button></td>
            <td><button class="delete-btn btn" onclick="deleteTask('${task.id}')">DELETE</button></td>
        </tr>
    `).join('');
}

function deleteTask(TaskId) {
    Swal.fire({
        title: 'Are you sure you want to delete this task?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/tasks/${TaskId}`, { method: 'DELETE' })
                .then(() => {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'This task has been deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    RenderTasks(); 
                })
                .catch(error => {
                    console.error('Error deleting task:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete the task. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        }
    });
}

function editTask(TaskId) {   
    const task = tasks.find(c => c.id === TaskId);
    if (!task) {
        return Swal.fire({
            title: 'Error',
            text: 'Task not found.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }

    Swal.fire({
        title: 'Edit Task',
        html: `
            <div class="edit-task">
                <div class="title">
                    <label for="title">Title</label>
                    <input type="text" id="title" value="${task.title}">
                </div>
                <div class="description">
                    <label for="description">Description</label>
                    <input type="text" id="description" value="${task.description}">
                </div>
                <div class="topic">
                    <label for="topic">Topic</label>
                    <select id="topic">
                        <option value="REACT" ${task.topic === "REACT" ? 'selected' : ''}>REACT</option>
                        <option value="JS" ${task.topic === "JS" ? 'selected' : ''}>JS</option>
                        <option value="MangoDB" ${task.topic === "MangoDB" ? 'selected' : ''}>MangoDB</option>
                    </select>
                </div>
                <div class="deadline">
                    <label for="deadline">Deadline</label>
                    <input type="text" id="deadline" value="${task.deadline}">
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            const newTitle = document.getElementById("title").value;
            const newDescription = document.getElementById("description").value;
            const newTopic = document.getElementById("topic").value;
            const newDeadline = document.getElementById("deadline").value;

            if (!newTitle || !newDescription || !newTopic || !newDeadline) {
                Swal.showValidationMessage('All fields must be filled!');
                return false;
            }

            task.title = newTitle;
            task.description = newDescription;
            task.topic = newTopic;
            task.deadline = newDeadline;

            return fetch(`http://localhost:3000/tasks/${TaskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update task');
                }
            }).catch(error => {
                Swal.showValidationMessage(`Error: ${error.message}`);
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Updated!',
                text: 'The task details have been updated.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            RenderTasks();  
        }
    });
}


const sidebar = document.createElement('div');
sidebar.id = 'sidebar';
sidebar.style.width = '200px';
sidebar.style.height = '100vh';
sidebar.style.backgroundColor = '#859A9D';
sidebar.style.position = 'fixed';
sidebar.style.top = '0';
sidebar.style.right = '-200px';
sidebar.style.boxSizing = 'border-box';
sidebar.style.transition = 'right 0.3s ease';
document.body.appendChild(sidebar);

const image = document.createElement('img');
image.src ='';
image.style.borderRadius = '50%';
image.style.width = '100px';
image.style.height = '100px';
image.style.display = 'flex';
image.style.justifyContent = 'center';
image.style.alignItems = 'center';
sidebar.appendChild(image);

const Logoutbtn = document.createElement('button');

function createMenuItem(text, href, action) {
  const div = document.createElement('div');
  div.style.width = '200px';
  div.style.height = '40px';
  div.style.textAlign = 'left';
  div.style.transition = '0.6s ease';


  const link = document.createElement('a');
  link.id = text.toLowerCase();
  link.id = text;
  link.innerText = text;
  link.href = href;
  link.style.display = 'block';
  link.style.padding = '12px 4px';
  link.style.color = '#fff';
  link.style.textDecoration = 'none';
  link.style.fontSize = '1rem';
  link.style.fontFamily = 'Arial, sans-serif';
  if (action) link.setAttribute('data-action', action);

  div.appendChild(link);
  div.onmouseover = () => (div.style.backgroundColor = '#7d9294');
  div.onmouseout = () => (div.style.backgroundColor = '#859A9D');

  sidebar.appendChild(div);
}

createMenuItem('Products', 'product.html');
createMenuItem('login', 'login.html','login');
createMenuItem('registration', 'register.html','registration');
createMenuItem('logout', '#','logout');

document.querySelectorAll('[data-action]').forEach((menuItem) => {
  menuItem.addEventListener('click', (event) => {
    event.preventDefault();
    const action = event.target.dataset.action;

  if (action === 'logout') {
      Swal.fire({
          title: 'Are you sure?',
          text: "Do you really want to log out?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, log out!'
      }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Logged Out',
              text: 'You have been logged out successfully.',
              icon: 'success',
               confirmButtonText: 'OK',
          }).then(() => {
              location.href = "login.html"
          })
             
          }
      });
  } else if (action === 'login' || action === 'registration') {
      window.location.href = event.target.href;
  }
});
});

const closeButton = document.createElement('button');
closeButton.innerText = 'X';
closeButton.style.position = 'absolute';
closeButton.style.top = '2px';
closeButton.style.left = '9px';
closeButton.style.fontSize = '0.6rem';
closeButton.style.background = 'none';
closeButton.style.border = 'none';
closeButton.style.color = '#fff';
closeButton.style.opacity = '0.7';
closeButton.style.cursor = 'pointer';
sidebar.appendChild(closeButton);

const user = document.querySelector('.user'); 

let sidebarVisible = false;

user.onclick = () => {
  sidebarVisible = !sidebarVisible;
  sidebar.style.right = sidebarVisible ? '0' : '-200px';
};

closeButton.onclick = () => {
  sidebarVisible = false;
  sidebar.style.right = '-200px';
};
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector('.search-Btn');
  let isScrolling;

  window.addEventListener('scroll', () => {
      searchBtn.classList.add('hidden'); 
      clearTimeout(isScrolling); 
      isScrolling = setTimeout(() => {
          searchBtn.classList.remove('hidden'); 
      }, 600); 
  });
});