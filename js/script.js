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

//OnLoad: (check the screen size when the page loads)
$(document).ready(function () {
  updateData();
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

//options dropdown
var visibleDropdownOptions = false;
function activeDropdownOptions() {
  visibleDropdownOptions = !visibleDropdownOptions;
  if (visibleDropdownOptions) {
    document.getElementById('dropdownOptions').style.display = 'grid';
  } else {
    document.getElementById('dropdownOptions').style.display = 'none';
  }
}

//search bar
var visibleSearchBar = false;
function activeSearchBar() {
  visibleSearchBar = !visibleSearchBar;
  if (visibleSearchBar) {
    document.getElementById('searchBar').style.display = 'grid';
    visibleNotificationArea = false;
    document.getElementById('notificationArea').style.display = 'none';
    visibleUserArea = false;
    document.getElementById('userArea').style.display = 'none';
  } else {
    document.getElementById('searchBar').style.display = 'none';
  }
}

//notificationArea
var visibleNotificationArea = false;
function activeNotificationArea() {
  visibleNotificationArea = !visibleNotificationArea;
  if (visibleNotificationArea) {
    document.getElementById('notificationArea').style.display = 'grid';
    visibleSearchBar = false;
    document.getElementById('searchBar').style.display = 'none';
    visibleUserArea = false;
    document.getElementById('userArea').style.display = 'none';
  } else {
    document.getElementById('notificationArea').style.display = 'none';
  }
}

//userArea
var visibleUserArea = false;
function activeUserArea() {
  visibleUserArea = !visibleUserArea;
  if (visibleUserArea) {
    document.getElementById('userArea').style.display = 'grid';
    visibleNotificationArea = false;
    document.getElementById('notificationArea').style.display = 'none';
    visibleSearchBar = false;
    document.getElementById('searchBar').style.display = 'none';
  } else {
    document.getElementById('userArea').style.display = 'none';
  }
}

// Fetch API and fill all cards
async function fillCardsWithTitles() {
  var idsTitles = ['lancamento', 'series-alta', 'filmes-alta', 'top-10'];

  var tmdbEndPoints = [
    'https://api.themoviedb.org/3/movie/now_playing?api_key=048f6cfb793160accb8cce7d10a17083&language=pt-BR&page=1',
    'https://api.themoviedb.org/3/tv/popular?api_key=048f6cfb793160accb8cce7d10a17083&language=pt_BR&page=1',
    'https://api.themoviedb.org/3/movie/popular?api_key=048f6cfb793160accb8cce7d10a17083&language=pt_BR&page=1',
    'https://api.themoviedb.org/3/trending/movie/day?api_key=048f6cfb793160accb8cce7d10a17083',
  ];

  var titlesType = ['movie', 'tv', 'movie', 'movie'];
  // getTitles(tmdbEndPoints[0]);

  const cardTemplate = document
    .getElementById('templateCard')
    .getElementsByClassName('card-data')[0];

  for (var i = 0; i < idsTitles.length; i++) {
    const currentCards = await getTitles(
      tmdbEndPoints[i],
      titlesType[i],
      idsTitles[i] === 'top-10' ? 10 : 0,
    );

    // currentCards = await translateTitles(currentCards, titlesType[i]);

    const currentSwiper = document
      .getElementById(idsTitles[i])
      .getElementsByClassName('mySwiper')[0]
      .getElementsByClassName('swiper-wrapper')[0];

    // const cloneCard = cardTemplate.cloneNode(true);
    // currentSwiper.appendChild(cloneCard);

    for (var j = 0; j < currentCards.length; j++) {
      const cloneCard = cardTemplate.cloneNode(true);

      cloneCard
        .getElementsByClassName('title-img')[0]
        .getElementsByTagName('img')[0].src =
        'https://image.tmdb.org/t/p/w780' + currentCards[j]['backdrop_path'];

      cloneCard
        .getElementsByClassName('play-media')[0]
        .getElementsByTagName('a')[0].href =
        'https://www.themoviedb.org/' +
        titlesType[i] +
        '/' +
        currentCards[j]['id'] +
        '/watch';

      cloneCard
        .getElementsByClassName('title-media')[0]
        .getElementsByTagName('h4')[0].innerHTML = currentCards[j]['name'];

      if (idsTitles[i] === 'top-10') {
        cloneCard.getElementsByClassName('title-img')[0].dataset.content =
          '#' + (j + 1);
      }
      currentSwiper.appendChild(cloneCard);
    }
  }
}
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTitles(url, titlesType = 'movie', nMax = 0) {
  //get json with all titles
  return fetch(url)
    .then((resp) => resp.json())
    .then(async function (data) {
      titles = data['results'];
      //filter to get just id, image, and name (not necessary at the moment)

      titles = titles.map(function (t) {
        const outputT = {
          id: t['id'],
          backdrop_path: t['backdrop_path'],
          name: '123',
        };
        return outputT;
      });

      //remove titles with no image
      titles = titles.filter((title) => title['backdrop_path'] !== null);

      //get just the wished number of titles
      titles =
        nMax === 0 ? titles : titles.slice(0, Math.min(nMax, titles.length));

      //try to get the portuguese name of the titles
      for (var i = 0; i < titles.length; i++) {
        titles[i]['name'] = await translateTitle(titles[i]['id'], titlesType);
      }
      return titles;
    })
    .catch(function (err) {
      return [];
    });
}

function translateTitle(id, titleType) {
  var url =
    'https://api.themoviedb.org/3/' +
    titleType +
    '/' +
    id +
    '?api_key=048f6cfb793160accb8cce7d10a17083&language=pt-BR';
  return fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      return titleType === 'tv' ? data['name'] : data['title'];
    })
    .catch(function (err) {
      return '';
    });
}

