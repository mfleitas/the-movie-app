$(document).ready(function() {
    // $(window).on('scroll', function() {
    //     if($(window).scrollTop()) {
    //         $('.navbar').addClass('navbar--black');
    //     }
    //     else {
    //         $('.navbar').removeClass('navbar--black');
    //     }

    //     //$('.navbar').toggleClass('navbar--black', !!$(window).scrollTop());
    // });
    
    $('#pagination').click(handleClickEvent);

    $('#searchForm').on('submit', (e) => {
        e.preventDefault();
        const textSearch = $('#txtSearch').val();
        const url = '/search/multi?query=' + textSearch;
        window.location.href = url;
    });
});

function handleClickEvent(ev) {
    ev.preventDefault();
    
    const page = $(ev.target).attr('data-value');
    // window.location.href = '/movie/popular?page=' + page;
    window.location.href = `${location.origin}${location.pathname}?page=${page}`;
}