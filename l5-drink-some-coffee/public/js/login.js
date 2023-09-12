document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            // Save the token in the browser
            localStorage.setItem('jwtToken', data.token);

            window.location.href = '/coffee'; 
        } else {
            alert("Authentication failed!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
