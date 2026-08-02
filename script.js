// Scroll Animation (Reveal Elements on Scroll)
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger point

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    
    // Trigger once on load in case elements are already in view
    revealOnScroll();
    
    // Navbar Background Change on Scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = "rgba(123, 17, 19, 0.95)"; // primary color
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
            navbar.style.padding = "15px 5%";
        } else {
            navbar.style.backgroundColor = "transparent";
            navbar.style.boxShadow = "none";
            navbar.style.padding = "25px 5%";
        }
    });

    // Render products dynamically
    const renderProducts = () => {
        const gridOC = document.getElementById('grid-oc');
        const gridTMN = document.getElementById('grid-tmn');
        const gridNSO = document.getElementById('grid-nso');
        
        if (!gridOC && !gridTMN && !gridNSO) return; // not on index page
        
        if (typeof productsData === 'undefined') return;

        for (const [id, product] of Object.entries(productsData)) {
            const encodedTitle = encodeURIComponent(product.title);
            const encodedPrice = encodeURIComponent(product.price);
            const html = `
                <div class="portfolio-item">
                    <a href="product.html?id=${id}" class="product-link">
                        <div class="img-wrapper">
                            <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                        </div>
                    </a>
                    <div class="product-details">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="price-tag">Price: ${product.price}</div>
                        <a href="https://wa.me/919020971971?text=Hi%20Glow%20The%20Designer%20Hub!%20I%20would%20like%20to%20buy%20${encodedTitle}%20for%20${encodedPrice}" class="btn btn-primary" target="_blank">Buy Now</a>
                    </div>
                </div>
            `;
            
            if (id.startsWith('oc-') && gridOC) gridOC.innerHTML += html;
            else if (id.startsWith('tmn-') && gridTMN) gridTMN.innerHTML += html;
            else if (id.startsWith('nso-') && gridNSO) gridNSO.innerHTML += html;
        }
    };
    
    renderProducts();
});

// Submit form data to WhatsApp
function submitToWhatsApp(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const city = document.getElementById('city').value;
    
    // Format the message
    const message = `*New Onam Consultation Request* ✨\n\n*Name:* ${name}\n*Delivery Date:* ${date}\n*City:* ${city}\n\nHi Glow The Designer Hub! I would like to discuss my Onam order.`;
    
    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    
    // The WhatsApp link (using the provided number)
    const whatsappUrl = `https://wa.me/919020971971?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Optional: reset the form after submitting
    document.getElementById('booking-form').reset();
    
    return false;
}
