window.onload= function(){
    const queryString = window.location.search;

        // Create a new URLSearchParams object to parse the query string
        const urlParams = new URLSearchParams(queryString);

        // Get the value of the 'name' parameter
        const nameParam = urlParams.get('name');

        // Display the value in the console
        console.log('Name parameter:', nameParam);
		document.getElementById('restaurantLabel').innerHTML=nameParam;
    	

}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var form = event.target;
    var name = form.elements.txt.value;
    var email = form.elements.email.value;
    var phone = form.elements.phone.value;
    var restName= document.getElementById('restaurantLabel').innerHTML
    // Get the parameter value and update the label text
    

    // Create an object to hold the form data
    var formData = {
        name: name,
        email: email,
        phone: phone,
        restName: restName
    };

    // Send the form data to the server
    fetch('http://172.20.10.10:5000/send-message', {
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
            return response.json();
           // console.log(response.json())
        } else {
            alert('Error sending message.');
        }
    }).then(data=>{
        localStorage.setItem("menuData",JSON.stringify(data));
         window.location.href = 'menu.html';
    })
    .catch(function(error) {
        alert('An error occurred. Please try again later.');
        console.error(error);
    });
});


