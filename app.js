var shoppingCart = (function () {

    cart = [];

    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }

    // Save cart
    function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
      cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    if (localStorage.getItem("shoppingCart") != null) {
      loadCart();
    }


    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
      var totalCount = 0;
      for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    return obj;
  })();


  // Add item
  $('.default-btn').click(function (event) {
    // alert('working');
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });

  // Clear items
  $('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
  });


  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>"
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "</div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = "
        + "<td>" + cartArray[i].total + "</td>"
        + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }

  // Delete item button

  $('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })

  // Item count input
  $('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  displayCart();

//////// ui script start /////////
// Tabs Single Page
$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
$('.tab ul.tabs li a').on('click', function (g) {
    var tab = $(this).closest('.tab'), 
    index = $(this).closest('li').index();
    tab.find('ul.tabs > li').removeClass('current');
    $(this).closest('li').addClass('current');
    tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
    tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
    g.preventDefault();
});

// search function
$('#search_field').on('keyup', function() {
  var value = $(this).val();
  var patt = new RegExp(value, "i");

  $('.tab_content').find('.col-lg-3').each(function() {
    var $table = $(this);
    
    if (!($table.find('.featured-item').text().search(patt) >= 0)) {
      $table.not('.featured-item').hide();
    }
    if (($table.find('.col-lg-3').text().search(patt) >= 0)) {
      $(this).show();
      document.getElementById('not_found').style.display = 'none';
    } else {
      document.getElementById("not_found").innerHTML = " Product not found..";
      document.getElementById('not_found').style.display = 'block';
    }
    
  });
  
});



const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}









function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}










// Event listeners
next.addEventListener('click', () => {
    nextSlide();
    startAutoSlide();
});

prev.addEventListener('click', () => {
    prevSlide();
    startAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        startAutoSlide();
    });
});



// Start auto-slide
startAutoSlide();













// Function to show the Sign-Up form and hide the Login form
function showSignupForm() {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
}

// Function to show the Login form and hide the Sign-Up form
function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
}

// Sign-Up function
function signup() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (!username || !password) {
        alert("Please fill in both fields");
        return;
    }

    // Check if the username already exists
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }

    // Add the new user to the local storage
    users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign up successful! Please log in.");
    showLoginForm();
}

// Login function
function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Please fill in both fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Store logged-in user details in local storage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redirect to the homepage
        window.location.href = "index.html"; // Replace "index.html" with your homepage path
    } else {
        alert("Invalid username or password!");
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");

    // Redirect to the login page
    window.location.href = "login.html"; // Replace "login.html" with your login page path
}

// Check if the user is already logged in
window.onload = function() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // Avoid reload loop by checking if the current page is already the target page
    let currentPage = window.location.pathname.split("/").pop(); // Get the current page name
    if (loggedInUser && currentPage !== "index.html") {
        // Redirect to homepage if logged in
        window.location.href = "index.html"; // Replace "index.html" with your homepage path
    } else if (!loggedInUser && currentPage !== "login.html") {
        // Redirect to login page if not logged in
        window.location.href = "login.html"; // Replace "login.html" with your login page path
    }
};


function showuser(){
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    clutter='';
    loggedInUser.forEach((product)=>{
        clutter=`<a><i class="fa-regular fa-user"></i> </a>
             <h3> ${product.username} </h3>`
    })
    document.querySelector(".user").innerHTML=clutter;

}