// Navbar Effect on Scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animation d'apparition au scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Ciblez les éléments à animer
document.querySelectorAll('.dish-card, .text-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Ajout de la classe visible via CSS (à ajouter dans style.css)
// .visible { opacity: 1 !important; transform: translateY(0) !important; }
document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIQUE PAGE MENU ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    if(tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Retirer la classe active de tous les boutons et contenus
                tabBtns.forEach(b => b.classList.remove('active'));
                menuContents.forEach(c => c.classList.remove('active'));

                // 2. Ajouter active au bouton cliqué
                btn.classList.add('active');

                // 3. Montrer le contenu correspondant (data-target)
                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    // --- LOGIQUE PAGE RÉSERVATION ---
    const bookingForm = document.getElementById('bookingForm');
    const modal = document.getElementById('confirmationModal');
    const closeModal = document.querySelector('.close-modal');

    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de page réel

            // Ici, normalement vous enverriez les données au serveur (PHP/Node)
            // Simulation de succès :
            const name = document.getElementById('name').value;
            console.log(`Réservation pour ${name} envoyée.`);

            // Afficher la modal
            modal.style.display = 'flex';
            bookingForm.reset();
        });
    }

    // Fermeture de la modal
    if(closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Fermer si on clique en dehors
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});
// --- Supprimez ou commentez ces lignes si vous avez des soucis d'affichage ---
document.querySelectorAll('.dish-card, .text-block').forEach(el => {
    el.style.opacity = '0';          // <--- C'est ça qui cache vos éléments !
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const subtotalEl = document.getElementById('subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');

    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const id = item.dataset.id;
            const name = item.dataset.name;
            const price = parseFloat(item.dataset.price);

            addToCart(id, name, price);
        });
    });

    function addToCart(id, name, price) {
        // Ajouter au tableau cart
        cart.push({ id, name, price });
        updateCartUI();
    }

    function updateCartUI() {
        // Vider le conteneur
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Votre panier est vide</p>';
            checkoutBtn.disabled = true;
        } else {
            checkoutBtn.disabled = false;
            let total = 0;

            cart.forEach((item, index) => {
                total += item.price;
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <span>${item.name}</span>
                    <span>${item.price}€ <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer; margin-left:10px;">✕</button></span>
                `;
                cartItemsContainer.appendChild(div);
            });

            subtotalEl.innerText = `${total}€`;
            totalPriceEl.innerText = `${total}€`;
        }
    }

    // Fonction globale pour supprimer un article
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };
});