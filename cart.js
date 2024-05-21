document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});

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
            console.log(parsedItem)
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">
                <div class="item-details">
                    <h3>${parsedItem.title}</h3>
                    <p>$${parsedItem.price}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
}
