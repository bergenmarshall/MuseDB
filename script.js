


var attempt = 3;
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
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    const xhttpr = new XMLHttpRequest(); 
    xhttpr.open('GET', 'http://127.0.0.1:8000/login?username='+ username + '&password='+ password, true); 
    
    xhttpr.send(); 
    
    xhttpr.onload = ()=> { 
    if (xhttpr.status === 200) { 
        const response = JSON.parse(xhttpr.response); 
        alert(response.username);
    } else { 
        // Handle error 
    } 
    }; 

        // attempt --;// Decrementing by one.
        // alert("You have left "+attempt+" attempt;");
        // // Disabling fields after 3 attempts.
        // if( attempt == 0){
        // document.getElementById("username").disabled = true;
        // document.getElementById("password").disabled = true;
        // document.getElementById("submit").disabled = true;
        // return false;
        // }
        
}

// Function to redirect to the home page
function redirectToHome() {
    window.location.href = 'index.html';
}

function submitRegistrationForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    const xhttpr = new XMLHttpRequest(); 
    xhttpr.open('GET', 'http://127.0.0.1:8000/register?username='+ username + '&password='+ password, true); 
    
    xhttpr.send(); 
    
    xhttpr.onload = ()=> { 
    if (xhttpr.status === 200) { 
        const response = JSON.parse(xhttpr.response); 
        alert(response.username);
    } else { 
        // Handle error 
    } 
    }; 
}