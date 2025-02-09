// Redirect for User and Admin buttons on the landing page
document.getElementById('userButton').addEventListener('click', function() {
    // Redirect to the user home page
    window.location.href = 'home.html'; // Ensure this file exists
});

document.getElementById('adminButton').addEventListener('click', function() {
    // Redirect to the admin authentication page
    window.location.href = 'adminauth.html'; // Ensure this file exists
});

// Redirect for Login and Signup buttons on the admin authentication page
document.getElementById('login').addEventListener('click', function() {
    console.log('login button clicked');
    
    window.location.href = 'admin_login.html'; // Redirect to admin login page
});

document.getElementById('signup').addEventListener('click', function() {
    window.location.href = 'admin_signup.html'; // Redirect to admin signup page
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    // Here you would typically validate the login credentials
    // For this example, we'll just redirect to the admin home page
    window.location.href = 'admin_home.html'; // Redirect to admin home page
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    // Here you would typically handle the signup process
    // For this example, we'll just redirect to the admin home page
    window.location.href = 'admin_home.html'; // Redirect to admin home page
});
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login').addEventListener('click', function() {
        window.location.href = 'admin_login.html'; // Redirect to admin login page
    });

    document.getElementById('signup').addEventListener('click', function() {
        window.location.href = 'admin_signup.html'; // Redirect to admin signup page
    });
});