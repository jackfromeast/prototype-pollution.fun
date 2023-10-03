const icons = document.querySelectorAll('#coffeeIcon');
icons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 1}s`;  // 2s delay between each icon
});

var sendCoffeeScriptCode = function() {
    // Get the CoffeeScript code from the textarea
    var coffeeScriptCode = document.getElementById('editor').value;

    // Send the code to the server for compilation
    fetch('/coffee-compiler', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') // ensure you have the JWT token saved in localStorage
        },
        body: JSON.stringify({
            code: coffeeScriptCode
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.compiledCode) {
            document.getElementById('preformattedCode').innerHTML = data.compiledCode;
        } else {
            alert("Compilation failed!");
        }
    })
    .catch(error => {
        console.error('Compilation error:', error);
    });
}

var downloadCompiledFile = function() {
    var updatedText = document.getElementById('compiledJs').value;
    var fileName;
    if (fileName === undefined) {
        fileName = "compiled.js"; // default name if none provided
    }
    var outputFile = new Blob([updatedText], {type: 'text/plain'});
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', URL.createObjectURL(outputFile));
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


function fetchAdminData() {
    fetch(`/admin?url=${window.location.origin}/`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('adminData').innerText = data;
    })
    .catch(error => {
        console.error('There was an error fetching the admin data:', error);
    });
}