$(document).ready(function(){
    var markode = $(".canvext").markode({});

    $(".slider").slick({
        slidesToShow: 5,
            dots: true,
            variableWidth: true
    });

    $(".canvext-input").on("change", function(){
        $(".slider").slideToggle(); 
    });
});
