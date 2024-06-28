document.addEventListener('DOMContentLoaded', function() {
    const usersContainer = document.getElementById('users');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const deleteForm = document.getElementById('deleteForm');
    const loadUsersButton = document.getElementById('loadUsers');
    let allUsers = []; 

    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    function setUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function displayUsers(users) {
        usersContainer.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h2>Nombre: ${user.name}</h2>
                <p>ID: ${user.id}</p>
                <p>Email: ${user.email}</p>
            `;
            usersContainer.appendChild(userCard);
        });
    }

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const users = getUsers();

        const newUser = { id: users.length + 1, name, email, password };
        users.push(newUser);
        setUsers(users);

        alert('Registro exitoso');
        allUsers = [...users]; 
        displayUsers(allUsers); 
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const users = getUsers();

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            alert('Inicio de sesión exitoso');
        } else {
            alert('Credenciales incorrectas');
        }
    });

    deleteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userId = parseInt(document.getElementById('userId').value, 10);
        let users = getUsers();

        users = users.filter(user => user.id !== userId);
        setUsers(users);

        allUsers = allUsers.filter(user => user.id !== userId);

        alert('Usuario eliminado');
        displayUsers(allUsers);
    });

    loadUsersButton.addEventListener('click', function() {
        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(data => {
                const apiUsers = data.data.map(user => ({
                    id: user.id,
                    name: user.first_name + ' ' + user.last_name,
                    email: user.email
                }));
                const localUsers = getUsers();
                allUsers = [...localUsers, ...apiUsers];
                displayUsers(allUsers);
            })
            .catch(error => {
                console.error('Error al cargar los usuarios de la API:', error);
            });
    });
    allUsers = getUsers();
    displayUsers(allUsers);
});
