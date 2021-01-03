$(function () {
    $('body').on('click', '.nav-item', function (e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: $($(this).find('.nav-link').attr('href')).offset().top}, 50);
        $('.nav-item').removeClass('active');
        $(this).closest('.nav-item').addClass('active');
    });
});
const nav = $('#nav');
const values = ["Técnico em Redes de computadores", "Desenvolvedor Mobile", "Especialista em inovação", "Desenvolvedor FullStack"]

let cont = 0;

function checkScroll() {
    let startY = nav.height() * 2; //The point where the navbar changes in px

    if ($(window).scrollTop() > startY) {
        $('.navbar').addClass("bg-black");
        $('#logo').text("Charllys Emerenciano");
        $('#inicio > .container').css({'opacity': .5});

    } else {
        $('.navbar').removeClass("bg-black");
        $('#logo').text("");
        $('#inicio > .container').css({'opacity': 1});
    }
}

if (nav.length > 0) {
    $(window).on("scroll load resize", function () {
        checkScroll();
    });
}


function typeWrite(element, value) {
    let text = value ?? element.innerHTML;
    const textArray = text.split('');
    element.innerHTML = ' ';
    let tag = '';
    let isTag = false;

    let isFinish = new Promise((resolve, reject) => {
        textArray.forEach(function (letter, i) {

            setTimeout(function () {
                if (letter === '<') {
                    isTag = true;
                } else if (letter === '>') {
                    tag += letter;
                    letter = '';
                    isTag = false;
                } else if (letter === '|') {

                }

                if (!isTag) {
                    if (tag) {
                        element.innerHTML += tag;
                        tag = '';
                    }
                    element.innerHTML += letter;
                } else {
                    tag += letter;
                }


                if ((textArray.length - 1) === i) {
                    setTimeout(function () {
                        resolve();
                    }, 2000);
                }

            }, 100 * i);
        });
    });

    isFinish.then(() => {
        reverseTypeWrite(element);
    });


}

function reverseTypeWrite(element) {
    const textArray = element.innerHTML.split('');
    let isFinish = new Promise((resolve, reject) => {
        textArray.forEach(function (letter, i) {
            setTimeout(function () {
                let text = element.innerHTML;

                element.innerHTML = text.slice(0, -1);
                if ((textArray.length - 1) === i) {
                    resolve();
                }

            }, 50 * i);
        });
    });

    isFinish.then(() => {
        typeWrite(element, values[cont]);
        if (cont !== (values.length - 1)) {
            cont++;
        } else {
            cont = 0;
        }
    });
}


const typingAnimation = document.querySelector('.typing-animation');
typeWrite(typingAnimation);
