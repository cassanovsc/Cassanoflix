//Put current year in footer
document.getElementById('currentYear').innerHTML = new Date().getFullYear();

//Set screen size
var maxScreenP = 700,
  maxScreenM = 1000,
  maxScreenG = 1200,
  lastWindowWidth = getCurrentWindowWidth();

function getCurrentWindowWidth() {
  ww = $(window).width();
  if (ww <= maxScreenP) return 'P';
  if (ww <= maxScreenM) return 'M';
  if (ww <= maxScreenG) return 'G';
  return 'X';
}

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
  if (windowWidth > maxScreenG) {
    totalSlidesPerView = 5;
  } else if (windowWidth > maxScreenM) {
    totalSlidesPerView = 4;
  } else if (windowWidth > maxScreenP) {
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
function fillCardsWithTitles() {
  var idsTitles = [
    'lancamento',
    'series-alta',
    'filmes-alta',
    'top-10',
    'minha-lista',
    // !stranger things, !homem aranha, greys, !tbbt, interestelar, !a origem, !harry p, !vingadores ultimato, !la casa de papel, !truque de mestre, !toy story, shrek , !freeguy, !jogador n1
  ];

  var tmdbGets = [
    'https://api.themoviedb.org/3/movie/now_playing?api_key=048f6cfb793160accb8cce7d10a17083&language=pt-BR&page=1',
    'https://api.themoviedb.org/3/tv/popular?api_key=048f6cfb793160accb8cce7d10a17083&language=pt_BR&page=1',
    'https://api.themoviedb.org/3/movie/popular?api_key=048f6cfb793160accb8cce7d10a17083&language=pt_BR&page=1',
    'https://api.themoviedb.org/3/trending/all/day?api_key=048f6cfb793160accb8cce7d10a17083',
  ];

  var currentSwiper = document
    .getElementById('minha-lista')
    .getElementsByClassName('mySwiper')[0]
    .getElementsByClassName('swiper-wrapper')[0];

  div = document.createElement('div');
  div.classList.add('card-data');
  div.classList.add('swiper-slide');
  div.classList.add('bg2');

  // currentSwiper.appendChild(div);
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
  if (lastWindowWidth != getCurrentWindowWidth()) location.reload();
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
