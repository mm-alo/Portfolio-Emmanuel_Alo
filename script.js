// ===================================
// DOM Elements
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links a');
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalCounter = document.getElementById('modalCounter');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const viewButtons = document.querySelectorAll('.view-btn');
const contactForm = document.getElementById('contactForm');

// ===================================
// Project Gallery Data
// ===================================
const projectGalleries = {
    '1': [
        { src: 'assets/images/project1(main).jpg', title: 'Hands-On Reality: Haptic Gloves for WebXR' },
        { src: 'assets/images/project1(f1).jpg', title: 'Hands-On Reality: Haptic Gloves for WebXR - Feature 1' },
        { src: 'assets/images/project1(f2).jpg', title: 'Hands-On Reality: Haptic Gloves for WebXR - Feature 2' },
        { src: 'assets/images/project1(f3).jpg', title: 'Hands-On Reality: Haptic Gloves for WebXR - Feature 3' }
    ],
    '2': [
        { src: 'assets/images/packet1.jpg', title: 'Packet Tracer Simulation' }
    ],
    '3': [
        { src: 'assets/images/packet2.jpg', title: 'Packet Tracer Simulation 2' },
    ],
    '4': [  
        { src: 'assets/images/project2(main).jpg', title: 'CB Resorts - Luxury Resort Website' },
        { src: 'assets/images/project2(f1).jpg', title: 'CB Resorts - Luxury Resort Website - Feature 1' }
    ],
    '5': [
        { src: 'assets/images/project3(main).jpg', title: 'Concert Ticket Booking System' },
        { src: 'assets/images/project3(f1).jpg', title: 'Concert Ticket Booking System - Feature 1' },
        { src: 'assets/images/project3(f2).jpg', title: 'Concert Ticket Booking System - Feature 2' },
        { src: 'assets/images/project3(f3).jpg', title: 'Concert Ticket Booking System - Feature 3' },
        { src: 'assets/images/project3(f4).jpg', title: 'Concert Ticket Booking System - Feature 4' },
        { src: 'assets/images/project3(f5).jpg', title: 'Concert Ticket Booking System - Feature 5' },
        { src: 'assets/images/project3(f6).jpg', title: 'Concert Ticket Booking System - Feature 6' }
    ]
};

let currentProject = null;
let currentImageIndex = 0;

// ===================================
// Navigation Scroll Effect
// ===================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Mobile Navigation Toggle
// ===================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkItems.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Project Modal/Lightbox Functionality
// ===================================
viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectCard = button.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project');
        
        openModal(projectId, 0);
    });
});

// Also open modal when clicking on project card
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openModal(projectId, 0);
    });
});

// Certification modal functionality
document.querySelectorAll('.view-cert-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const certImage = button.getAttribute('data-image');
        openCertModal(certImage);
    });
});

document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
        const certBtn = card.querySelector('.view-cert-btn');
        const certImage = certBtn.getAttribute('data-image');
        openCertModal(certImage);
    });
});

function openCertModal(imageSrc) {
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    modalCaption.textContent = 'Professional Certification';
    modalCounter.style.display = 'none';
    modalPrev.style.display = 'none';
    modalNext.style.display = 'none';
    document.body.style.overflow = 'hidden';
}

function openModal(projectId, imageIndex = 0) {
    currentProject = projectId;
    currentImageIndex = imageIndex;
    
    const gallery = projectGalleries[projectId];
    if (!gallery || gallery.length === 0) return;
    
    modal.style.display = 'block';
    modalCounter.style.display = 'block';
    modalPrev.style.display = 'flex';
    modalNext.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    updateModalImage();
}

function updateModalImage() {
    const gallery = projectGalleries[currentProject];
    if (!gallery) return;
    
    const currentImage = gallery[currentImageIndex];
    modalImg.src = currentImage.src;
    modalCaption.textContent = currentImage.title;
    
    // Update counter
    modalCounter.textContent = `${currentImageIndex + 1} / ${gallery.length}`;
    
    // Update navigation buttons
    modalPrev.disabled = currentImageIndex === 0;
    modalNext.disabled = currentImageIndex === gallery.length - 1;
}

function showNextImage() {
    const gallery = projectGalleries[currentProject];
    if (currentImageIndex < gallery.length - 1) {
        currentImageIndex++;
        updateModalImage();
    }
}

function showPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateModalImage();
    }
}

// Navigation button handlers
modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
});

// Close modal
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentImageIndex = 0;
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// ===================================
// Contact Form Handling
// ===================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert(`Thank you for your message, ${formData.name}! I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
    
    // In a real implementation, you might use:
    // - EmailJS for client-side email sending
    // - Firebase Cloud Functions
    // - Your own backend API
    // Example with fetch:
    /*
    fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
        contactForm.reset();
    })
    .catch(error => {
        alert('Error sending message. Please try again.');
    });
    */
});

// ===================================
// Intersection Observer for Animations
// ===================================
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

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===================================
// Skill Bar Animation on Scroll
// ===================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target.querySelector('.skill-bar');
            if (skillBar && !skillBar.classList.contains('animated')) {
                skillBar.classList.add('animated');
                skillBar.style.width = skillBar.style.getPropertyValue('--skill-width') || '0%';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
});

// ===================================
// Initialize on Page Load
// ===================================
window.addEventListener('load', () => {
    updateActiveLink();
});
