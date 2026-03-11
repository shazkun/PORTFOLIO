// Smooth snap on navbar click
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            document.querySelector('.slides-container').scrollTo({
                left: target.offsetLeft,
                behavior: 'smooth'
            });
        }
    });
});

// Active link highlighting on scroll/snap
const sections = document.querySelectorAll('.slide');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: document.querySelector('.slides-container'),
    threshold: 0.6   // 60% of slide visible → active
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Optional: handle mobile collapse after click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const collapse = document.querySelector('.navbar-collapse');
        if (collapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(collapse).hide();
        }
    });
});

const header = document.querySelector('.site-header');
const slidesContainer = document.querySelector('.slides-container');
const homeSlide = document.getElementById('home');

function updateNavbar() {
    const scrollLeft = slidesContainer.scrollLeft;
    const homeWidth = homeSlide.offsetWidth;

    if (scrollLeft < homeWidth * 0.5) {
        header.classList.add('navbar-hidden');
    } else {
        header.classList.remove('navbar-hidden');
    }
}

slidesContainer.addEventListener('scroll', updateNavbar);

// Run on load
updateNavbar();

/* ─── Generic Carousel Factory ───────────────────────────────────────────────── */
function createCarousel(trackId, dotsId, prevBtnId, nextBtnId) {
    const track = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!track || !prevBtn || !nextBtn) return;

    const slides = Array.from(track.children);
    const total = slides.length;
    let current = 0;

    // Build dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        // Pause video on current slide if any
        const currentVideo = slides[current].querySelector('video');
        if (currentVideo) currentVideo.pause();

        current = ((index % total) + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;

        dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    // Use mousedown instead of click to avoid scroll interception
    prevBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goTo(current - 1);
    });

    nextBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goTo(current + 1);
    });

    // Touch swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        e.stopPropagation();
    }, { passive: true });

    track.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
        e.stopPropagation();
    }, { passive: true });

    // Expose goTo for arrow key use
    return { goTo: (dir) => goTo(current + dir) };
}

// Init carousels and store references for arrow keys
const videoCarousel = createCarousel('videoTrack', 'videoDots', 'editPrev', 'editNext');
const projectCarousel = createCarousel('projectTrack', 'projectDots', 'projPrev', 'projNext');
// Arrow key navigation between slides
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        slidesContainer.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
        slidesContainer.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    }
});


// ─── Contact Form ──────────────────────────────────────────────────────────────
const formSubmit = document.getElementById('formSubmit');
const submitText = document.getElementById('submitText');
const submitIcon = document.getElementById('submitIcon');
const formFeedback = document.getElementById('formFeedback');

formSubmit.addEventListener('click', () => {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        formFeedback.textContent = '⚠️ Please fill in all fields.';
        formFeedback.className = 'form-feedback error';
        return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
        formFeedback.textContent = '⚠️ Please enter a valid email.';
        formFeedback.className = 'form-feedback error';
        return;
    }

    // Loading state
    formSubmit.classList.add('loading');
    submitText.textContent = 'Sending...';
    submitIcon.textContent = '⏳';
    formFeedback.textContent = '';
    formFeedback.className = 'form-feedback';

    // Simulate send (replace with your backend/EmailJS call)
    setTimeout(() => {
        formSubmit.classList.remove('loading');
        submitText.textContent = 'Send Message';
        submitIcon.textContent = '→';

        formFeedback.textContent = '✅ Message sent! I\'ll get back to you soon.';
        formFeedback.className = 'form-feedback success';

        // Clear fields
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
    }, 1500);
});