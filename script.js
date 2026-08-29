document.addEventListener("DOMContentLoaded", () => {

// ==================================================
// CART
// ==================================================

let cart =
    JSON.parse(localStorage.getItem("amazonCart")) || [];

// ==================================================
// PRODUCT DATA
// ==================================================

const products = [

    {
        id: 1,
        name: "Men's Casual Cotton Shirt",
        price: 599,
        image: "box1_image.jpg",
        category: "Clothing",
        rating: 4.3,
        reviews: 125
    },

    {
        id: 2,
        name: "Premium Face Wash",
        price: 349,
        image: "box2_image.jpg",
        category: "Health & Personal Care",
        rating: 4.5,
        reviews: 210
    },

    {
        id: 3,
        name: "Modern Wooden Chair",
        price: 2499,
        image: "box3_image.jpg",
        category: "Furniture",
        rating: 4.2,
        reviews: 89
    },

    {
        id: 4,
        name: "Wireless Bluetooth Headphones",
        price: 1999,
        image: "box4_image.jpg",
        category: "Electronics",
        rating: 4.4,
        reviews: 532
    },

    {
        id: 5,
        name: "Beauty Makeup Kit",
        price: 899,
        image: "box5_image.jpg",
        category: "Beauty",
        rating: 4.1,
        reviews: 156
    },

    {
        id: 6,
        name: "Premium Dog Food",
        price: 1299,
        image: "box6_image.jpg",
        category: "Pet Care",
        rating: 4.6,
        reviews: 301
    },

    {
        id: 7,
        name: "Kids Building Blocks Set",
        price: 749,
        image: "box7_image.jpg",
        category: "Toys",
        rating: 4.7,
        reviews: 420
    },

    {
        id: 8,
        name: "Women's Fashion Collection",
        price: 1499,
        image: "box8_image.jpg",
        category: "Fashion",
        rating: 4.3,
        reviews: 198
    }

];

// ==================================================
// SAVE CART
// ==================================================

function saveCart() {

    localStorage.setItem(
        "amazonCart",
        JSON.stringify(cart)
    );

}

// ==================================================
// UPDATE CART COUNT
// ==================================================

function updateCartCount() {

    const cartCount =
        document.querySelector("#cart-count");

    if (!cartCount) {
        return;
    }

    const totalItems =
        cart.reduce(
            (total, product) =>
                total + Number(product.quantity || 0),
            0
        );

    cartCount.textContent = totalItems;

}

// ==================================================
// DISPLAY PRODUCTS
// ==================================================

const shopSection =
    document.querySelector("#shop-sec");

function displayProducts(productList) {

    if (!shopSection) {
        return;
    }

    shopSection.innerHTML = "";

    productList.forEach((product) => {

        const box =
            document.createElement("div");

        box.classList.add("box");

        box.dataset.id = product.id;

        box.innerHTML = `

            <div class="box-content">

                <h2>
                    ${product.name}
                </h2>

                <div class="box-img">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>

                <div class="product-rating">

                    <span class="stars">
                        ★★★★★
                    </span>

                    <span>
                        ${product.rating}
                    </span>

                    <span class="reviews">
                        (${product.reviews})
                    </span>

                </div>

                <h3 class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </h3>

                <button
                    class="add-cart-btn"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>

        `;

        shopSection.appendChild(box);

        // Open product details page
        box.addEventListener("click", (event) => {

            if (
                event.target.closest(".add-cart-btn")
            ) {
                return;
            }

            window.location.href =
                `product.html?id=${product.id}`;

        });

    });

}

// ==================================================
// SHOW PRODUCTS ON HOME PAGE
// ==================================================

displayProducts(products);

// ==================================================
// ADD PRODUCT TO CART
// ==================================================

if (shopSection) {

    shopSection.addEventListener("click", (event) => {

        const addButton =
            event.target.closest(".add-cart-btn");

        if (!addButton) {
            return;
        }

        const productId =
            Number(addButton.dataset.id);

        const product =
            products.find(
                (item) =>
                    item.id === productId
            );

        if (!product) {
            return;
        }

        const existingProduct =
            cart.find(
                (item) =>
                    item.id === productId
            );

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                ...product,

                quantity: 1

            });

        }

        saveCart();

        updateCartCount();

        alert(
            `${product.name} added to cart`
        );

    });

}

