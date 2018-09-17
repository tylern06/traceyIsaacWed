$(document).ready(function() {

    // "use strict";

    // Smooth scroll to inner links

    // $('.inner-link').smoothScroll({
    //     offset: -59,
    //     speed: 800
    // });

    // Add scrolled class to nav

    // $(window).scroll(function() {
    //     if ($(window).scrollTop() > 200) {
    //         $('nav').addClass('scrolled');
    //     } else {
    //         $('nav').removeClass('scrolled');
    //     }
    // });

    // Set nav container height for fixed nav

    if (!$('nav').hasClass('transparent')) {
        $('.nav-container').css('min-height', $('nav').outerHeight());
    }

    //scroll to top
    // ===== Scroll to Top ====
    // $(window).scroll(function() {
    //     if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
    //         $('#return-to-top').fadeIn(200);    // Fade in the arrow
    //     } else {
    //         $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    //     }
    // });
    // $('#return-to-top').click(function() {      // When arrow is clicked
    //     $('body,html').animate({
    //         scrollTop : 0                       // Scroll to top of body
    //     }, 500);
    // });

    // Mobile toggle

    $('.mobile-toggle').click(function() {
        _this = $(this);
        //show animated burger menu
        _this.toggleClass('bar-open');
        $('nav').toggleClass('nav-open');

        $('.inner-link').on('click', function(e) {
          //transform back to orginal menu
          _this.removeClass('bar-open');
          //slide up menu
          $('nav').removeClass('nav-open');
        })

        $('.gallery-links').click(function(){
          _this.removeClass('bar-open');
          $('nav').removeClass('nav-open');
        })

    });

    $('.menu li a').click(function() {
        if ($(this).closest('nav').hasClass('nav-open')) {
            $(this).closest('nav').removeClass('nav-open');
        }
    });


    // Append .background-image-holder <img>'s as CSS backgrounds
    //
    // $('.background-image-holder').each(function() {
    //     var imgSrc = $(this).children('img').attr('src');
    //     $(this).css('background', 'url("' + imgSrc + '")');
    //     $(this).children('img').hide();
    //     // $(this).css('background-position', '50% 50%');
    // });
    //
    // // Fade in background images
    //
    // setTimeout(function() {
    //     $('.background-image-holder').each(function() {
    //         $(this).addClass('fadeIn');
    //     });
    //     $('.header.fadeContent').each(function() {
    //         $(this).addClass('fadeIn');
    //     });
    // }, 200);

    // Scroll to ahref
    // $(document).on('click', '.inner-link', function(event){
    //     event.preventDefault();
    //     $('html, body').animate({
    //         scrollTop: $( $.attr(this, 'href') ).offset().top
    //     }, 500);
    // });


    // Parallax scrolling

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        if (window.requestAnimationFrame) {
            parallaxBackground();
            $(window).scroll(function() {
                requestAnimationFrame(parallaxBackground);
            });
        }
    } else {
        $('.parallax').removeClass('parallax');
    }

    // Image fade on story 2 element

    $('.story-2 img').mouseenter(function() {
        $(this).removeClass('fade');
        $(this).siblings().addClass('fade');
    });

    $('.story-2 img').mouseleave(function() {
        $(this).closest('.row').find('img').removeClass('fade');
    });


    // Sliders

    $('.image-slider').flexslider({
        directionNav: false
    });

  
    // Instagram Feed

    // jQuery.fn.spectragram.accessData = {
    //     accessToken: '36200597.5cf1534.1489b4ae75de49c7bf993b312ea3124d',
    //     clientID: '5cf15348e2a54d879d3865c4b93a3505'
    // };
    // var feed = new Instafeed({
    //      get: 'tagged',
    //      tagName: 'awesome',
    //      clientId: '5cf15348e2a54d879d3865c4b93a3505',
    //      accessToken: '36200597.5cf1534.1489b4ae75de49c7bf993b312ea3124d'
    //  });
    //  feed.run();
    // $('.instafeed').each(function() {
    //     $(this).children('ul').spectragram('getUserFeed', {
    //         // console.log('hello');
    //         query: $(this).attr('data-user-name')
    //     });
    // });
// $('#insane').spectragram('getPopular');

    // Contact form code

});

$(window).load(function() {

    // Append Instagram BGs

    var setUpInstagram = setInterval(function() {
        if ($('.instafeed li').hasClass('bg-added')) {
            clearInterval(setUpInstagram);
            return;
        } else {
            $('.instafeed li').each(function() {

                // Append background-image <img>'s as li item CSS background for better responsive performance
                var imgSrc = $(this).find('img').attr('src');
                $(this).css('background', 'url("' + imgSrc + '")');
                $(this).find('img').css('opacity', 0);
                $(this).css('background-position', '50% 0%');
                // Check if the slider has a color scheme attached, if so, apply it to the slider nav
                $(this).addClass('bg-added');
            });
            $('.instafeed').addClass('fadeIn');
        }
    }, 500);

});

function convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

function parallaxBackground() {
    $('.parallax').each(function() {
        var element = $(this);
        var scrollTop = $(window).scrollTop();
        var scrollBottom = scrollTop + $(window).height();
        var elemTop = element.offset().top;
        var elemBottom = elemTop + element.outerHeight();

        if ((scrollBottom > elemTop) && (scrollTop < elemBottom)) {
            if (element.is('section:first-of-type')) {
                var value = (scrollTop / 7);
                $(element).find('.background-image-holder').css({
                    transform: 'translateY(' + value + 'px)'
                });
            } else {
                var value = ((scrollBottom - elemTop) / 7);
                $(element).find('.background-image-holder').css({
                    transform: 'translateY(' + value + 'px)'
                });
            }

        }
    });
}
