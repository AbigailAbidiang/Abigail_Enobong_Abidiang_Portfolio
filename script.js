// JavaScript Implementation for Task Management & Form Validation

document.addEventListener('DOMContentLoaded', () => {
    
    // --- ACADEMIC PLANNER SYSTEM ---
    const plannerForm = document.getElementById('planner-form');
    const taskInput = document.getElementById('task-input');
    const taskCategory = document.getElementById('task-category');
    const taskList = document.getElementById('task-list');

    let tasks = [
        { id: 1, text: 'Review Intro to Cyber Security study notes', category: 'Cyber Security', completed: false },
        { id: 2, text: 'Complete Web Technologies assignment submission', category: 'Web Development', completed: true },
        { id: 3, text: 'Research upcoming travel destinations', category: 'Personal / Travel', completed: false }
    ];

    function renderTasks() {
        if (!taskList) return;
        taskList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <div>
                    <strong>[${task.category}]</strong> ${task.text}
                </div>
                <div class="task-actions">
                    <button class="task-btn complete-btn" onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="task-btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    if (plannerForm) {
        plannerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = taskInput.value.trim();
            const category = taskCategory.value;

            if (text !== '') {
                const newTask = {
                    id: Date.now(),
                    text: text,
                    category: category,
                    completed: false
                };
                tasks.push(newTask);
                taskInput.value = '';
                renderTasks();
            }
        });
    }

    window.toggleTask = function(id) {
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        renderTasks();
    };

    window.deleteTask = function(id) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    };

    renderTasks();

    // --- FORM VALIDATION SYSTEM ---
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('success-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');

            // Reset error states
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

            // Name validation
            if (name.value.trim() === '') {
                document.getElementById('group-name').classList.add('error');
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                document.getElementById('group-email').classList.add('error');
                isValid = false;
            }

            // Phone number validation (digits only)
            const phoneRegex = /^[0-9+\s\-]+$/;
            if (phone.value.trim() === '' || !phoneRegex.test(phone.value.trim())) {
                document.getElementById('group-phone').classList.add('error');
                isValid = false;
            }

            // Message validation
            if (message.value.trim() === '') {
                document.getElementById('group-message').classList.add('error');
                isValid = false;
            }

            if (isValid) {
                contactForm.reset();
                if (successMsg) {
                    successMsg.style.display = 'block';
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
});
