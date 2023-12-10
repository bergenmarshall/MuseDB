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

function redirectToSearch() {
    window.location.href = 'search.html';
}

function redirectToSearchByType(category) {
    window.location.href = `search-${category}.html`;
}

var attempt = 3;
const url = '127.0.0.1:8000';


function submitLoginForm() {
    // Add actual login functionality here when the backend is implemented
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    

    
    const xhttpr = new XMLHttpRequest(); 
    xhttpr.open('GET', 'http://' + url + '/login?username='+ username + '&password='+ password, true); 
    
    xhttpr.send(); 
    
    xhttpr.onload = ()=> { 
    if (xhttpr.status === 200) { 
        const response = JSON.parse(xhttpr.response); 
        if (response.msg == "incorrect username")
            {
                attempt --;// Decrementing by one.
                alert("incorrect username, You have" +attempt+" attempts left");
                // Disabling fields after 3 attempts.
                if( attempt == 0){
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("submit").disabled = true;
                return false;
                } 
            } else if (response.msg == "incorrect password")
            {
                attempt --;// Decrementing by one.
                alert("incorrect password, You have"+attempt+" attempts left");
                // Disabling fields after 3 attempts.
                if( attempt == 0){
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("submit").disabled = true;
                return false;
                }
            } else {
                alert("login successful, user: " + response.username)
                sessionStorage.setItem("username", response.username);
            }
            
    } else { 
        alert("error");
    } 
    }; 

        
        
}

function submitRegistrationForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password != confirmPassword){
        alert("Passwords do not match");
        return false;
    }
    const xhttpr = new XMLHttpRequest(); 
    xhttpr.open('POST', 'http://' + url + '/register?username='+ username + '&password='+ password, true); 
    
    xhttpr.send(); 
    
    xhttpr.onload = ()=> { 
    if (xhttpr.status === 200) { 
        const response = JSON.parse(xhttpr.response); 
        alert(response.msg);
    } else { 
        alert("error"); 
    } 
    }; 
}

let spotifyArtistData = {
    type: "artist",
    name: "Stevie Wonder",
    imageUrl: "stevie_wonder.jpg",
    id: "",
};

let spotifyAlbumData = {
    type: "album",
    name: "Songs In The Key Of Life",
    imageUrl: "Stevie_Songs_In_The_Key_Of_Life.jpg",
    artist: "Stevie Wonder",
    id: "",
};