// ==================================================
// CART BUTTON
// ==================================================

const cartButton =
    document.querySelector("#cart-button");

if (cartButton) {

    cartButton.addEventListener("click", () => {

        window.location.href = "cart.html";

    });

}

// ==================================================
// SEARCH
// ==================================================

const searchInput =
    document.querySelector(".search-input");

const searchIcon =
    document.querySelector(".search-icon");

if (searchIcon && searchInput) {

    searchIcon.addEventListener("click", () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();

        if (query === "") {

            alert(
                "Please enter something to search"
            );

            return;

        }

        const filteredProducts =
            products.filter((product) => {

                return (
                    product.name
                        .toLowerCase()
                        .includes(query)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(query)
                );

            });

        if (filteredProducts.length === 0) {

            alert("No products found");

            return;

        }

        displayProducts(filteredProducts);

    });

}

// ==================================================
// BACK TO TOP
// ==================================================

const backToTop =
    document.querySelector(".foot-panel1");

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// ==================================================
// DISPLAY CART
// ==================================================

function displayCart() {

    const cartItems =
        document.querySelector("#cart-items");

    const cartTotal =
        document.querySelector("#cart-total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your Amazon Cart is empty
                </h2>

                <p>
                    Add some products to your cart.
                </p>

                <button
                    class="continue-shopping"
                    onclick="window.location.href='index.html'"
                >
                    Continue Shopping
                </button>

            </div>

        `;

        if (cartTotal) {
            cartTotal.textContent = "0";
        }

        return;

    }

    let total = 0;

    cart.forEach((product) => {

        const quantity =
            Number(product.quantity || 1);

        total +=
            product.price * quantity;

        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h2>
                    ${product.name}
                </h2>

                <p class="cart-category">
                    ${product.category}
                </p>

                <p class="cart-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <div class="quantity-control">

                    <button
                        class="quantity-btn decrease-btn"
                        data-id="${product.id}"
                    >
                        −
                    </button>

                    <span class="quantity">
                        ${quantity}
                    </span>

                    <button
                        class="quantity-btn increase-btn"
                        data-id="${product.id}"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    data-id="${product.id}"
                >
                    Remove
                </button>

            </div>

        `;

        cartItems.appendChild(cartItem);

    });

    if (cartTotal) {

        cartTotal.textContent =
            total.toLocaleString("en-IN");

    }

}

// ==================================================
// CART QUANTITY CONTROLS
// ==================================================

const cartItems =
    document.querySelector("#cart-items");

if (cartItems) {

    cartItems.addEventListener("click", (event) => {

        const button =
            event.target.closest("button");

        if (!button) {
            return;
        }

        const productId =
            Number(button.dataset.id);

        if (!productId) {
            return;
        }

        // INCREASE

        if (
            button.classList.contains("increase-btn")
        ) {

            const product =
                cart.find(
                    (item) =>
                        item.id === productId
                );

            if (product) {

                product.quantity =
                    Number(product.quantity || 1) + 1;

            }

        }

        // DECREASE

        if (
            button.classList.contains("decrease-btn")
        ) {

            const product =
                cart.find(
                    (item) =>
                        item.id === productId
                );

            if (product) {

                product.quantity =
                    Number(product.quantity || 1) - 1;

                if (product.quantity <= 0) {

                    cart =
                        cart.filter(
                            (item) =>
                                item.id !== productId
                        );

                }

            }

        }

        // REMOVE

        if (
            button.classList.contains("remove-btn")
        ) {

            cart =
                cart.filter(
                    (item) =>
                        item.id !== productId
                );

        }

        saveCart();

        updateCartCount();

        displayCart();

    });

}

