
const foodWebsite = {
    
    categories: [
        { id: 1, name: 'Pizza', icon: '🍕' },
        { id: 2, name: 'Burgers', icon: '🍔' },
        { id: 3, name: 'Sushi', icon: '🍣' },
        { id: 4, name: 'Salads', icon: '🥗' },
        { id: 5, name: 'Desserts', icon: '🍰' },
        { id: 6, name: 'Beverages', icon: '🥤' }
    ],

    products: [
        { id: 1, name: 'Margherita Pizza', price: 8.99, category: 1, rating: 4.5, description: 'Fresh mozzarella and basil', image: '../images/Margherita-Pizza.webp' },
        { id: 2, name: 'Pepperoni Pizza', price: 9.99, category: 1, rating: 4.8, description: 'Classic pepperoni pizza', image: '../images/salami_pizza-1.jpg' },
        { id: 3, name: 'Beef Burger', price: 7.99, category: 2, rating: 4.3, description: 'Juicy beef burger with cheese', image: '../images/Beef%20Burger.jpg' },
        { id: 4, name: 'Veggie Burger', price: 6.99, category: 2, rating: 4.1, description: 'Fresh vegetable burger', image: '../images/Veggie%20Burger.jpg' },
        { id: 5, name: 'California Roll', price: 10.99, category: 3, rating: 4.6, description: 'Crab, avocado, cucumber', image: '../images/California%20Roll.jpg' },
        { id: 6, name: 'Dragon Roll', price: 12.99, category: 3, rating: 4.7, description: 'Eel, avocado, cucumber', image: '../images/Dragon%20Roll.jpg' },
        { id: 7, name: 'Caesar Salad', price: 5.99, category: 4, rating: 4.2, description: 'Fresh romaine with parmesan', image: '../images/Caesar%20Salad.jpg' },
        { id: 8, name: 'Greek Salad', price: 6.99, category: 4, rating: 4.4, description: 'Feta cheese and olives', image: '../images/Greek%20Salad.jpg' },
        { id: 9, name: 'Chocolate Cake', price: 4.99, category: 5, rating: 4.9, description: 'Rich chocolate layer cake', image: '../images/Chocolate%20Cake.avif' },
        { id: 10, name: 'Ice Cream', price: 3.99, category: 5, rating: 4.5, description: 'Vanilla ice cream', image: '../images/Ice%20Cream.jpeg' },
        { id: 11, name: 'Cola', price: 2.99, category: 6, rating: 4.0, description: 'Cold cola drink', image: '../images/Cola.jpg' },
        { id: 12, name: 'Lemonade', price: 3.49, category: 6, rating: 4.3, description: 'Fresh lemonade', image: '../images/Lemonade.jpg' },
        { id: 13, name: 'Salami Pizza', price: 10.49, category: 1, rating: 4.6, description: 'Savory salami and cheese pizza', image: '../images/salami_pizza-1.jpg' }
    ],

    cart: [],
    currentUser: null,

    
    initHeader: function() {
        const header = document.querySelector('header');
        if (header) {
            const user = this.getCurrentUser();
            const authHTML = user ? 
                `<div class="user-profile">
                    <span>Welcome, ${user.name}</span>
                    <a href="../pages/my-profile.html" class="btn btn-primary" style="margin: 0 0.5rem;">Profile</a>
                    <button onclick="foodWebsite.logout()" class="btn btn-danger">Logout</button>
                </div>` :
                `<div class="user-auth">
                    <a href="../pages/login.html" class="btn-login">Login</a>
                    <a href="../pages/register.html" class="btn-register">Register</a>
                </div>`;
            
            const authContainer = header.querySelector('.user-auth') || header.querySelector('.user-profile');
            if (authContainer) {
                authContainer.innerHTML = authHTML;
            }
        }
    },

  
    initFooter: function() {
        const footer = document.querySelector('footer');
        if (!footer) {
            const footerHTML = `
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>About Us</h3>
                        <ul>
                            <li><a href="../pages/about.html">About FoodHub</a></li>
                            <li><a href="#">Our Team</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Customer Service</h3>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">FAQs</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <ul>
                            <li><a href="../pages/contact.html">Contact Us</a></li>
                            <li>Email: info@foodhub.com</li>
                            <li>Phone: 1-800-FOOD</li>
                            <li>Address: 123 Food St, USA</li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 FoodHub. All rights reserved.</p>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', `<footer>${footerHTML}</footer>`);
        }
    },

    addToCart: function(productId, quantity = 1) {
        this.loadCart();
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const cartItem = this.cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += quantity;
                cartItem.selected = true;
            } else {
                this.cart.push({ ...product, quantity, selected: true });
            }
            this.saveCart();
            this.showNotification('Product added to cart!', 'success');
            return true;
        }
        return false;
    },

  
    removeFromCart: function(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    },

    
    updateQuantity: function(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    },

    toggleItemSelection: function(productId, selected) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.selected = selected;
            this.saveCart();
        }
    },

    setAllItemSelection: function(selected) {
        this.cart.forEach(item => item.selected = selected);
        this.saveCart();
    },

    
    getCartTotal: function() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getSelectedCartItems: function() {
        return this.cart.filter(item => item.selected !== false);
    },

    getSelectedCartTotal: function() {
        return this.getSelectedCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    
    clearCart: function() {
        this.cart = [];
        this.saveCart();
    },

    
    saveCart: function() {
        localStorage.setItem('foodhub_cart', JSON.stringify(this.cart));
    },

   
    loadCart: function() {
        const saved = localStorage.getItem('foodhub_cart');
        if (saved) {
            this.cart = JSON.parse(saved).map(item => ({ ...item, selected: item.selected !== false }));
        }
    },

    
    registerUser: function(email, password, name) {
        const users = JSON.parse(localStorage.getItem('foodhub_users') || '[]');
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }
        users.push({ email, password, name, createdAt: new Date() });
        localStorage.setItem('foodhub_users', JSON.stringify(users));
        return { success: true, message: 'Registration successful' };
    },

    loginUser: function(email, password) {
        const users = JSON.parse(localStorage.getItem('foodhub_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('foodhub_current_user', JSON.stringify({ email: user.email, name: user.name }));
            return { success: true, message: 'Login successful' };
        }
        return { success: false, message: 'Invalid email or password' };
    },

    getCurrentUser: function() {
        const user = localStorage.getItem('foodhub_current_user');
        return user ? JSON.parse(user) : null;
    },

    logout: function() {
        localStorage.removeItem('foodhub_current_user');
        window.location.href = '../pages/home.html';
    },

    
    createOrder: function(orderData) {
        const orders = JSON.parse(localStorage.getItem('foodhub_orders') || '[]');
        const user = this.getCurrentUser();
        const selectedItems = this.getSelectedCartItems();
        const orderItems = selectedItems.length ? selectedItems : this.cart;
        const subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = parseFloat((subtotal * 0.10).toFixed(2));
        const deliveryFee = orderItems.length > 0 ? 2.99 : 0;
        const total = parseFloat((subtotal + tax + deliveryFee).toFixed(2));

        const order = {
            id: 'ORD-' + Date.now(),
            userId: user?.email,
            items: orderItems,
            subtotal,
            tax,
            deliveryFee,
            total,
            status: 'Processing',
            createdAt: new Date(),
            ...orderData
        };
        orders.push(order);
        localStorage.setItem('foodhub_orders', JSON.stringify(orders));
        this.cart = this.cart.filter(item => !item.selected);
        this.saveCart();
        return order;
    },

    getOrderHistory: function() {
        const orders = JSON.parse(localStorage.getItem('foodhub_orders') || '[]');
        const user = this.getCurrentUser();
        return orders.filter(order => order.userId === user?.email);
    },

    getOrderById: function(orderId) {
        const orders = JSON.parse(localStorage.getItem('foodhub_orders') || '[]');
        return orders.find(order => order.id === orderId);
    },

  
    showNotification: function(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alert.style.position = 'fixed';
        alert.style.top = '100px';
        alert.style.right = '20px';
        alert.style.zIndex = '1000';
        alert.style.minWidth = '300px';
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    },

  
    requireLogin: function() {
        if (!this.getCurrentUser()) {
            this.showNotification('Please login first', 'danger');
            setTimeout(() => {
                window.location.href = '../pages/login.html';
            }, 1000);
            return false;
        }
        return true;
    }
};

foodWebsite.loadCart();


document.addEventListener('DOMContentLoaded', function() {
    foodWebsite.initHeader();
    foodWebsite.initFooter();
});