let spotifyTrackData = {
    type: "track",
    name: "Saturn",
    imageUrl: "Stevie_Songs_In_The_Key_Of_Life.jpg",
    artist: "Stevie Wonder",
    album: "Songs In The Key of Life",
    id: "",
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
function submitRating(category) {
    let ratingData = {};
    if(category === "artist") {
        ratingData = spotifyArtistData;
    }
    else if(category === "track") {
        ratingData = spotifyTrackData;
    }
    else if(category === "album") {
        ratingData = spotifyAlbumData;
    }

    const ratingValue = document.getElementById('rating').value.trim();

    if(ratingValue === ""){
        alert('Please enter a rating before submitting.');
        return;
    }
    username = sessionStorage.getItem("username");
    if (username) {
        continue;
    }
    else {
        alert('Please log in/register to leave a rating.');
        return;
    }
    console.log(ratingData.name + " " + ratingValue + " " + username);
    const xhttpr = new XMLHttpRequest();
    xhttpr.open('POST', 'http://' + url + '/submit-review?username='+ username + '&music_id='+ ratingData.id + '&rating='+ ratingValue +'&review_type=' + category, true);
    xhttpr.send();
    xhttpr.onload = ()=> {
        if (xhttpr.status === 200) {
            const response = JSON.parse(xhttpr.response);
            alert(response.msg);
        } else {
            alert("error");
        }
    };
}

let IDs = ['', '', '', '', ''];

function updateSearchResultsArtists(results) {
    for (let i = 0; i < Object.keys(results).length; i++) {
        const entryElement = document.getElementById(`entry${i + 1}`);
        const imgElement = entryElement.querySelector("img");
        const pElement = entryElement.querySelector("p");

        IDs[i] = results[i]['id'];

        imgElement.src = results[i]["image"];
        imgElement.alt = results[i]["name"];
        pElement.innerText = results[i]["name"];
    }
}

// Function to update search results for albums
function updateSearchResultsAlbums(results) {
    for (let i = 0; i < Object.keys(results).length; i++) {
        const entryElement = document.getElementById(`entry${i + 1}`);
        const imgElement = entryElement.querySelector("img");
        const nameElement = entryElement.querySelector("p:nth-child(2)");
        const artistElement = entryElement.querySelector("p:nth-child(3)");

        IDs[i] = results[i]['id'];

        imgElement.src = results[i]["image"];
        imgElement.alt = results[i]["name"];
        nameElement.innerText = results[i]["name"];
        artistElement.innerText = results[i]["artist"];

    }
}

// Function to update search results for songs
function updateSearchResultsTracks(results) {
    for (let i = 0; i < Object.keys(results).length; i++) {
        const entryElement = document.getElementById(`entry${i + 1}`);
        const imgElement = entryElement.querySelector("img");
        const nameElement = entryElement.querySelector("p:nth-child(2)");
        const artistElement = entryElement.querySelector("p:nth-child(3)");
        const albumElement = entryElement.querySelector("p:nth-child(4)");

        IDs[i] = results[i]['id'];

        imgElement.src = results[i]["image"];
        imgElement.alt = results[i]["name"];
        nameElement.innerText = results[i]["name"];
        artistElement.innerText = results[i]["artist"];
        albumElement.innerText = results[i]["album"];
    }
}

function performSearch(category) {
    const xhttpr = new XMLHttpRequest(); 
    var query = document.getElementById("searchInput").value;
    xhttpr.open('GET', 'http://' + url + '/search?query=' + query + '&search_type=' + category, true);
    xhttpr.send();
    xhttpr.onload = ()=> { 
        if (xhttpr.status === 200) { 
            const response = JSON.parse(xhttpr.response);
            if (category === "album") {
                updateSearchResultsAlbums(response);
                var x = document.getElementById("results1");
                x.style.display = "block";
            }
            else if (category === "track") {
                updateSearchResultsTracks(response);
                var x = document.getElementById("results1");
                x.style.display = "block";
            }
            else if (category === "artist") {
                updateSearchResultsArtists(response);
                var x = document.getElementById("results1");
                x.style.display = "block";
            }

        } else { 
            alert("Error with Retrieving " + category + " Data");
        } 
        };
}

function redirectToTrack( numClicked ) {
    const entryElement = document.getElementById(`entry${numClicked}`);
    const imgElement = entryElement.querySelector("img");
    const nameElement = entryElement.querySelector("p:nth-child(2)");
    const artistElement = entryElement.querySelector("p:nth-child(3)");
    const albumElement = entryElement.querySelector("p:nth-child(4)");

    spotifyTrackData.name = nameElement.innerText;
    spotifyTrackData.album = albumElement.innerText;
    spotifyTrackData.artist = artistElement.innerText;
    spotifyTrackData.imageUrl = imgElement.src;
    spotifyTrackData.id = IDs[numClicked - 1];

    sessionStorage.setItem('spotifyTrackData', JSON.stringify(spotifyTrackData));

    window.location.href = 'track.html';
}

function redirectToAlbum( numClicked ) {
    const entryElement = document.getElementById(`entry${numClicked}`);
    const imgElement = entryElement.querySelector("img");
    const nameElement = entryElement.querySelector("p:nth-child(2)");
    const artistElement = entryElement.querySelector("p:nth-child(3)");

    spotifyAlbumData.name = nameElement.innerText;
    spotifyAlbumData.artist = artistElement.innerText;
    spotifyAlbumData.imageUrl = imgElement.src;
    spotifyAlbumData.id = IDs[numClicked - 1];

    sessionStorage.setItem('spotifyAlbumData', JSON.stringify(spotifyAlbumData));
    window.location.href = 'album.html';
}

function redirectToArtist( numClicked ) {
    const entryElement = document.getElementById(`entry${numClicked}`);
    const imgElement = entryElement.querySelector("img");
    const pElement = entryElement.querySelector("p");

    spotifyArtistData.name = pElement.innerText;
    spotifyArtistData.imageUrl = imgElement.src;
    spotifyArtistData.id = IDs[numClicked - 1];

    sessionStorage.setItem('spotifyArtistData', JSON.stringify(spotifyArtistData));

    window.location.href = 'artist.html';
}

function readFromLocalStorageTrack() {
    const storedData = sessionStorage.getItem('spotifyTrackData');

    if (storedData) {
        // Parse the stored data and use it as needed
        const parsedData = JSON.parse(storedData);

        // Example: Log the data
        console.log('Data retrieved from localStorage:', parsedData);

        spotifyTrackData.album = parsedData.album;
        spotifyTrackData.artist = parsedData.artist;
        spotifyTrackData.imageUrl = parsedData.imageUrl;
        spotifyTrackData.name = parsedData.name;
        spotifyTrackData.id = parsedData.id;
        updateTrackTemplate();
    } else {
        alert('No data found in sessionStorage.');
    }
}

function readFromLocalStorageArtist() {
    const storedData = sessionStorage.getItem('spotifyArtistData');

    if (storedData) {
        // Parse the stored data and use it as needed
        const parsedData = JSON.parse(storedData);

        // Example: Log the data
        console.log('Data retrieved from localStorage:', parsedData);

        spotifyArtistData.name = parsedData.name;
        spotifyArtistData.imageUrl = parsedData.imageUrl;
        spotifyArtistData.id = parsedData.id;
        updateArtistTemplate();
    } else {
        alert('No data found in sessionStorage.');
    }
}

function readFromLocalStorageAlbum() {
    const storedData = sessionStorage.getItem('spotifyAlbumData');

    if (storedData) {
        // Parse the stored data and use it as needed
        const parsedData = JSON.parse(storedData);

        // Example: Log the data
        console.log('Data retrieved from sessionStorage:', parsedData);

        spotifyAlbumData.artist = parsedData.artist;
        spotifyAlbumData.imageUrl = parsedData.imageUrl;
        spotifyAlbumData.name = parsedData.name;
        spotifyAlbumData.id = parsedData.id;
        updateAlbumTemplate();        
    } else {
        alert('No data found in sessionStorage.');
    }
}