// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after everything is loaded
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Anniversary countdown timer
    const anniversaryDate = new Date('2025-07-30T00:00:00'); // Set your anniversary date here
    
    // Check if current date is before anniversary date
    const isBeforeAnniversary = new Date() < anniversaryDate;
    
    // Show or hide content based on date
    const fullContent = document.getElementById('full-content');
    const countdownOnly = document.getElementById('countdown-only');
    
    if (isBeforeAnniversary) {
        fullContent.style.display = 'none';
        countdownOnly.style.display = 'block';
        
        // Add password unlock functionality
        const passwordForm = document.getElementById('password-form');
        if (passwordForm) {
            passwordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const passwordInput = document.getElementById('password-input');
                const password = passwordInput.value.trim();
                
                // You can change this password to anything you want
                const correctPassword = 'iloveyou';
                
                if (password.toLowerCase() === correctPassword) {
                    // Show the full content when password is correct
                    fullContent.style.display = 'block';
                    countdownOnly.style.display = 'none';
                    
                    // Store in session storage that password was entered correctly
                    sessionStorage.setItem('anniversaryUnlocked', 'true');
                } else {
                    const errorMessage = document.getElementById('password-error');
                    if (errorMessage) {
                        errorMessage.style.display = 'block';
                        
                        // Hide the error message after 3 seconds
                        setTimeout(() => {
                            errorMessage.style.display = 'none';
                        }, 3000);
                    }
                }
                
                // Clear input field
                passwordInput.value = '';
            });
        }
    } else {
        fullContent.style.display = 'block';
        countdownOnly.style.display = 'none';
    }
    
    // Check if user already unlocked the page in this session
    if (sessionStorage.getItem('anniversaryUnlocked') === 'true') {
        fullContent.style.display = 'block';
        countdownOnly.style.display = 'none';
    }
    
    function updateCountdown() {
        const currentTime = new Date();
        const difference = anniversaryDate - currentTime;
        
        if (difference <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.querySelector('.subtitle').textContent = 'Happy Anniversary!';
            
            // Automatically show full content when the countdown finishes
            fullContent.style.display = 'block';
            if (countdownOnly) {
                countdownOnly.style.display = 'none';
            }
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // To-do list functionality
    initializeTodoList();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for nav height
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Handle navigation active state on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = 70;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add a simple easter egg - click the heart in the footer 5 times to show a special message
    let heartClicks = 0;
    const heartIcon = document.querySelector('footer .fa-heart');
    
    if (heartIcon) {
        heartIcon.addEventListener('click', function() {
            heartClicks++;
            
            if (heartClicks === 5) {
                // Create a hidden message element that will appear
                const hiddenMessage = document.createElement('div');
                hiddenMessage.classList.add('hidden-message');
                hiddenMessage.innerHTML = `
                    <div class="hidden-message-content">
                        <h3>I love you more than words can say</h3>
                        <p>This message is just for you to discover. You're the most important person in my life.</p>
                        <button class="close-message">Close</button>
                    </div>
                `;
                
                document.body.appendChild(hiddenMessage);
                
                // Add styles for the hidden message
                const style = document.createElement('style');
                style.textContent = `
                    .hidden-message {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.8);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                        animation: fadeIn 0.5s ease;
                    }
                    
                    .hidden-message-content {
                        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                        color: white;
                        padding: 2rem;
                        border-radius: 15px;
                        max-width: 400px;
                        text-align: center;
                    }
                    
                    .hidden-message button {
                        background-color: white;
                        color: var(--primary-color);
                        border: none;
                        padding: 10px 20px;
                        border-radius: 30px;
                        margin-top: 20px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    }
                    
                    .hidden-message button:hover {
                        transform: scale(1.05);
                        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                
                document.head.appendChild(style);
                
                document.querySelector('.close-message').addEventListener('click', function() {
                    hiddenMessage.remove();
                    style.remove();
                });
                
                heartClicks = 0;
            }
        });
    }
});

// Function to initialize the to-do list functionality
function initializeTodoList() {
    const todoList = document.querySelector('.todo-list');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const newTodoInput = document.getElementById('new-todo-input');
    
    if (todoList) {
        // Add event listeners to existing todo checkboxes
        const checkboxes = document.querySelectorAll('.todo-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('click', toggleTodoItem);
        });
        
        // Add functionality to add new todo items
        if (addTodoBtn && newTodoInput) {
            addTodoBtn.addEventListener('click', addNewTodoItem);
            
            // Allow adding todo by pressing Enter
            newTodoInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addNewTodoItem();
                }
            });
        }
    }
    
    // Function to toggle todo item completion
    function toggleTodoItem() {
        this.classList.toggle('checked');
        const todoItem = this.closest('.todo-item');
        todoItem.classList.toggle('completed');
        
        // Optional: Save todo states to localStorage
        saveTodoState();
    }
    
    // Function to add a new todo item
    function addNewTodoItem() {
        const todoText = newTodoInput.value.trim();
        
        if (todoText !== '') {
            // Create new todo item elements
            const newTodo = document.createElement('li');
            newTodo.className = 'todo-item';
            
            const checkbox = document.createElement('div');
            checkbox.className = 'todo-checkbox';
            checkbox.addEventListener('click', toggleTodoItem);
            
            const text = document.createElement('span');
            text.className = 'todo-text';
            text.textContent = todoText;
            
            // Append elements
            newTodo.appendChild(checkbox);
            newTodo.appendChild(text);
            todoList.appendChild(newTodo);
            
            // Clear the input field
            newTodoInput.value = '';
            
            // Optional: Save todo states to localStorage
            saveTodoState();
        }
    }
    
    // Function to save todo states to localStorage
    function saveTodoState() {
        const todoItems = document.querySelectorAll('.todo-item');
        const todos = [];
        
        todoItems.forEach(item => {
            todos.push({
                text: item.querySelector('.todo-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        
        localStorage.setItem('anniversaryTodos', JSON.stringify(todos));
    }
    
    // Function to load todo states from localStorage
    function loadTodoState() {
        const savedTodos = localStorage.getItem('anniversaryTodos');
        
        if (savedTodos) {
            // Clear current list
            todoList.innerHTML = '';
            
            // Recreate todo items from saved state
            const todos = JSON.parse(savedTodos);
            todos.forEach(todo => {
                const newTodo = document.createElement('li');
                newTodo.className = 'todo-item';
                if (todo.completed) {
                    newTodo.classList.add('completed');
                }
                
                const checkbox = document.createElement('div');
                checkbox.className = 'todo-checkbox';
                if (todo.completed) {
                    checkbox.classList.add('checked');
                }
                checkbox.addEventListener('click', toggleTodoItem);
                
                const text = document.createElement('span');
                text.className = 'todo-text';
                text.textContent = todo.text;
                
                newTodo.appendChild(checkbox);
                newTodo.appendChild(text);
                todoList.appendChild(newTodo);
            });
        }
    }
    
    // Load saved todos when the page loads
    loadTodoState();
}
