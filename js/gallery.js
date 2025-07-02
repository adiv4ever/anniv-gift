// Sample data for memory gallery - replace with your actual memories
const memoryGalleryData = [
    {
        title: 'Movie Date',
        description: 'Our first ever offline movie date',
        date: '2024',
        image: 'img/memories/moviedate.jpg'
    },
    {
        title: 'Bakmi Date',
        description: 'When we ate bakmi at your favorite place',
        date: '2024',
        image: 'img/memories/bakmi.jpg'
    },
    {
        title: 'Graduations Day',
        description: 'When we celebrated your graduation',
        date: '2025',
        image: 'img/memories/graduation.jpg'
    },
    {
        title: 'Our First Trip',
        description: 'When we went to rumah atsiri',
        date: '2025',
        image: 'img/memories/atsiri.jpg'
    },
    {
        title: 'Workshop time',
        description: 'When we went to workshop to make a deodorant',
        date: '2025',
        image: 'img/memories/workshop.jpg'
    },
    {
        title: 'Ice cream time',
        description: 'When we go get ice cream (it was so good)',
        date: '2025',
        image: 'img/memories/icecream.jpg'
    },
    // Add more memory items as needed
];

document.addEventListener('DOMContentLoaded', function() {
    const memoryGallery = document.querySelector('.memory-gallery');
    
    if (!memoryGallery) return;
    
    // Generate memory cards
    memoryGalleryData.forEach(memory => {
        const memoryCard = document.createElement('div');
        memoryCard.className = 'memory-card';
        
        memoryCard.innerHTML = `
            <img src="${memory.image}" alt="${memory.title}" class="memory-img" loading="lazy">
            <div class="memory-content">
                <h3 class="memory-title">${memory.title}</h3>
                <p class="memory-description">${memory.description}</p>
                <p class="memory-date">${memory.date}</p>
            </div>
        `;
        
        // Add click event to expand the memory with details
        memoryCard.addEventListener('click', function() {
            openMemoryDetail(memory);
        });
        
        memoryGallery.appendChild(memoryCard);
    });
    
    // Function to open memory detail in a modal
    function openMemoryDetail(memory) {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'memory-modal';
        
        modal.innerHTML = `
            <div class="memory-modal-content">
                <span class="close-modal">&times;</span>
                <img src="${memory.image}" alt="${memory.title}" class="modal-img">
                <h3>${memory.title}</h3>
                <p class="modal-description">${memory.description}</p>
                <p class="modal-date">${memory.date}</p>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .memory-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .memory-modal-content {
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                max-width: 80%;
                max-height: 80%;
                overflow: auto;
                position: relative;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            .close-modal {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                transition: color 0.3s ease;
            }
            
            .close-modal:hover {
                color: var(--primary-color);
            }
            
            .modal-img {
                width: 100%;
                max-height: 60vh;
                object-fit: contain;
                border-radius: 5px;
                margin-bottom: 15px;
            }
            
            .modal-description {
                margin: 15px 0;
                font-size: 1.1rem;
            }
            
            .modal-date {
                color: #666;
                font-style: italic;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Animation timing
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.memory-modal-content').style.transform = 'scale(1)';
        }, 10);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            modal.style.opacity = '0';
            modal.querySelector('.memory-modal-content').style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                modal.remove();
                style.remove();
            }, 300);
        });
        
        // Also close when clicking outside the modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBtn.click();
            }
        });
    }
    
    // Add animation on scroll for memory cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.memory-card').forEach((card, index) => {
        // Set initial state for animation with staggered delay
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
        
        // Observe the card
        observer.observe(card);
    });
});
