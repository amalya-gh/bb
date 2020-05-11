jQuery(function ($) {
    // preloading
    setTimeout(function(){
        $("body").addClass("page-fadein");
    }, 1500);

    // sliders
    if (typeof $.fn.slick === 'function') {
        $(".full-width-slider").slick({
            slidesToShow: 1,
            fade: true,
            rtl: true,
            prevArrow: '<div class="slick-prev d-flex justify-content-center align-items-center"><span class="icon-chevron-small-left"></span></div>',
            nextArrow: '<div class="slick-next d-flex justify-content-center align-items-center"><span class="icon-chevron-small-right"></span></div>',
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        dots: true,
                        arrows: false
                    }
                }
            ]
        });
    }

    // animation
    let scrolled = $(window).scrollTop();
    let windowHeight = $(window).height();

    function animEach(isLoading){
        $('.animate-children').each(function () {
            $(this).children().each(function (i) {
                if(isLoading){
                    $(this).css("transition-delay", 0.2 * (i - 1) + "s");
                }
                let eachImgOffsetTop = $(this).offset().top;
                let eachHeight = $(this).height();
                if (eachImgOffsetTop - scrolled < windowHeight - 30 && eachImgOffsetTop - scrolled + eachHeight > 20) {
                    $(this).addClass("complete");
                }
            });
        });
    }
    animEach(true);

    $(window).scroll(function () {
        scrolled = $(this).scrollTop();
        animEach(false);
    });

    // parallax
    if (typeof $.fn.parallax === 'function') {
        $("[data-parallax=scroll]").each(function () {
            var parSrc = $(this).data("image-src");
            $(this).parallax({
                imageSrc: parSrc
            });
        });
    }

    $(window).scroll(function () {
        scrolled = $(this).scrollTop();
        /*
        * custom parallax
        * set .parallax-bg-img class - REQUIRED
        * set bg-image inline - REQUIRED
        * set data-speed="" - OPTIONAL
        */
        $(".parallax-bg-img").each(function(){
            eachSpeed = $(this).data("speed") ? $(this).data("speed") : "0.6";
            var yPos = -eachSpeed*($(this).offset().top - scrolled);
            if($(this).offset().top - scrolled < 0.9*windowHeight && $(this).offset().top - scrolled > -0.9*windowHeight){
                $(this).css({ "background-position-y": yPos });
            }
        });
    });

    // menu toogle
    $("#bbMenuToggle").click(function(){
        $("body").toggleClass("open-bb-menu");
        $(this).children("span").toggleClass("icon-menu");
        $(this).children("span").toggleClass("icon-cross");
    });
    $(".page-content, .footer, #bbMenuClose").click(function(){
        $("body").removeClass("open-bb-menu");
        $("body").removeClass("menu-open");
        $("#bbMenuToggle").children("span").addClass("icon-menu");
        $("#bbMenuToggle").children("span").removeClass("icon-cross");
    });
    $(".bb-menu .nav a").click(function(e){
        e.preventDefault();
        $(this).parent("li").siblings().removeClass("active");
        $(this).parent("li").addClass("active");
    });
    $(".bb-menu .nav .has-submenu a").click(function(e){
        e.preventDefault();
        $(this).parents(".bb-menu").find(".submenu-back").show();
    });
    $(".bb-menu .submenu-back").click(function(){
        $(this).parent().siblings().find(".nav-item.active").removeClass("active");
        $(this).hide();
    });

    $(".menu-open").click(function (e) {
        e.preventDefault();
        $("body").addClass("menu-open");
    });
    $(".menu-close").click(function (e) {
        e.preventDefault();
        $("body").removeClass("menu-open");
    });

    // Page Scrolling
    $("a[href^='#target_']").click(function (e) {
        e.preventDefault();
        elementClick = $(this).attr("href");
        if($(elementClick).length){
            destination = $(elementClick).offset().top;
            $('body,html').animate({
                scrollTop: destination
            }, 600);
        }
    });


    // forms
    $("input.form-control").keyup(function(){
        let thisId = $(this).attr("id");
        if($('[data-relateInput="' + thisId + '"]').length){
            let defaultText = $('[data-relateInput="' + thisId + '"]').data("text");
            if($(this).val().length > 0){
                $('[data-relateInput="' + thisId + '"]').text("(עד 140 תווים)");
            }else{
                $('[data-relateInput="' + thisId + '"]').text(defaultText);
            }
        }
    });
});


//// Add event listener
//document.addEventListener("mousemove", parallax);
//const elem = document.getElementById("#parallaxJs");
//// Magic happens here
//function parallax(e) {
//    let _w = window.innerWidth/2;
//    let _h = window.innerHeight/2;
//    let _mouseX = e.clientX;
//    let _mouseY = e.clientY;
//    let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.06}%`;
//    let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.1}%`;
//    let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.16}%`;
//    let x = `${_depth3}, ${_depth2}, ${_depth1}`;
//    if(elem){
//        elem.style.backgroundPosition = x;
//    }
//}