document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});

function remove(id){
    localStorage.removeItem(id);
    console.log("Removed")
    renderCartItems()
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    // Retrieve cart items from local storage
    const cartItems = Object.values(localStorage);

    // Check if cart is empty
    if (cartItems.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyCartMessage);
    } else {
        // Loop through each cart item and create DOM elements
        cartItems.forEach(item => {
            const parsedItem = JSON.parse(item);
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <img src="${parsedItem.thumbnail}" alt="${item.title}">
                <div class="item-details">
                    <h3>${parsedItem.title}</h3>
                    <p>$${parsedItem.price}</p>
                    <p>$${parsedItem.description}</p>
                    <button class = "redirect-button" id="${parsedItem.id}" onclick="remove(${parsedItem.id})">Remove From Cart</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
}