//NOW PLAYING - BANNER
function updateBanner() {
  endpoints = [
    {
      url: 'https://api.themoviedb.org/3/tv/on_the_air?api_key=048f6cfb793160accb8cce7d10a17083&language=en-US&page=1',
      category: 'tv',
    },
    {
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=048f6cfb793160accb8cce7d10a17083&language=pt-BR&page=1',
      category: 'movie',
    },
  ];

  var randomEndpoint = Math.floor(Math.random() * 2);

  //REMOVED THE RANDOM OF MOVIES AND TV SERIES, BECAUSE SERIES SOMETIMES WOULD COME WITH ENGLISH DESCRIPTION FROM API.
  randomEndpoint = 1;

  const choosenEndpoint = endpoints[randomEndpoint];
  return fetch(choosenEndpoint['url'])
    .then((resp) => resp.json())
    .then(function (data) {
      var title = {};
      do {
        title =
          data['results'][Math.floor(Math.random() * data['results'].length)];
      } while (title['backdrop_path'] === null || title['overview'] === '');

      console.log(choosenEndpoint['category']);
      console.log(title);

      document.getElementsByClassName('banner-title')[0].innerHTML =
        choosenEndpoint.category === 'tv' ? title.name : title.title;

      document.getElementsByClassName('banner-description')[0].innerHTML =
        title.overview;

      const titleInfo =
        'https://www.themoviedb.org/' +
        choosenEndpoint['category'] +
        '/' +
        title.id;

      document.getElementsByClassName('assistir-button')[0].href =
        titleInfo + '/watch';

      document.getElementsByClassName('mais-info-button')[0].href = titleInfo;

      document
        .getElementsByClassName('banner-image')[0]
        .getElementsByTagName('img')[0].src =
        'https://image.tmdb.org/t/p/original/' + title.backdrop_path;
    })
    .catch(function (err) {
      return '';
    });
}

function showContent() {
  document.getElementById('loadingSplash').style.display = 'none';
}

async function updateData() {
  await updateBanner();
  await fillCardsWithTitles();
  updateSwiperSlides();
  showContent();
}