// ==================================================
// PRODUCT DETAILS PAGE
// ==================================================

const productDetails =
    document.querySelector("#product-details");

if (productDetails) {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const productId =
        Number(
            urlParams.get("id")
        );

    const product =
        products.find(
            (item) =>
                item.id === productId
        );

    // PRODUCT NOT FOUND

    if (!product) {

        productDetails.innerHTML = `

            <div class="product-not-found">

                <h1>
                    Product Not Found
                </h1>

                <button
                    onclick="window.location.href='index.html'"
                >
                    Back to Home
                </button>

            </div>

        `;

    }

    // DISPLAY PRODUCT

    else {

        productDetails.innerHTML = `

            <div class="product-image-section">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>

            <div class="product-info-section">

                <h1>
                    ${product.name}
                </h1>

                <p class="product-category">
                    Category: ${product.category}
                </p>

                <div class="product-detail-rating">

                    <span class="stars">
                        ★★★★★
                    </span>

                    <span>
                        ${product.rating}
                    </span>

                    <span>
                        (${product.reviews} reviews)
                    </span>

                </div>

                <hr>

                <div class="detail-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <p class="tax-info">
                    Inclusive of all taxes
                </p>

                <p class="stock">
                    In Stock
                </p>

                <p class="delivery">
                    FREE delivery available
                </p>

                <div class="detail-quantity">

                    <label>
                        Quantity:
                    </label>

                    <select id="product-quantity">

                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>

                    </select>

                </div>

                <button
                    class="detail-add-cart"
                    id="detail-add-cart"
                >
                    Add to Cart
                </button>

                <button
                    class="buy-now-btn"
                    id="buy-now-btn"
                >
                    Buy Now
                </button>

                <div class="product-description">

                    <h2>
                        About this product
                    </h2>

                    <p>
                        This is a high-quality
                        ${product.category}
                        product available at an
                        affordable price.
                    </p>

                    <p>
                        Shop with confidence and
                        enjoy a great shopping
                        experience.
                    </p>

                </div>

            </div>

        `;

        // ==================================================
        // PRODUCT PAGE - ADD TO CART
        // ==================================================

        const detailAddCart =
            document.querySelector("#detail-add-cart");

        if (detailAddCart) {

            detailAddCart.addEventListener("click", () => {

                const quantitySelect =
                    document.querySelector("#product-quantity");

                const quantity =
                    Number(quantitySelect.value);

                const existingProduct =
                    cart.find(
                        (item) =>
                            item.id === product.id
                    );

                if (existingProduct) {

                    existingProduct.quantity += quantity;

                } else {

                    cart.push({

                        ...product,

                        quantity: quantity

                    });

                }

                saveCart();

                updateCartCount();

                alert(
                    `${quantity} × ${product.name} added to cart`
                );

            });

        }

        // ==================================================
        // BUY NOW
        // ==================================================

        const buyNowButton =
            document.querySelector("#buy-now-btn");

        if (buyNowButton) {

            buyNowButton.addEventListener("click", () => {

                const quantitySelect =
                    document.querySelector("#product-quantity");

                const quantity =
                    Number(quantitySelect.value);

                const existingProduct =
                    cart.find(
                        (item) =>
                            item.id === product.id
                    );

                if (existingProduct) {

                    existingProduct.quantity += quantity;

                } else {

                    cart.push({

                        ...product,

                        quantity: quantity

                    });

                }

                saveCart();

                window.location.href =
                    "cart.html";

            });

        }

    }

}

// ==================================================
// CHECKOUT PAGE
// ==================================================

