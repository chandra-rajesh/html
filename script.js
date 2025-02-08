document.getElementById('userButton').addEventListener('click', function() {
    // Redirect to the user home page
    window.location.href = 'home.html?role=user'; // Pass role as a query parameter
});

document.getElementById('adminButton').addEventListener('click', function() {
    // Redirect to the admin home page
    window.location.href = 'admin_login.html'; // Redirect to the admin login page
});