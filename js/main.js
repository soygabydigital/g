(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    //Animacion bg
        const circles = [];
        const numCircles = 40;

        // Función para generar un número aleatorio dentro de un rango
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        for (let i = 0; i < numCircles; i++) {
            const circle = document.createElement('div');
            circle.classList.add('custom-circle');
            circle.classList.add(i % 2 === 0 ? 'custom-orange' : 'custom-blue');
            const size = randomInRange(5, 30);
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            circle.style.opacity = (randomInRange(0.5, 1) * 0.7).toFixed(2);
            circle.style.left = `${randomInRange(0, window.innerWidth)}px`;
            circle.style.top = `${randomInRange(0, window.innerHeight)}px`;
            
            document.querySelector('.custom-background').appendChild(circle);
            circles.push(circle);
        }

        function animateCircles() {
            circles.forEach(circle => {
                const deltaX = (Math.random() - 0.5) * 10;
                const deltaY = (Math.random() - 0.5) * 10;
                const newX = parseFloat(circle.style.left) + deltaX;
                const newY = parseFloat(circle.style.top) + deltaY;

                circle.style.left = `${newX}px`;
                circle.style.top = `${newY}px`;

                const scale = 1 + (Math.random() - 0.5) * 0.2;
                circle.style.transform = `scale(${scale})`;
            });
        }

        setInterval(animateCircles, 2000);

    //----------------------------Fin de la animación------------------------------------//
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    
})(jQuery);

//Buscador

document.addEventListener("keyup", e => {
    if (e.target.matches("#buscador")) {
        if (e.key === "Escape") e.target.value = "";

        document.querySelectorAll(".list .item").forEach(contenido => {
            contenido.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? contenido.classList.remove("filtro")
                : contenido.classList.add("filtro");
        });

        thisPage = 1; // Reset page to 1 on search
        loadItem();
    }
});

//Paginacion

let thisPage = 1;
let limit = 6;

function loadItem() {
    let list = document.querySelectorAll('.list .item:not(.filtro)');
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    document.querySelectorAll('.list .item').forEach(item => item.style.display = 'none');
    list.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
            item.style.display = 'block';
        }
    });
    listPage();
}

function listPage() {
    let list = document.querySelectorAll('.list .item:not(.filtro)');
    let count = Math.ceil(list.length / limit);
    document.querySelector('.listPage').innerHTML = '';

    if (thisPage != 1) {
        let prev = document.createElement('li');
        prev.innerText = '←';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for (let i = 1; i <= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if (i == thisPage) {
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    if (thisPage != count && count > 0) {
        let next = document.createElement('li');
        next.innerText = '→';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}


// Initial load
loadItem();

function changePage(i) {
    thisPage = i;
    loadItem();
}


