document.addEventListener("DOMContentLoaded", () => {

    // 🔍 Search Functionality
    const searchInput = document.querySelector(".search-input");
    const searchIcon = document.querySelector(".search-icon");

    if (searchIcon && searchInput) {
        searchIcon.addEventListener("click", () => {
            let query = searchInput.value.trim();

            if (query === "") {
                alert("Please enter something to search");
            } else {
                alert("Searching for: " + query);
            }
        });
    }

    // 🛒 Cart Click
    const cart = document.querySelector(".nav-cart");

    if (cart) {
        cart.addEventListener("click", () => {
            alert("Cart is empty 🛒");
        });
    }

    // 👤 Sign In Click
    const signIn = document.querySelector(".nav-signin");

    if (signIn) {
        signIn.addEventListener("click", () => {
            alert("Redirecting to Login Page...");
        });
    }

    // 🔝 Back to Top Button
    const backToTop = document.querySelector(".foot-panel1");

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 🛍️ Product Boxes Click
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            alert("Opening category " + (index + 1));
        });
    });

    // 📦 Product Data
    const products = [
        { name: "Shirt", price: 500 },
        { name: "Laptop", price: 50000 },
    ];

    console.log(products);

});