// // // JavaScript code goes here
// let originalDataa = [];
// // // let currentPage = 1;
// // // const itemsPerPage = 5;

// // // function renderData(data) {
// // //     const container = document.getElementById('data-container');
// // //     container.innerHTML = ''; // Clear any existing content

// // //     const start = (currentPage - 1) * itemsPerPage;
// // //     const end = start + itemsPerPage;
// // //     const paginatedData = data.slice(start, end);

// // //     paginatedData.forEach(item => {
// // //         const itemElement = document.createElement('div');
// // //         itemElement.textContent = JSON.stringify(item, null, 2);
// // //         container.appendChild(itemElement);
// // //     });
// // // }

// // // async function fetchAndSortData(order,limit) {
// // //     const url = `https://dummyjson.com/products`;
// // //     const key = 'name';  // Change this to the key you want to sort by
// // //     try {
// // //         const response = await fetch(url);
// // //         const data = await response.json();
// // //         originalData = data;  // Save original data

// // //         // const sortedData = data.sort((a, b) => {
// // //         //     if (order === 'asc') {
// // //         //         return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
// // //         //     } else {
// // //         //         return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
// // //         //     }
// // //         // });

// // //         renderData(data);
// // //         renderPagination(data);
// // //     } catch (error) {
// // //         console.error('Error fetching or sorting data:', error);
// // //     }
// // // }

// // // function renderData(data) {
// // //     const container = document.getElementById('data-container');
// // //     container.innerHTML = ''; // Clear any existing content


// // //     data.forEach(item => {
// // //         const itemElement = document.createElement('div');
// // //         itemElement.textContent = JSON.stringify(item, null, 2);
// // //         container.appendChild(itemElement);
// // //     });
// // // }

// // // function renderPagination(data) {
// // //     const pagination = document.getElementById('pagination');
// // //     const pageNumbers = document.getElementById('page-numbers');
// // //     pageNumbers.innerHTML
// // // }
// // const URI =  "https://dummyjson.com/products"


// // async function fetchdata() {
// //     const result = await fetch(URI);
// //     const data = await result.json();
// //     console.log(data);
// //     return data;
// // }

// // function renderpost(post){
// //     const section = document.querySelector('.posts');
// //     const postDiv = document.createElement('div')
// //     const postTitle = document.createElement('h2');
// //     const desc = document.createElement('title');
// //     const price = document.createElement('h4');

// //     postTitle.innerHTML = post.title;
// //     desc.innerHTML = post.description;
// //     price.innerHTML = post.price;

// //     postDiv.appendChild(postTitle)
// //     section.appendChild(section);
// // }


// // async function renderposts(){
// //     const posts = await fetchdata();
// //     console.log(posts)
// //     posts.forEach((post) =>renderpost(post))
// // }

// function sort_by_price_asc() {
//     return function (elem1, elem2) {
//       if (elem1.price < elem2.price) {
//         return -1;
//       } else if (elem1.price > elem2.price) {
//         return 1;
//       } else {
//         return 0;
//       }
//     };
//   }

//   function sort_by_price_dsc() {
//     return function (elem1, elem2) {
//       if (elem1.price > elem2.price) {
//         return -1;
//       } else if (elem1.price < elem2.price) {
//         return 1;
//       } else {
//         return 0;
//       }
//     };
//   }


// const postsUrl = `https://dummyjson.com/products/`;

// async function getPosts() {
//     let originalData = []
//     const res = await fetch(postsUrl);
//     const posts = await res.json();
//     originalData = posts
//     originalDataa = posts.products;
//     console.log(originalDataa)
//     return originalData;
// }

