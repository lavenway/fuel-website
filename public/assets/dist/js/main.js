(function( global, $ ) {

    "use strict";

    /*************************************************
    * PRIVATE
    *************************************************/

    // ----- VARS ----- //
    var isReady;
    var exampleModules;
    var cardsModules;
    var carouselModules;


    // ----- CONSTANTS ----- //
    var STYLE_HIDDEN = "hidden";


    // ----- GET/SET FUNCTIONS ----- //


    // ----- FUNCTIONS ----- //
    function init() {
        console.log( "init" );

        initExampleModule();
        initCardsModule();
        initCarouselModule();
        initImageScale();
        initParallax();
        //initScrollTo();
    }

    function initExampleModule() {
        console.log( "initExampleModule" );

        exampleModules = {};

        if ( $( ".example-module" ).length > 0 ) {

            $( ".example-module" ).each( function( index, el ) {

                exampleModules[ index ] = 'example';

            } );

        }

    }

    function initCardsModule() {
        console.log( "initCardsModule" );

        cardsModules = {};

        if ( $( ".cards" ).length > 0 ) {

            var $grid = $( ".card-deck" ).isotope({
                // options
                itemSelector: ".card",
                layoutMode: "masonry"

            });

            // filter items on button click
            $( "#filters .btn-group" ).on( "click", "button", function() {

                var filterValue = $( this ).attr( "data-filter" );

                $grid.isotope({ filter: filterValue });

            });
        }

    }

    function initCarouselModule() {
        console.log( "initCarouselModule" );

        carouselModules = [];

        var $item;

        var carouselId;
        var loop;
        var interval;
        var pagination;
        var nextButton;
        var prevButton;

        $( ".swiper-container" ).each( function( index ) {

            $item = $( this );

            carouselId = $item.attr( "id" );
            loop = ( $( ".swiper-slide", $item ).length > 1 ) ? true : false;
            interval = parseFloat( $item.data( "interval" ) ) || undefined;
            pagination = ( $item.find( ".swiper-pagination" ).length ) ? ".swiper-pagination" : undefined;
            nextButton = ( $item.find( ".swiper-button-next" ).length ) ? ".swiper-button-next" : undefined;
            prevButton = ( $item.find( ".swiper-button-prev" ).length ) ? ".swiper-button-prev" : undefined;

            // Set Options
            var options = {
                autoplay: interval,
                autoplayDisableOnInteraction: false,
                loop: loop,
                pagination: {
                    el: pagination,
                    clickable: true,
                    renderBullet: null
                },
                nextButton: { nextEl: nextButton },
                prevButton: { prevEl: prevButton }
            };

            // Multiple Slides
            if ( $item.hasClass( "multi-slide" ) ) {

                options.loop = false;
                options.slidesPerView = 3;
                options.spaceBetween = 48;
                options.breakpoints = {
                    767: {
                        slidesPerView: 1
                    },
                    991: {
                        slidesPerView: 2
                    }
                };

                $( ".swiper-slide" ).on( "click", function () {
                    var clickedIndex = $item[index].swiper.clickedIndex;

                    console.log( clickedIndex );

                    $item[index].swiper.slideTo( clickedIndex );
                } );

            }

            // Home Slides
            if ( $item.hasClass( "home-slide" ) ) {
                /*options.autoHeight = true;*/
                options.loop = true;
                options.slidesPerView = 1;
                options.spaceBetween = 0;
                options.speed = 1000;
                options.virtualTranslate = true;
                options.pagination.renderBullet = function ( index, className ) {
                    return '<span class="' + className + '">' + titles[ index ] + '</span>';
                };

                var titles = [];

                $( '.swiper-slide' ).each( function( i ) {
                  titles.push( $( this ).data( 'name' ))
                } );
            }

            // Create Carousel
            var carousel = new Swiper( $item[0], options );
            carouselModules.push( carousel );

        } );

    }

    function initImageScale() {
        console.log( "initImageScale" );

        if ( $( "img.scale" ).length ) {

            setTimeout( function() {
                $( "img.scale" ).imageScale({
                    fadeInDuration: '100',
                    rescaleOnResize: true
                });
            }, 800);

        }
    }

    function initParallax() {
        console.log( "initParallax" );

        if ( $( ".rellax" ).length ) {
            var rellax = new Rellax('.rellax', {
                center: true
            });
        }
    }

    /*function initScrollTo() {
        console.log( "initScrollTo" );

        $( "#global" ).scroll( function ( ) {
            if ( $( "#global" ).scrollTop() >= 1) {
                $( "body" ).addClass( "scrolled" );
            } else {
                $( "body" ).removeClass( "scrolled" );
            }
        });

    }*/

    $( window ).resize(function() {

    } );

    // ----- EVENT LISTENERS ----- //

    function onReady( e ) {
        console.log( "onReady" );

        isReady = true;

        init();
    }

    function onLoad( e ) {
        console.log( "onLoad" );
    }


    /*************************************************
    * CALL
    *************************************************/

    $( document ).ready( onReady );
    $( window ).on( "load", onLoad );


})( this, jQuery );
