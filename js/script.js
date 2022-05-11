var currentSlides = 5;

//OnLoad:
$(document).ready(function () {
  document.getElementById('currentYear').innerHTML = new Date().getFullYear();
  w_w = $(window).width();
  if (w_w > 200) {
    var element = document.getElementById('mySwiper');

    //Initialize Swiper
    var swiper = new Swiper('.mySwiper', {
      slidesPerView: 5,
      spaceBetween: 10,
      slidesPerGroup: 5,
      loop: true,
      loopFillGroupWithBlank: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  //onResize
  $(window).resize(function () {
    w_w = $(window).width();
    if (w_w > some_value) {
      var element = document.getElementById('mySwiper');
      element.classList.add('mystyle');
      element.classList.remove('mystyle');
      //Initialize Swiper
      var swiper = new Swiper('.mySwiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  });
});

var visibleDropdownOptions = false;

function activeDropdownOptions() {
  visibleDropdownOptions = !visibleDropdownOptions;
  if (visibleDropdownOptions) {
    document.getElementById('dropdownOptions').style.display = 'grid';
  } else {
    document.getElementById('dropdownOptions').style.display = 'none';
  }
}