// function renderPost(post) {
//     const section = document.querySelector('.posts');
//     const postDiv = document.createElement('div');
//     const postTitle = document.createElement('h1');
//     const PostPrice = document.createElement('h3');
//     const PostBrand = document.createElement('h1');
//     const postDesc = document.createElement('div');
//     postDesc.innerText = post.description;
//     postDesc.style.color = "black"
//     postTitle.innerText = post.title;
//     PostPrice.innerText = post.price;
//     // console.log(postTitle);
//     postDiv.appendChild(postTitle);
//     postDiv.appendChild(postDesc);
//     postDiv.appendChild(PostPrice,"price")
//     section.appendChild(postDiv);
//     PostBrand.innerText = post.brand
//     section.appendChild(PostBrand)

//     const button = document.createElement('button');
//     button.innerHTML = "Favourite";

//     section.appendChild(button)
// }


// async function renderPosts(type) {
//     const posts = await getPosts();
//     const temp = posts.products;

//     if(type === "asc"){
//         temp.sort(sort_by_price_asc());
//         for(let x=0;x<temp.length;x++){
//             renderPost(temp[x]);
//         }
//         // console.log(temp);
//     }
//     else{
//        temp.sort(sort_by_price_dsc());
//        for(let x=0;x<temp.length;x++){
//          renderPost(temp[x])
//        }
//       //  console.log(temp)
//     }
// }

//  function sortData(type){
//     renderPosts(type)   
// }



// function fetchdata(){
//   let x = document.getElementById("search-box")
//   console.log(x);
//   const answer = originalDataa;

//   for(let i=0;i<answer.length;i++){
//       if(answer[i].title === x){
//         renderPost(answer[i]);
//       }
//   }
// }

// renderPosts()


const apiUrl = 'https://dummyjson.com/products';
let products = [];
let filteredProducts = []; 
let cart = [];
let currentPage = 1;
const itemsPerPage = 6; // The functionality will be changed as the content is Dynamic

document.addEventListener('DOMContentLoaded', () => { 
    fetchProducts();
    document.getElementById('search').addEventListener('input', filterProducts); // These all are event Listener
    document.getElementById('sort').addEventListener('change', sortProducts);
   
});

async function fetchProducts() {  // Fetching The Products from an external API and that's an asynchrnous Operation
    try {
        const response = await fetch(apiUrl); 
        const data = await response.json();
        products = data.products;
        filteredProducts = products;
        renderProducts(); 
        renderPagination();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function filterProducts() {  // Function that helps you to filter the Product on the basis of The title
    const searchTerm = document.getElementById('search').value.toLowerCase(); // We will extract the value from the input//
    filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) 
    );
    currentPage = 1;
    renderProducts();
    renderPagination();
}

function sortProducts() {
    const sortOrder = document.getElementById('sort').value;
    filteredProducts.sort((a, b) => {
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
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentProducts = filteredProducts.slice(start, end);

    currentProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
    
    const prev = document.createElement('button');
    prev.innerHTML = "Prev";
    prev.className = "prev";
    prev.disabled = currentPage === 1;
    prev.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            renderPagination();
        }
    });
    paginationContainer.appendChild(prev);
    
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) {
            button.style.fontWeight = 'bold';
            button.style.backgroundColor = 'grey'
        }
        button.addEventListener('click', () => {
            currentPage = i;
            renderProducts();
            renderPagination();
        });
        paginationContainer.appendChild(button);
    }

    const next = document.createElement("button");
    next.className = "next";
    next.innerHTML = "Next";
    next.disabled = currentPage === pageCount;
    next.addEventListener('click', () => {
        if (currentPage < pageCount) {
            currentPage++;
            renderProducts();
            renderPagination();
        }
    });
    paginationContainer.appendChild(next);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem(product.id, product)
        // renderCart();
    }
}



// function renderCart() {
//     const cartItemsContainer = document.getElementById('cart-items');
//     cartItemsContainer.innerHTML = '';
//     cart.forEach(item => {
//         const cartItem = document.createElement('li');
//         cartItem.textContent = `${item.title} - $${item.price}`;
//         cartItemsContainer.appendChild(cartItem);
//     });
// }