function displayCheckout() {

    const checkoutItems =
        document.querySelector("#checkout-items");

    const checkoutTotal =
        document.querySelector("#checkout-total");

    if (!checkoutItems) {
        return;
    }

    checkoutItems.innerHTML = "";

    let total = 0;

    // EMPTY CART

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Please add products before checkout.
                </p>

                <button
                    class="continue-shopping"
                    onclick="window.location.href='index.html'"
                >
                    Continue Shopping
                </button>

            </div>

        `;

        if (checkoutTotal) {
            checkoutTotal.textContent = "0";
        }

        return;

    }

    // DISPLAY CHECKOUT PRODUCTS

    cart.forEach((product) => {

        const quantity =
            Number(product.quantity || 1);

        const itemTotal =
            product.price * quantity;

        total += itemTotal;

        const checkoutItem =
            document.createElement("div");

        checkoutItem.classList.add(
            "checkout-item"
        );

        checkoutItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="checkout-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Category: ${product.category}
                </p>

                <p>
                    Quantity: ${quantity}
                </p>

                <p>
                    Price:
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

            </div>

            <div class="checkout-item-price">

                ₹${itemTotal.toLocaleString("en-IN")}

            </div>

        `;

        checkoutItems.appendChild(
            checkoutItem
        );

    });

    if (checkoutTotal) {

        checkoutTotal.textContent =
            total.toLocaleString("en-IN");

    }

}

// ==================================================
// CHECKOUT BUTTON
// ==================================================

const checkoutButton =
    document.querySelector("#checkout-button");

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }

        window.location.href =
            "checkout.html";

    });

}

// ==================================================
// PLACE ORDER
// ==================================================

const placeOrder =
    document.querySelector("#place-order");

if (placeOrder) {

    placeOrder.addEventListener("click", () => {

        const checkoutForm =
            document.querySelector("#checkout-form");

        // Validate form

        if (
            checkoutForm &&
            !checkoutForm.checkValidity()
        ) {

            checkoutForm.reportValidity();

            return;

        }

        // Check cart

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }

        // Payment method

        const paymentMethod =
            document.querySelector(
                'input[name="payment"]:checked'
            );

        const paymentValue =
            paymentMethod
                ? paymentMethod.value
                : "cod";

        // Calculate total

        const orderTotal =
            cart.reduce(
                (total, product) =>
                    total +
                    product.price *
                    Number(product.quantity || 1),
                0
            );

        // Create order

        const order = {

            id:
                "AMZ" +
                Date.now()
                    .toString()
                    .slice(-8),

            date:
                new Date().toLocaleDateString(
                    "en-IN"
                ),

            payment:
                paymentValue,

            total:
                orderTotal,

            items:
                cart

        };

        // Save order

        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );

        // Clear cart

        cart = [];

        saveCart();

        updateCartCount();

        // Go to success page

        window.location.href =
            "order-success.html";

    });

}

// ==================================================
// ORDER SUCCESS PAGE
// ==================================================

const orderId =
    document.querySelector("#order-id");

const orderDate =
    document.querySelector("#order-date");

const orderPayment =
    document.querySelector("#order-payment");

const orderTotal =
    document.querySelector("#order-total");

if (orderId) {

    const lastOrder =
        JSON.parse(
            localStorage.getItem("lastOrder")
        );

    if (lastOrder) {

        orderId.textContent =
            lastOrder.id;

        orderDate.textContent =
            lastOrder.date;

        const paymentNames = {

            cod: "Cash on Delivery",

            card: "Credit / Debit Card",

            upi: "UPI"

        };

        orderPayment.textContent =
            paymentNames[lastOrder.payment]
            || "Cash on Delivery";

        orderTotal.textContent =
            Number(lastOrder.total)
                .toLocaleString("en-IN");

    }

}

// ==================================================
// CONTINUE SHOPPING
// ==================================================

const continueShopping =
    document.querySelector("#continue-shopping");

if (continueShopping) {

    continueShopping.addEventListener("click", () => {

        window.location.href =
            "index.html";

    });

}

// ==================================================
// VIEW ORDERS
// ==================================================

const viewOrders =
    document.querySelector("#view-orders");

if (viewOrders) {

    viewOrders.addEventListener("click", () => {

        alert(
            "Order history will be available soon."
        );

    });

}

// ==================================================
// INITIALIZE
// ==================================================

updateCartCount();

displayCart();

displayCheckout();

});