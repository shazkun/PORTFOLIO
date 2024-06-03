
$(document).ready(function() {
    var sections = $('.section');
    var windowHeight = $(window).height();

    function checkVisibility() {
        var scrollTop = $(window).scrollTop();
        
        sections.each(function() {
            var position = $(this).offset().top;

            if (position < scrollTop + windowHeight * 0.2 && position + $(this).height() > scrollTop + windowHeight * 0.2) {
                $(this).addClass('visible');
            } else {
                $(this).removeClass('visible');
            }
        });
    }

    // Initial check when the document is ready
    checkVisibility();

    // Check visibility on scroll
    $(window).on('scroll', checkVisibility);
});

// Function to toggle the visibility of the navbar based on the scroll position
function toggleNavbar() {
    var section2 = document.getElementById('about');
    var navbar = document.querySelector('.navbar');

    // Get the position of the second section relative to the top of the viewport
    var section2Position = section2.getBoundingClientRect().top;

    // Toggle the 'hidden' class on the navbar based on the scroll position
    if (section2Position <= 0) {
        navbar.classList.remove('hidden');
    } else {
        navbar.classList.add('hidden');
    }
}

// Call the toggleNavbar function when the page loads
window.addEventListener('load', toggleNavbar);

// Call the toggleNavbar function when the user scrolls
window.addEventListener('scroll', toggleNavbar);


