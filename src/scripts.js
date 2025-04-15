document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Potato", price: 99.99 },
    { id: 2, name: "Onion", price: 109.99 },
    { id: 3, name: "Tomato", price: 86.99 },
    { id: 4, name: "Dates", price: 199.99999 },
  ];

  const NoOfProduct = new Map();
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const checkout = document.getElementById("Checkout");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => renderProducts(product));

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);

      if (NoOfProduct.has(productId)) {
        NoOfProduct.set(productId, NoOfProduct.get(productId) + 1);
      } else {
        NoOfProduct.set(productId, 1);
      }

      renderCartItems(products, NoOfProduct);
    }
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));

      const currentQty = NoOfProduct.get(productId) || 0;

      if (currentQty > 1) {
        NoOfProduct.set(productId, currentQty - 1);
      } else {
        NoOfProduct.delete(productId); // Remove item completely if qty is 1 or less
      }

      renderCartItems(products, NoOfProduct);
    }
  });

  checkoutBtn.addEventListener('click', () => {
    const modal = document.getElementById('checkoutModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const totalAmountEl = document.getElementById('totalAmount');
    const totalAmount1 = document.getElementById("Total-amount");

    // Actual Amount
    totalAmountEl.textContent=totalAmount1.textContent;

    // Show modal with fade-in effect
    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'checkoutStyle');

    // Cancel button functionality
    cancelBtn.addEventListener('click', () => {
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    });

    // Confirm button functionality
    confirmBtn.addEventListener('click', () => {
      const totalAmount = parseInt(totalAmountEl.textContent);
      const upiUrl = `upi://pay?pa=7439902116@axl&pn=Md Faijan&mc=0000&tid=1234567890&tr=1234567890&tn=Payment for services&am=${totalAmount}&cu=INR`;
    
      // Function to detect if the user is on a mobile device
      function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
      }
    
      // Redirect based on device type
      if (isMobileDevice()) {
        window.location.href = upiUrl;
      } else {
        alert('Please use a mobile device to complete the payment.');
      }
    });
    
  });
  
  

});

function renderCartItems(products, NoOfProduct) {
  const cartItem = document.getElementById("cart-items");
  const checkoutDiv = document.getElementById("Checkout");
  const totalAmountEl = document.getElementById("Total-amount");

  let totalAmount = 0;

  if (NoOfProduct.size === 0) {
    cartItem.classList.add("hidden");
    cartItem.classList.remove("cartStyle");
    checkoutDiv.classList.add("hidden");
    totalAmountEl.textContent = "0.00";
    return;
  }

  cartItem.classList.remove("hidden");
  checkoutDiv.classList.remove("hidden");
  cartItem.classList.add("cartStyle");

  // Clear cart display before rendering
  cartItem.innerHTML = "";

  NoOfProduct.forEach((qty, id) => {
    const product = products.find((p) => p.id === id);
    const itemTotal = product.price * qty;
    totalAmount += itemTotal;

    cartItem.innerHTML += `
      <div>
        <span>${product.name}</span>
        <span>₹${itemTotal.toFixed(2)}</span>
        <span>${qty}</span>
        <button data-id="${product.id}">Remove</button>
      </div>
    `;
  });

  // Update the DOM with the final total
  totalAmountEl.textContent = `${totalAmount.toFixed(2)}`;
}

function renderProducts(product) {
  const productList = document.getElementById("product-list");
  productList.classList.remove("hidden");
  productList.classList.add("itemStyle");

  productList.innerHTML += `  
    <div>
      <span>${product.name}</span>
      <span>₹${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    </div>
  `;
}
