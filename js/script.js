
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
    var section2 = document.getElementById('shownav');
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


// window.addEventListener('scroll', function() {
//     var section2 = document.getElementById('section');
//     var navbarContainer = document.getElementById('hero-1785');

//     // Get the position of the second section relative to the top of the viewport
//     var section2Position = section2.getBoundingClientRect().top;

//     // Check if the second section is in the viewport
//     if (section2Position <= window.innerHeight) {
//         // Add the navbar HTML to the navbar container
//         navbarContainer.innerHTML = `
//             <nav class="navbar navbar-expand-lg navbar-main text-white">
//                 <!-- Your navbar HTML code -->
//             </nav>
//         `;
        
//         // Remove the scroll event listener since the navbar has been added
//         window.removeEventListener('scroll', arguments.callee);
//     }
// });

