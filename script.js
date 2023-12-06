// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Function to redirect to the top-rated page based on the category (artists, albums, songs)
function redirectToTopRated(category) {
    // Use placeholder URLs for now
    window.location.href = `top-rated-${category}.html`;
}

// Function to redirect to the home page
function redirectToHome() {
    window.location.href = 'index.html';
}

var attempt = 3;


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

let spotifyArtistData = {
    type: "artist",
    name: "Stevie Wonder",
    imageUrl: "stevie_wonder.jpg",
};

let spotifyAlbumData = {
    type: "album",
    name: "Songs In The Key Of Life",
    imageUrl: "album_image.jpg",
    artist: "Album Artist",
};

let spotifyTrackData = {
    type: "track",
    name: "Track Name",
    imageUrl: "track_album_image.jpg",
    artist: "Track Artist",
    album: "Track Album",
};


// Function to update the template with Spotify data
function updateAlbumTemplate() {
    document.getElementById("pageTitle").innerText = spotifyAlbumData.name;
    document.getElementById("mediaTitle").innerText = spotifyAlbumData.name;
    document.getElementById("mediaContainer").getElementsByTagName("img")[0].src = spotifyAlbumData.imageUrl;

    const detailsContainer = document.getElementById("detailsContainer");
    detailsContainer.innerHTML = ""; // Clear existing details

    const artistElement = document.createElement("p");
    artistElement.innerText = `Artist: ${spotifyAlbumData.artist}`;
    detailsContainer.appendChild(artistElement);
}

// Function to update the template with Track data
function updateTrackTemplate() {
    document.getElementById("pageTitle").innerText = spotifyTrackData.name;
    document.getElementById("mediaTitle").innerText = spotifyTrackData.name;
    document.getElementById("mediaContainer").getElementsByTagName("img")[0].src = spotifyTrackData.imageUrl;

    const detailsContainer = document.getElementById("detailsContainer");
    detailsContainer.innerHTML = ""; // Clear existing details

    const artistElement = document.createElement("p");
    artistElement.innerText = `Artist: ${spotifyTrackData.artist}`;
    detailsContainer.appendChild(artistElement);

    const albumElement = document.createElement("p");
    albumElement.innerText = `Album: ${spotifyTrackData.album}`;
    detailsContainer.appendChild(albumElement);
}

// Function to update the template with Artist data
function updateArtistTemplate() {
    document.getElementById("pageTitle").innerText = spotifyArtistData.name;
    document.getElementById("mediaTitle").innerText = spotifyArtistData.name;
    document.getElementById("mediaContainer").getElementsByTagName("img")[0].src = spotifyArtistData.imageUrl;

    const detailsContainer = document.getElementById("detailsContainer");
    detailsContainer.innerHTML = ""; // Clear existing details

    // Add artist-specific details if needed
}

// Function to submit the rating (will be updated later)
function submitRating() {
    // Placeholder code to indicate that the rating will be updated later
    alert("Rating will be updated in the database. (Placeholder)");
}

function updateTemplateBasedOnCriteria(clickedItem) {
    if (clickedItem.type === "artist") {
        updateArtistTemplate();
    } else if (clickedItem.type === "album") {
        updateAlbumTemplate();
    } else if (clickedItem.type === "track") {
        updateTrackTemplate();
    }
}

const artistExample = {
    type: "artist"
}

// Update the template with Spotify data when the page loads
window.addEventListener('load', function () {
    updateTemplateBasedOnCriteria(artistExample);
});