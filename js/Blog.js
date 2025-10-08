(function(){
    // Filtrado de artículos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            postCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Cargar más artículos
    const loadMoreBtn = document.getElementById('loadMore');
    let currentItems = 6;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const hiddenPosts = Array.from(postCards).slice(currentItems, currentItems + 3);
            
            hiddenPosts.forEach(post => {
                post.style.display = 'block';
            });
            
            currentItems += 3;
            
            // Ocultar botón si no hay más posts
            if (currentItems >= postCards.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animación a los elementos
    const animatedElements = document.querySelectorAll('.featured-post, .category-card, .post-card, .author-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
})();