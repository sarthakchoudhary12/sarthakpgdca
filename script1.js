document.querySelector('.login').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var form = event.target;
    var email = form.elements.email.value;
    var password = form.elements.password.value;

    // Create an object to hold the form data
    var formData = {
        email: email,
        password: password
    };

    // Send the form data to the server
    fetch('http://172.20.10.10:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        if (response.ok) {
            // Form submitted successfully
            alert('Form submitted successfully!');
            form.reset(); // Clear form fields
            return response.text(); 
          
        } else {
            // Error occurred while submitting the form
            alert('Error submitting the form. Please try again.');
        }
    })
    .then(data =>{
        var paramValue = data;
        // Construct the URL with the parameter value
        var url = "RestaurantForm.html?name=" + encodeURIComponent(paramValue);
        // Redirect the page to the constructed URL
        window.location.href = url;
    })

    .catch(function(error) {
        // Error occurred while sending the request
        alert('An error occurred. Please try again later.');
        console.error(error);
    });
});
