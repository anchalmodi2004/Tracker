// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('reminder-date');
    const timeInput = document.getElementById('reminder-time');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const completedTaskList = document.getElementById('completed-task-list');
    const alarmSound = document.getElementById('alarm-sound');
    const progressBar = document.getElementById('progress');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const reminderDate = dateInput.value.trim();
        const reminderTime = timeInput.value.trim();
        
        // Validate input fields
        if (taskText === '' || reminderDate === '' || reminderTime === '') {
            if (taskText === '') taskInput.classList.add('error');
            if (reminderDate === '') dateInput.classList.add('error');
            if (reminderTime === '') timeInput.classList.add('error');
        } else {
            taskInput.classList.remove('error');
            dateInput.classList.remove('error');
            timeInput.classList.remove('error');
            
            const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
            addTask(taskText, reminderDateTime);
            taskInput.value = '';
            dateInput.value = '';
            timeInput.value = '';
        }
    });

    function addTask(task, reminderDateTime) {
        const li = document.createElement('li');
        li.textContent = task;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            li.classList.add('completed');
            taskList.removeChild(li);
            completedTaskList.appendChild(li);
            completeButton.remove();
            updateProgress();
        });

        li.appendChild(completeButton);
        taskList.appendChild(li);
        updateProgress();

        // Calculate the time until the reminder
        const now = new Date();
        const timeUntilReminder = reminderDateTime - now;

        if (timeUntilReminder > 0) {
            // Set a reminder
            setTimeout(() => {
                alert(`Reminder: ${task}`);
                alarmSound.play().catch((error) => {
                    console.error('Error playing the alarm sound:', error);
                    alert(`Reminder: ${task} (Alarm sound did not play)`);
                });
            }, timeUntilReminder);
        } else {
            alert('Please select a future date and time.');
        }
    }

    function updateProgress() {
        const totalTasks = taskList.children.length + completedTaskList.children.length;
        const completedTasks = completedTaskList.children.length;
        const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progressBar.style.width = progressPercentage + '%';
    }
});
