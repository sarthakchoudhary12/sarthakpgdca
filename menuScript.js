// function getQueryParamValue(key) {
//     var urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(key);
// }

function createMenuCard(item,index) {
    const card = document.createElement('div');
    card.classList.add('menu-card');
    card.innerHTML = `
        <h2>${item.name}</h2>
        <img src=${item.url}>
        <span id=${index} hidden=true>${item.id}</span>
        <p>Price: ${item.price.toFixed(2)}</p>
        <button class="add-to-cart" id ="menu-button" onClick="onMenuButton(${index})">+</button>
    `;
    return card;
  }
  var menuData = JSON.parse(localStorage.getItem('menuData'));
  console.log(menuData)

  // Create cards based on the data
  var i = 0;
  menuData.forEach(function(item) {
    var card = createMenuCard(item,i++);
    // Append the card to the container element on your page
    document.getElementById('menu-container').appendChild(card);
  });

  function onMenuButton(event) {
    console.log(event)
        var itemId = document.getElementById(event).innerHTML;
        console.log(itemId)
        addToCart(itemId);
    };
var cart = [];
var itemCount = {};

// ... Your existing code ...

// Function to add items to the cart
function addToCart(itemId,itemName) {
    // Find the item in menuData array based on the itemId
    var selectedItem = menuData.find(item => item.id == itemId);

    // If the item is found, add it to the cart
    if (selectedItem) {
        // Add the item to the cart array
        cart.push(selectedItem);
        if (!itemCount[itemId]) {
            itemCount[itemId] = 1;
        } else {
            // Increment the counter if item is already in the cart
            itemCount[itemId]++;
        }
        updateCartMenu()
    } else {
        console.log('Item not found.');
    }
}

function updateCartMenu() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    const uniqueItemsSet = new Set(cart);

    // Create a new array with unique cart items
    const uniqueCartItems = Array.from(uniqueItemsSet);
    console.log(uniqueCartItems)
    // Iterate through the unique cart items and display their details
    uniqueCartItems.forEach(itemId => {
        const count = itemCount[itemId.id];
        const selectedItem = menuData.find(item => item.id == itemId.id);

        console.log(count)
        console.log(selectedItem)

        if (selectedItem) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${selectedItem.name}</p>
                <p>Price: $${selectedItem.price.toFixed(2)}</p>
                <p>Quantity: ${count}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        }
        const cartData = JSON.stringify(uniqueCartItems.map(itemId => ({ id: itemId.id, count: itemCount[itemId.id] })));
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1); // 1 day expiration
        document.cookie = `cartData=${encodeURIComponent(cartData)}; expires=${expirationDate.toUTCString()}; path=/`;
    });
}
// Function to read cookies and get the value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Read the saved name and email from the cookies
const savedName = getCookie('name');
const savedEmail = getCookie('email');

console.log(savedEmail);
console.log(savedName)

document.getElementById('submit-button').addEventListener('click', function(event){
    fetch('http://192.168.1.2:5000/get-bill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            itemCount: itemCount,
            email:savedEmail,
            name:savedName
        })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("billInfo",JSON.stringify(data));
         window.location.href = 'bill.html';
        // Handle the response from the server if needed
        console.log('Server response:', data);
    })
    .catch(error => {
        // Handle errors if any
        console.error('Error:', error);
    });
});

