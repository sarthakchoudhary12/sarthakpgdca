document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var form = event.target;
    var name = form.elements.txt.value;
    var email = form.elements.email.value;
    var phone = form.elements.phone.value;
    var restName = "Bhagsu"
    // Get the parameter value and update the label text
    var paramValue = getQueryParamValue('name');
	document.getElementById('restaurantLabel').innerHTML=paramValue;

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
     // Retrieve the value from the query parameter
function getQueryParamValue(key) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

function createMenuCard(item) {
    const card = document.createElement('div');
    card.classList.add('menu-card');
    card.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>${item.description}</p>
    `;
    return card;
  }

  // Retrieve the JSON data from local storage
  var menuData = JSON.parse(localStorage.getItem('menuData'));

  // Create cards based on the data
  menuData.forEach(function(item) {
    var card = createMenuCard(item);
    // Append the card to the container element on your page
    document.getElementById('menu-container').appendChild(card);
  });
