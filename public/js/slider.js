var slideCount = 0;

$(document).ready(function(){
    showSlide();
});

function showSlide() {
    var $slides = $('.slide');

    $slides.each(function(index, slide) {
        $(slide).hide();
    });

    if( slideCount === $slides.length) {
        slideCount=0;
    }

    $($slides[slideCount]).show();
    slideCount++;

    setTimeout(showSlide, 10000);
}