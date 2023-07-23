document.addEventListener('DOMContentLoaded', function() {
    // Fetch the receipt data from localStorage

    const cartCookie = document.cookie.split('; ').find(row => row.startsWith('cartData='));
    if (cartCookie) {
        const cartData = decodeURIComponent(cartCookie.split('=')[1]);
        const cartItems = JSON.parse(cartData);
        console.log(cartItems)

        //Display the cart items on the receipt page
        const receiptItemsContainer = document.getElementById('receipt');
        var menuData = JSON.parse(localStorage.getItem('menuData'));
        
        cartItems.forEach(item => {
            const receiptItem = document.createElement('div');
            var selectedItem = menuData.find(menuItem => menuItem.id == item.id);
            console.log(selectedItem)
            receiptItem.classList.add('receipt-item');
            receiptItem.innerHTML = `
                <p>Item name: ${selectedItem.name}</p>
                <p>Item Price: ${selectedItem.price}</p>
                <p>Quantity: ${item.count}</p>
            `;
            receiptItemsContainer.appendChild(receiptItem);
        });
    }
    const receiptData = JSON.parse(localStorage.getItem('billInfo'));
    console.log(receiptData)
    if (receiptData) {
        const receiptContainer = document.getElementById('receipt');
            const receiptItem = document.createElement('div');
            receiptItem.classList.add('receiptData');
            const itemName = document.createElement('p');
            itemName.textContent = `total Price: ${receiptData.total_price}`;
            console.log(itemName)
            receiptItem.appendChild(itemName);

            // const itemQuantity = document.createElement('p');
            // itemQuantity.textContent = `Quantity: ${item.quantity}`;
            // receiptItem.appendChild(itemQuantity);

            // const itemPrice = document.createElement('p');
            // itemPrice.textContent = `Price: $${item.price.toFixed(2)}`;
            // receiptItem.appendChild(itemPrice);

            receiptContainer.appendChild(receiptItem);

        // Calculate and add the total amount
        const totalAmount = receiptData.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const receiptTotal = document.createElement('div');
        receiptTotal.classList.add('receipt-total');
        receiptTotal.innerHTML = `<p>Total: $${totalAmount.toFixed(2)}</p>`;
        receiptContainer.appendChild(receiptTotal);
    }
});

function downloadReceipt() {
    const receiptElement = document.getElementById('receipt');
    const opt = {
        margin: 10,
        filename: 'receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate the PDF from the receipt element using html2pdf.js
    html2pdf().from(receiptElement).set(opt).save();
}