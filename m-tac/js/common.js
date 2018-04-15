$(function () {
    // flobal fix window width

    var windowWidth = $(window).width() + 17,
        $textPage = $('.text-page');

    if (!$textPage.find('table').is('[class]')) {
        $textPage.find('table').addClass('responsive-table').cardtable({
            myClass: 'resp-table',
            headIndex: 2
        });
    }
    if (!$textPage.find('ul').is('[class]')) {
        $textPage.find('ul').addClass('text-page__ul');
    }
    if (!$textPage.find('ol').is('[class]')) {
        $textPage.find('ol').addClass('text-page__ol');
    }

    ////////////////////////////////// mobile footer ///////////////////////////////////////

    function bindJsOnMobile(windowWidth) {

        var pageFtitle = $('.footer-title');

        if (windowWidth < 768) {
            pageFtitle.unbind('click').click(function () {
                $(this).next().slideToggle();
                $(this).toggleClass('rotate');
            })
        } else {
            pageFtitle.unbind('click');
            pageFtitle.next().removeAttr('style');
            pageFtitle.removeClass('rotate');
        }
    }

    $(window).ready(bindJsOnMobile(windowWidth)).resize(function () {
        bindJsOnMobile(window.innerWidth);
    });


    ///////////////////////////////// top slider //////////////////////////////////////////

    $('.top-slider__for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.top-slider__nav'
    });
    $('.top-slider__nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.top-slider__for',
        dots: true,
        arrows: true
    });

    ///////////////////////////////// four item slider goods /////////////////////////////////

    $('.four-item-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        dots: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    });

    /////////////////////////////////// interactive modals init ////////////////////////////

    $('.interactive-block').on('click', '.image-dot', function (e) {
        e.preventDefault();

        if(!$('.interactive-block__modals').hasClass('active')) {
            $('.interactive-block__modals').addClass('active');

        }
        $('.interactive-block__modals').find($(this).attr('href')).addClass('active').siblings().removeClass('active');
    });

    ////////////////////////////// close interactive modals ////////////////////////////////
    $('.goods-close').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.goods').removeClass('active');
        $('.interactive-block__modals').removeClass('active');

    });

    $(document).on('click', '.interactive-block__modals.active', function (e) {

        $('.interactive-block__modals').removeClass('active');
        $('.interactive-block__modals').find('.goods.active').removeClass('active');


    });


    ///////////////////////////// masked input ////////////////////////////////////

    $(".tel-input").mask("(999)999-99-99", {placeholder: "(___) ___-__-__"});


    ////////////////////////////////////// tablet menu scripts ///////////////////////////////////////////

    var $body = $('body');
    var $pageHeader = $('.page-header');
    var $desctopModalMenu = $('#desktop-modal-menu');
    var $mobTriggerMenu = $('.mobile-menu-trigger');
    var $bottomMenu = $('.page-header-bottom__menu');

    var menuBlur = $('<div/>', {
        class: 'menu-blur'
    });
    var tabletMenu = $('<div/>', {
        id: 'tablet-menu',
        class: 'tablet-menu-block'
    });

    var tabletMenuWrapper = $('<div/>', {
        class: 'container',
        id: 'tablet-menu-wrapper'
    });

    $pageHeader.append(tabletMenuWrapper);
    $(tabletMenuWrapper).append(tabletMenu);
    $('.page-header-top__language').clone().appendTo(tabletMenu);
    $desctopModalMenu.find('.main-top-menu__item').clone().appendTo(tabletMenu);
    $desctopModalMenu.find('.main-top-menu__for-user').clone().appendTo(tabletMenu);
    $(tabletMenu).find('#for-tablet-menu-clone').children().remove();
    $bottomMenu.children('li').clone().appendTo($(tabletMenu).find('#for-tablet-menu-clone'));



    $mobTriggerMenu.on('click', function (e) {
        e.preventDefault();
        if (!$body.hasClass('main-menu-open')) {
            $body.addClass('main-menu-open');
            $body.append(menuBlur);
            $(tabletMenu).addClass('active');
            $mobTriggerMenu.addClass('active');

        } else {
            $('#tablet-menu').removeClass('active');
            $body.removeClass('main-menu-open');
            $('.menu-blur').remove();
            $mobTriggerMenu.removeClass('active');

            $('#tablet-menu').find('.modal-menu-link-list').removeClass('open');
            $('#tablet-menu').find('.tablet-menu-block').removeClass('open');
            $('#tablet-menu').find('.level-two').removeClass('open');
            $('#tablet-menu').find('.level-two').removeClass('close');
            $('#tablet-menu').find('.level-three').removeClass('open');
            $('#tablet-menu').find('.level-three').removeClass('close');
            $('#tablet-menu').find('.modal-menu-link-list').removeClass('close');
        }
    });


    $(document).on('click', '.menu-blur', function () {
        $body.removeClass('main-menu-open');
        $('#tablet-menu').removeClass('active open');
        $('#tablet-menu').find('.modal-menu-link-list').removeClass('open');
        $('#tablet-menu').find('.modal-menu-link-list').removeClass('close');
        $('.menu-blur').remove();
        $mobTriggerMenu.removeClass('active');

        $('#tablet-menu').find('.level-one').removeClass('open');
        $('#tablet-menu').find('.level-one').removeClass('close');
        $('#tablet-menu').find('.level-two').removeClass('open');
        $('#tablet-menu').find('.level-three').removeClass('open');
        $('#tablet-menu').find('.level-two').removeClass('close');
    });

    $(document).on('click', '#tablet-menu', function (e) {
        var $target = $(e.target);
        if($target.hasClass('modal-menu-title')){
            $target.next('.modal-menu-link-list').addClass('open');
            $('#tablet-menu').removeClass('active');
        }
        if($target.closest('li').hasClass('level-one has-child')) {
            e.preventDefault();
            $target.closest('.modal-menu-link-list').removeClass('open');
            $target.closest('.modal-menu-link-list').addClass('close');
            $target.next('.level-two').addClass('open');
            $target.closest('li').addClass('close');
        }

        if($target.closest('li').parent().hasClass('level-two') && $target.closest('li').hasClass('has-child')) {
            e.preventDefault();
            $target.closest('.level-one').removeClass('open');
            $target.closest('.level-one').addClass('close');
            $target.next('.level-three').addClass('open');
            $target.closest('li').parent('.level-two').removeClass('open').addClass('close');
        }

        if($target.closest('li').hasClass('back-link')) {

            if($target.parent().parent().hasClass('level-two')){
                $target.closest('.modal-menu-link-list').removeClass('close');
                $target.closest('.modal-menu-link-list').addClass('open');
                $target.closest('.level-two').removeClass('open');
            }

            if($target.parent().parent().hasClass('level-three')){
                $target.parent().parent('.level-three').removeClass('open');
                $target.closest('.level-two').removeClass('close');
                $target.closest('.level-two').addClass('open');
            }

            if($target.parent().parent().hasClass('modal-menu-link-list')){
                $target.closest('.modal-menu-link-list').removeClass('open');
                $target.closest('.level-two').removeClass('open');
                $target.closest('.modal-menu-link-list').removeClass('close');
                $('#tablet-menu').addClass('active');
            }


            // $target.closest('.modal-menu-link-list').removeClass('open');
            // $target.closest('.level-two').removeClass('open');
            // $target.closest('.modal-menu-link-list').removeClass('close');
            // $('#tablet-menu').addClass('active');

        }
    });
    
    //////////////////////////////////// desktop search /////////////////////////////////
    var searchBlur = $('<div>', {
        class: 'search-blur'
    });

    // $('.page-header-search__wrapper').addClass('open');
    // $('.page-header-search__result').addClass('open');
    // $('.page-header-search__form').addClass('active');
    // $('body').append(searchBlur);
    // $('.page-header-search__form').find('input').focus();

    $('.page-header-search__form').find('input').on('focus', function () {
        $('.page-header-search__result').addClass('open');
        $('.page-header-search__wrapper').addClass('open');
    });

    $('.page-header-search__form').find('input').on('blur', function () {
        $('.page-header-search__result').removeClass('open');
        $('.page-header-search__wrapper').removeClass('open');

        if($(document).innerWidth() < 768){
            $('.mobile-search-trigger').trigger('click');
        }
    });

    //////////////////////////////////// mobile search //////////////////////////////////////



    $('.mobile-search-trigger').on('click', function (e) {
       e.preventDefault();



       if($('body').hasClass('main-menu-open')) {
           $('.mobile-menu-trigger').trigger('click');
       }
       if(!$('.page-header-search__form').hasClass('active')) {
           $('.page-header-search__form').addClass('active');
           $('.page-header-search__form').find('input').focus();
           $('body').append(searchBlur);
       } else {
           $('.page-header-search__form').removeClass('active');
           $('body').find('.search-blur').remove();
       }
    });

    // close

    $(document).on('click', '.search-blur', function () {
        $('.mobile-search-trigger').trigger('click');
    });


    /////////////////////////////////////////////////// scroll to top ///////////////////////

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#scroll-up').fadeIn();
        } else {
            $('#scroll-up').fadeOut();
        }
    });

    $('#scroll-up').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    /////////////////////////////////////////////// fix bug with uk-data-grid ///////////
    // var informListLastChild = $('.inform-list').find('.uk-flex').children().last().clone();
    //
    // function replacerItemInInformList(){
    //     if (windowWidth < 992) {
    //         $('.inform-list').find('.uk-flex').children().last().remove();
    //         informListLastChild.insertAfter($('.inform-list').find('.uk-flex > div:nth-child(2)'));
    //     }
    // }
    //
    // replacerItemInInformList();

    ///////////////////////////////////// filter /////////////////////////////////////////////

    if(!$('.sidebar-filter__item--title').hasClass('open')) {
        $('.sidebar-filter__item--title').next('.sidebar-filter__item--content').slideUp();
    }

    $(document).on('click', '.sidebar-filter__item--title', function (e) {
        e.preventDefault();
        if($(this).hasClass('open')){
            $(this).removeClass('open');
            $(this).next('.sidebar-filter__item--content').slideUp();
        } else {
            $(this).addClass('open');
            $(this).next('.sidebar-filter__item--content').slideDown();
        }
    });

    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 3500,
        values: [679, 2790],
        slide: function (event, ui) {
            $("#amount-max").val(ui.values[1]);
            $("#amount-min").val(ui.values[0]);
        }
    });

    $("#amount-max").val($("#slider-range").slider("values", 1));
    $("#amount-min").val($("#slider-range").slider("values", 0));

    $("#amount-max, #amount-min").on('blur', function(){
        var aMax = $('#amount-max').val();
        var aMin = $('#amount-min').val();
        var absolutMin = Number($("#slider-range").slider("option", "min"));

        if(aMin > aMax){
            $("#slider-range").slider("values", [aMin, aMin]);
            $("#amount-min").val(absolutMin);

        } else {
            $("#slider-range").slider("values", [aMin, aMax]);

        }
    });

    ///////////////////////////////////// goods filter ///////////////////////////////////////////////

    $('.catalog-sort__list').find('li').on('click', function(e){
        e.preventDefault();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });

    function bindJsOnFilterSelectTablet(windowWidth) {
        var catalogSort = $('.catalog-sort__list');
        var allOptions = catalogSort.children('li:not(.init)');

        if (windowWidth < 992) {
            catalogSort.unbind('click').on("click", ".init", function(e) {
                e.preventDefault();
                $(this).toggleClass('open');
                $(this).closest("ul").children('li:not(.init)').slideToggle();
            });

            catalogSort.on("click", "li:not(.init)", function(e) {
                e.preventDefault();
                allOptions.removeClass('selected');
                $(this).addClass('selected');
                catalogSort.children('.init').html($(this).html());
                allOptions.slideToggle();
                catalogSort.find('.init').removeClass('open');
            });
        } else {
            catalogSort.unbind('click');
            catalogSort.find('li').removeAttr('style');
        }
    }

    $(window).ready(bindJsOnFilterSelectTablet(windowWidth)).resize(function () {
        bindJsOnFilterSelectTablet(window.innerWidth);
    });



    /////////////////////////////////////// sidebar mobile ////////////////////////////////

    function bindJsOnFilterSidebar(windowWidth) {
        var $sidebarTitle = $('.sidebar-title');
        var $catalogSubcategoryTitle = $('.catalog-subcategory-title');

        if (windowWidth < 768) {
            $sidebarTitle.unbind('click').on('click', function (e) {
                e.preventDefault();
                $(this).toggleClass('open');
                $(this).next().slideToggle();
            });

            $catalogSubcategoryTitle.unbind('click').on('click', function () {
                $(this).toggleClass('open');
                $(this).next().slideToggle();
            });

        } else {
            $sidebarTitle.unbind('click');
            $sidebarTitle.removeClass('open');
            $sidebarTitle.next().removeAttr('style');

            $catalogSubcategoryTitle.unbind('click');
            $catalogSubcategoryTitle.removeClass('open');
            $catalogSubcategoryTitle.next().removeAttr('style');
        }
    }

    $(window).ready(bindJsOnFilterSidebar(windowWidth)).resize(function () {
        bindJsOnFilterSidebar(window.innerWidth);
    });




    ///////////////////////////////////////////// sidebar subcategory ////////////

    $('.sidebar-list__item').find('a').on('click', function () {
        $(this).next().slideToggle();
    });



    /////////////////////////////////////// product news slider /////////////////////////////////

    $('.product-fourItem-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    });


    /////////////////////////////////////// six item slider /////////////////////////////////

    $('.six-item-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]

    });

    /////////////////////////////////////////// product slider /////////////////////////////////

    var $productSliderTop = $('.product-slider__top'),
        $productSliderBottom = $('.product-slider__bottom'),
        productSlidesCount = $productSliderBottom.children('div').length,
        navSlideItem =
            '<div>' +
            '<div class="product-slider__bottom--item">' +
            '<a href="javascript:void(0);" role="button"></a>' +
            '</div>' +
            '</div>';

    function updateProductSlideCount() {
        var i=0;
        switch(productSlidesCount) {
            case 1:
                for(i; i < 3; i++){
                    $productSliderBottom.append(navSlideItem);
                }
                break;

            case 2:
                for(i; i < 2; i++){
                    $productSliderBottom.append(navSlideItem);
                }
                break;

            case 3:
                for(i; i < 1; i++){
                    $productSliderBottom.append(navSlideItem);
                }
                break;

            default:
                break;
        }
    }

    updateProductSlideCount();


    $productSliderTop.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        infinite: false,
        asNavFor: '.product-slider__bottom'
    });
    $productSliderBottom.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-slider__top',
        dots: false,
        arrows: true,
        infinite: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    });
    

    ////////////////////////////// gallery slider ////////////////////////////////////

    var $galleryTopSlider = $('.gallery-slider-view'),
        $galleryNavSlider = $('.gallery-slider-nav'),
        $zoomLink = $('.product-zoom'),
        slickIndex,
        slidesCount = $galleryNavSlider.children('div').length;



    // clone slides for display borders

    function updateGallerySlideCount() {
        var i=0;
        switch(slidesCount) {
            case 1:
                for(i; i < 4; i++){
                    $galleryNavSlider.append(navSlideItem);
                }
                break;

            case 2:
                for(i; i < 3; i++){
                    $galleryNavSlider.append(navSlideItem);
                }
                break;

            case 3:
                for(i; i < 2; i++){
                    $galleryNavSlider.append(navSlideItem);
                }
                break;

            default:
                break;
        }
    }

    updateGallerySlideCount();


    // catch current slide by slick data attribute index
    $zoomLink.on('click', function () {
        slickIndex = $(this).closest('.product-slider__top--item').parent().data('slick-index');
    });

    // modal init
    $zoomLink.magnificPopup({
        type: 'inline',
        preloader: false,
        callbacks: {
            open: function() {
                if (!$('.gallery-slider-view.slick-initialized').length && !$('.gallery-slider-nav.slick-initialized').length) {
                    $galleryTopSlider.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: false,
                        fade: true,
                        infinite: false,
                        asNavFor: '.gallery-slider-nav'
                    });

                    $galleryNavSlider.slick({
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        vertical: true,
                        asNavFor: '.gallery-slider-view',
                        dots: false,
                        arrows: true,
                        infinite: false,
                        focusOnSelect: true,
                        draggable: false,
                        responsive: [
                            {
                                breakpoint: 1280,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });

                    // slide to current slide in modal window
                    $galleryNavSlider.find('.slick-slide').eq(slickIndex).trigger('click');

                } else {
                    // if sliders exist => just refresh it
                    $galleryTopSlider.slick('refresh');
                    $galleryNavSlider.slick('refresh');
                    $galleryNavSlider.find('.slick-slide').eq(slickIndex).trigger('click');
                }

            }
        }
    });


    ///////////////////////////////////// sitemap ///////////////////////////////////////////////

    $('.sitemap-sublist__item.has-child').on('click', function () {
        $(this).find('.sitemap-sub-sublist').slideToggle();
        $(this).toggleClass('open');
    });
    
    
    ////////////////////////////////////// lookbook detail /////////////////////////////////

    $('.lookbook-slider-content').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        infinite: false,
        asNavFor: '.lookbook-slider__top-carousel'
    });
    $('.lookbook-slider__top-carousel').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        asNavFor: '.lookbook-slider-content',
        dots: false,
        arrows: true,
        infinite: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    });

    /////////////////////////////////// lookbook scroll //////////////////////////////////

    function bindJsToCustomScrollbar(windowWidth) {

        var $lbBlock = $(".lookbook-scroll__block"),
            $slContent= $('.lookbook-slider-content');


        if (windowWidth < 768) {
            $lbBlock.mCustomScrollbar("destroy");
            $slContent.find('a').unbind('click').on('click', function(event){
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $( $.attr(this, 'href') ).offset().top
                }, 500);
            });

            $slContent.find('a').unbind('click').on('click', function (e) {
                e.preventDefault();
                var href = $.attr(this, 'href');
                $('html, body').animate({
                    scrollTop: $(href).offset().top
                }, 500);
                return false;
            });
        } else {
            $lbBlock.mCustomScrollbar("destroy");
            $lbBlock.mCustomScrollbar({
                theme:"dark",
                alwaysShowScrollbar: 2,
                scrollButtons:{enable:true},
                advanced:{autoExpandHorizontalScroll:true}
            });

            ///////////////////////////// scroll to current goods //////////////////////////

            $slContent.find('a').unbind('click').on('click', function (event) {
                event.preventDefault();
                var $this = $(this),
                    href = $this.attr("href"),
                    $current = $(document.getElementById(href.split(/#(.+)/)[1])),
                    $paerent = $current.parent('.lookbook-scroll__block--item');

                $lbBlock.mCustomScrollbar("scrollTo", href);
                $paerent.addClass('active');
                $paerent.siblings().removeClass('active');
            });
        }
    }

    $(window).ready(bindJsToCustomScrollbar(windowWidth)).resize(function () {
        bindJsToCustomScrollbar(window.innerWidth);
    });


    ////////////////////////////////// custom select /////////////////////////

    $('.custom-select').selectric();

    $(document).on('click', '.store-location-modals__item--close', function (e) {
        e.preventDefault();
        $(this).closest('.store-location-modals__item').fadeOut();
    });


//////////////////////////////////// video madals ////////////////////////////

    $('.youtube-modal').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '</div>' // HTML markup of popup, `mfp-close` will be replaced by the close button
        }

    });

    ////////////////////////////////////// video modals /////////////////////////////////////////////////

    $(".video-modal-launcher").on('click', function(){
        var videoAddress = $(this).data('address');
        $("#iframeYoutube").attr("src","https://www.youtube.com/embed/"+videoAddress);
    });


    $('.video-modal-launcher').magnificPopup({
        type: 'inline',
        preloader: false,
        callbacks: {
            close: function() {
                $("#iframeYoutube").attr("src","");
            }
        }
    });








});


