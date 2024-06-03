
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



