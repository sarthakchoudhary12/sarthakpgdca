document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var form = event.target;
    var name = form.elements.txt.value;
    var email = form.elements.email.value;
    var phone = form.elements.phone.value;
    var restName = "Bhagsu"

    // Create an object to hold the form data
    var formData = {
        name: name,
        email: email,
        phone: phone,
        restName: restName
    };

    // Send the form data to the server
    fetch('http://192.168.1.4:5000/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        if (response.ok) {
            alert('Message sent successfully!' + response);
            form.reset(); // Clear form fields
            console.log(response.text())
          // window.location.href = 'menu.html';
        } else {
            alert('Error sending message.');
        }
    })
    .catch(function(error) {
        alert('An error occurred. Please try again later.');
        console.error(error);
    });
});
     // Retrieve the value from the query parameter
function getQueryParamValue(key) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
    }
    // Get the parameter value and update the label text
    var paramValue = getQueryParamValue('name');
	document.getElementById('restaurantLabel').innerHTML=paramValue;
