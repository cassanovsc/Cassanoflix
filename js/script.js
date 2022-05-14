//Put current year in footer
document.getElementById('currentYear').innerHTML = new Date().getFullYear();

//Change to smooth scroll to sections when click in menu option
const menuItemsDesktop = document.querySelectorAll(
  '.header-options-left a[href^="#"], .dropdown-options-mobile a[href^="#"]',
);

menuItemsDesktop.forEach((item) => {
  item.addEventListener('click', scrollToIdOnClick);
});

function scrollToIdOnClick(event) {
  event.preventDefault();
  const to = getScrollTopByHref(event.target) - 80;
  scrollToPosition(to);
}

function getScrollTopByHref(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  smoothScrollTo(0, to);
  // window.scroll({
  //   top: to,
  //   behavior: 'smooth',
  // });
}

// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}

//Save current slide per view
var currentSlidesPerView;

function updateSwiperSlides() {
  windowWidth = $(window).width();
  var totalSlidesPerView;
  if (windowWidth > 1200) {
    totalSlidesPerView = 5;
  } else if (windowWidth > 1000) {
    totalSlidesPerView = 4;
  } else if (windowWidth > 800) {
    totalSlidesPerView = 3;
  } else {
    totalSlidesPerView = 2;
  }

  currentSlidesPerView = totalSlidesPerView;

  //Initialize Swiper
  new Swiper('.mySwiper', {
    slidesPerView: currentSlidesPerView,
    spaceBetween: 30,
    slidesPerGroup: currentSlidesPerView,
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

function fillCardsWithTitles() {
  var idsTitles = [
    'lancamento',
    'series-alta',
    'filmes-alta',
    'top-10',
    'minha-lista',
  ];

  var tmdbGets = [];

  var currentSwiper = document
    .getElementById('filmes-alta')
    .getElementsByClassName('mySwiper')[0]
    .getElementsByClassName('swiper-wrapper')[0];

  div = document.createElement('div');
  div.classList.add('card-data');
  div.classList.add('swiper-slide');
  div.classList.add('bg2');

  currentSwiper.appendChild(div);
}

//OnLoad: (check the screen size when the page loads)
$(document).ready(function () {
  fillCardsWithTitles();
  updateSwiperSlides();
});
//onResize (check the screen size when the page resizes)
// $(window).resize(function () {
//   setTimeout(function () {
//     updateSwiperSlides();
//   }, 500);
// });
$(window).resize(function () {
  if (this.resizeTO) clearTimeout(this.resizeTO);
  this.resizeTO = setTimeout(function () {
    $(this).trigger('resizeEnd');
  }, 500);
});
$(window).bind('resizeEnd', function () {
  //do something, window hasn't changed size in 500ms
  location.reload();
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

// getLancamentos();
function getLancamentos() {
  fetch(
    'https://api.themoviedb.org/3/trending/all/day?api_key=048f6cfb793160accb8cce7d10a17083',
  )
    .then((T) => T.json())
    .then((T) => console.log(T));
}
