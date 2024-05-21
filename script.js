// make it class for api's calls, 
// why not uses OOps here ?
let skip=30
const ApiUrl = `https://dummyjson.com/products`;
let Products = [];
let FilteredProducts = [];
let TempProducts = []
let Cart = [];
let CurrentPage = 1;
let ItemsPerPage = 10;
const data = new Map();

function CheckProductInLocalStorage(key){
    return localStorage.getItem(key)!=null
}

class ApiCallClass {
    constructor(ApiUrl) {
        this.ApiUrl = ApiUrl;
    }
 
    async getData() {
        try {
            const temp = `https://dummyjson.com/products`
            const response = await fetch(temp);
            const data = await response.json();
            Products = data.products;
            FilteredProducts = Products;
            TempProducts.push(Products);
            renderProducts();
            renderPagination();

        } catch (error) {
            console.log("Error Fetching Products", error);
        }
    }
};

// The functionality will be changed as the content is Dynamic
document.addEventListener('DOMContentLoaded', () => {
    Api.getData()
    document.getElementById('search').addEventListener('input', filterProducts); // These all are event Listener
    document.getElementById('sort').addEventListener('change', sortProducts);
});

async function fetchProducts() {  // Fetching The Products from an external API and that's an asynchrnous Operation
    try {
        const response = await fetch(ApiUrl);
        const data = await response.json();
        Products = data.products;
        FilteredProducts.push(Products)
        FilteredProducts = Products;
        renderProducts();
        renderPagination();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function filterProducts() {  // Function that helps you to filter the Product on the basis of The title
    const searchTerm = document.getElementById('search').value.toLowerCase(); // We will extract the value from the input//
    FilteredProducts = Products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    CurrentPage = 1;
    renderProducts();
    renderPagination();
}

function sortProducts() {
    const sortOrder = document.getElementById('sort').value;
    FilteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
    renderProducts();
}

function renderProducts() {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
    const start = (CurrentPage - 1) * ItemsPerPage;
    const end = start + ItemsPerPage;
    const currentProducts = FilteredProducts.slice(start, end);
    console.log(currentProducts,"currentProducts")
    currentProducts.forEach(product => {
        const productElement = document.createElement('div');
        let CheckAvail = CheckProductInLocalStorage(product.id);
        productElement.className = 'product';
        productElement.id = `${product.id}`
        if(CheckAvail != true){
        productElement.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>${product.description}</p>
            <button id="${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
        }

        else{ 
            productElement.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>${product.description}</p>
            <button class = "disabled" id="${product.id}" onclick="addToCart(${product.id})">Added in Cart</button>
        `;
        productContainer.appendChild(productElement);
        }
        // console.log(productElement)
    });
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const itemsPerPageDropdown = document.createElement('select');
    itemsPerPageDropdown.id = "DropDown"
    itemsPerPageDropdown.innerHTML = `
        <option value="10" ${ItemsPerPage === 10 ? 'selected' : ''}>10</option>
        <option value="20" ${ItemsPerPage === 20 ? 'selected' : ''}>20</option>
        <option value="30" ${ItemsPerPage === 30 ? 'selected' : ''}>30</option>
    `;
    itemsPerPageDropdown.addEventListener('change', (event) => {
        ItemsPerPage = parseInt(event.target.value, 10);
        CurrentPage = 1; // Reset to the first page when items per page change
        renderProducts();
        renderPagination();
    });
    paginationContainer.appendChild(itemsPerPageDropdown);

    const pageCount = Math.ceil(FilteredProducts.length / ItemsPerPage);

    const prev = document.createElement('button');
    prev.innerHTML = "Prev";
    prev.className = "prev";
    prev.disabled = CurrentPage === 1;
    prev.addEventListener('click', () => {
        if (CurrentPage > 1) {
            CurrentPage--;
            renderProducts();
            renderPagination();
        }
    });
    paginationContainer.appendChild(prev);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === CurrentPage) {
            button.style.fontWeight = 'bold';
            button.style.backgroundColor = 'grey';
        }
        button.addEventListener('click', () => {
            CurrentPage = i;
            renderProducts();
            renderPagination();
        });
        paginationContainer.appendChild(button);
    }

    const next = document.createElement('button');
    next.className = "next";
    next.innerHTML = "Next";
    next.disabled = CurrentPage === pageCount;
    next.addEventListener('click', () => {
        if (CurrentPage < pageCount) {
            CurrentPage++;
            renderProducts();
            renderPagination();
        }
    });
    paginationContainer.appendChild(next);
}

function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    if (product) {
        Cart.push(product);
        localStorage.setItem(product.id, JSON.stringify(product));

        // Disable the button after adding to cart
        const Element = document.getElementById(productId);
        const button = Element.querySelector('button');
        button.addEventListener('click',()=>{
            button.setAttribute('disabled', 'true');
            console.log("cliked")
            button.innerText="Item Added";
            button.classList.add('disabled')
        })
    }
}

document.getElementById('btn').onclick = function(){
    location.href = "cart.html"
}


const Api = new ApiCallClass(ApiUrl);

