// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Function to redirect to the top-rated page based on the category (artists, albums, songs)
function redirectToTopRated(category) {
    // Use placeholder URLs for now
    window.location.href = `top-rated-${category}.html`;
}

function submitLoginForm() {
    // Add actual login functionality here when the backend is implemented
    alert('Login functionality will be implemented in the backend.');
}

// Function to redirect to the home page
function redirectToHome() {
    window.location.href = 'index.html';
}