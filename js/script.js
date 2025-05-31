document.addEventListener('DOMContentLoaded', () => {
    
    // --- INICIO LÓGICA DEL CARRITO ---
    function initCart() {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        updateCartIcon();
    }

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
    }

    function addToCart(productId, productName, productPrice, productImage) {
        let cart = getCart();
        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                quantity: 1
            });
        }
        saveCart(cart);

        Swal.fire({
            title: "¡Producto Agregado!",
            text: `${productName} ha sido añadido a tu carrito.`,
            icon: "success",
            confirmButtonText: "Entendido",
            timer: 2500, // Cierra automáticamente después de 2.5 segundos
            timerProgressBar: true,
            customClass: { // Para asegurar que use la fuente de la página si es necesario
                popup: 'swal-font-elmessiri', // Necesitarás definir esta clase en CSS
            }
        });
    }

    function updateCartIcon() {
        const cart = getCart();
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountEl.textContent = `(${totalItems})`;
        }
    }

    // Event listener para botones "Añadir al Carrito"
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            const productName = event.target.dataset.name;
            const productPrice = event.target.dataset.price;
            const productImage = event.target.dataset.image;

            if (productId && productName && productPrice && productImage) {
                addToCart(productId, productName, productPrice, productImage);
            } else {
                console.error("Faltan datos del producto para añadir al carrito.", event.target.dataset);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo añadir el producto. Faltan datos.",
                    icon: "error",
                    customClass: { popup: 'swal-font-elmessiri' }
                });
            }
        });
    });

    initCart(); // Inicializar el carrito al cargar la página
    // --- FIN LÓGICA DEL CARRITO ---
    
    // Simulación de envío de formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previene el envío real del formulario
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = '¡Gracias por tu mensaje! (Simulación: no se envió realmente). Nos pondremos en contacto pronto.';
            formMessage.style.color = 'green';
            contactForm.reset(); // Limpia el formulario
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }

    // --- Card #9 Interaction ---
    const cards9 = document.querySelectorAll('.card--9');
    cards9.forEach(card => {
        // Asegurarse que el elemento card y su style existen antes de añadir listeners
        if (card && card.style) {
            // No es estrictamente necesario verificar el ::before aquí si confías en tu CSS.
            // El JavaScript simplemente establecerá las variables CSS.
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                // Coordenadas del mouse relativas al centro de la card
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const maxRotation = 7; // Puedes ajustar este valor para más o menos rotación

                // Normalizar las coordenadas a un rango (ej. -1 a 1) y multiplicar por maxRotation
                // Esto dará un valor en grados para la rotación
                const mouseXAsRotation = (x / (rect.width / 2)) * maxRotation;
                const mouseYAsRotation = (y / (rect.height / 2)) * maxRotation;
                
                // Establecer las variables CSS. La rotación en Y se invierte en CSS para un efecto más intuitivo
                // (mouse arriba -> card inclina "hacia atrás", mouse abajo -> card inclina "hacia adelante")
                card.style.setProperty('--mouseX9', mouseXAsRotation);
                card.style.setProperty('--mouseY9', mouseYAsRotation * -1); // Invertimos aquí o en el CSS, pero solo una vez.
                                                                          // Si en CSS es rotateX(calc(var(--mouseY9) * -1deg)),
                                                                          // entonces aquí no necesitas el * -1.
                                                                          // Vamos a mantener la inversión en el CSS para coincidir con tu original.
                                                                          // Así que aquí sería:
                                                                          // card.style.setProperty('--mouseY9', mouseYAsRotation);
                                                                          // Y en el CSS: rotateX(calc(var(--mouseY9) * -1deg))
                                                                          // O como lo dejé en el CSS: rotateX(calc(var(--mouseY9) * 1deg))
                                                                          // y aquí: card.style.setProperty('--mouseY9', mouseYAsRotation * -1);
                                                                          // Vamos a usar la segunda opción, que es más clara en el JS.

            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouseX9', 0);
                card.style.setProperty('--mouseY9', 0);
            });
        }
    });
    // --- Fin Card #9 Interaction ---


    // Pequeño script para menú responsive (ejemplo básico)
    // Necesitarías añadir un botón "hamburger" en el HTML del header y estilos CSS para mostrar/ocultar.
    // const navToggle = document.querySelector('.nav-toggle'); // Asume que tienes <button class="nav-toggle">Menu</button>
    // const navMenu = document.querySelector('header nav ul');
    // if (navToggle && navMenu) {
    //     navToggle.addEventListener('click', () => {
    //         navMenu.classList.toggle('active');
    //     });
    // }
});