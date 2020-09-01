let cart = document.querySelectorAll(".add-cart");
let products = [{
        name: "purple hoodie",
        tag: "001",
        price: 10,
        inCart: 0,
    },
    {
        name: "white supreme hoodie",
        tag: "002",
        price: 15,
        inCart: 0,
    },
    {
        name: "black hoodie",
        tag: "003",
        price: 5,
        inCart: 0,
    },
    {
        name: "panda hoodie",
        tag: "004",
        price: 30,
        inCart: 0,
    },
    {
        name: "pink hoodie",
        tag: "005",
        price: 25,
        inCart: 0,
    },
    {
        name: "dark hoodie",
        tag: "006",
        price: 40,
        inCart: 0,
    },
];

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener("click", () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
        document.getElementById("qty").textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");

    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.getElementById("qty").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.getElementById("qty").textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product,
            };
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product,
        };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-container");
    let cartCost = localStorage.getItem("totalCost");



    if (cartItems && productContainer) {
        productContainer.innerHTML = " ";
        Object.values(cartItems).map((item) => {
            productContainer.innerHTML += `
            <div class="product row justify-content-center">
            <div class="d-flex col-10">
            <p>X</p>
            <img src="./img/${item.tag}.jpg">

            <div class="price ml-5">$${item.price},00</div>
            <div class="quantity ml-5 d-flex">
            <p><</p>
            <span>${item.inCart}</span>
            <p>></p>
            </div>
            <div class="total ml-5">
            $${item.inCart * item.price},00
            </div>
            </div>

            `;
        });


        productContainer.innerHTML += `
        
        <div class="basketTotalContainer d-flex">
        <h4 class="basketTotalTitle m-4">
        Basket Total
        </h4>
        <h4 class="basketTotal m-4">
        $${cartCost},00
        </h4>
        </div>`
    };

}

onLoadCartNumbers();
displayCart();
displayCart();