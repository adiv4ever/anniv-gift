// Timeline data - replace these with your actual relationship milestones
const timelineData = [
    {
        date: 'First Interaction',
        title: 'When We First Get To Know Each Other',
        description: 'When i sent you a video of a horse kicking a tree and farts at a dog',
        image: 'img/timeline/first-interaction.jpg'
    },
    {
        date: 'The Day You Came Back',
        title: 'When We Finally Talked Again After A While',
        description: "I still don't know where you've gone tbh",
        image: 'img/timeline/comeback.jpg'
    },
    {
        date: "We're Official!",
        title: 'Our Official Anniversary',
        description: 'The first time we used petnames :3',
        image: 'img/timeline/official.jpg'
    },
    {
        date: 'LDR Days',
        title: "Not Easy At First But We Pulled Through",
        description: 'Talking, spending time, loving each other through screens and time zone differences...',
        image: 'img/timeline/ldr.jpeg'
    },
    {
        date: 'our "Wedding"',
        title: 'When We Finally Got Married (in Stardew)',
        description: 'That night when i gave you a ring at the beach',
        image: 'img/timeline/stardew.jpg'
    },
    {
        date: 'First Date',
        title: 'When We Finally Meet',
        description: 'Truly a core memory. One of my favorite memories with you.',
        image: 'img/timeline/first-met.jpeg'
    },
    // Add more timeline items as needed
];

document.addEventListener('DOMContentLoaded', function() {
    const timelineContainer = document.querySelector('.timeline');
    
    if (!timelineContainer) return;
    
    // Generate the timeline items
    timelineData.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${isEven ? 'left' : 'right'}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3 class="timeline-title">${item.title}</h3>
                <p>${item.description}</p>
                <img src="${item.image}" alt="${item.title}" class="timeline-img" loading="lazy">
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
    
    // Add animation on scroll for timeline items
    const observerOptions = {
        threshold: 0.2,
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
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        // Set initial state for animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.5s ease-out';
        
        // Observe the item
        observer.observe(item);
    });
});
