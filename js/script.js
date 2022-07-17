import animais from './lista_animais.js';

function menu() {
  const menuMobile = document.querySelector('.js-menu-mobile');
  const navMobile = document.querySelector('.js-nav-mobile')

  menuMobile.addEventListener('click', function () {
    navMobile.classList.toggle('ativo');
    menuMobile.classList.toggle('ativo');
  })
}
menu()


function loadCardsAnimais() {
  const containerAnimais = document.querySelector('.js-scroll-animais');

  animais.forEach(animal => createCardAnimal(animal))

  function createCardAnimal(animal) {
    const diretorio = './img/';
    const newCard = document.createElement('div');
    newCard.classList.add('card')
    const cardContent = `
    <div class="borda-card-animais">
        <a class="item-animais" href="#">
            <p class="nome-animal">${animal.nome}</p>
            <div class="img"><img src="${diretorio + animal.img}" alt="${animal.nome}"></div>
            <div class="descricao-animais">
                <span>
                    <p class="raca">${animal.raca}</p>
                    <p>${animal.gen}</p>
                </span>
                <p class="descricao">${animal.descricao}</p>
                <span>
                    <p>Idade</p>
                    <p>${animal.idade}</p>
                </span>
            </div>
        </a>
    </div>
  `;
    newCard.innerHTML = cardContent
    containerAnimais.appendChild(newCard)
  }

}
loadCardsAnimais()

function slider() {
  const btnAnterior = document.querySelector('.js-btn-anterior');
  const btnProximo = document.querySelector('.js-btn-proximo');
  const containerAnimais = document.querySelector('.js-scroll-animais');
  let slidesPerPage;
  let totalSlideItems = containerAnimais.children.length;
  let currentSlide = 0;

  function setPositionSlide() {
    let itemWidth = containerAnimais.firstElementChild.offsetWidth;
    let gapBetweenItems = +getComputedStyle(containerAnimais)['grid-column-gap'].replace('%', '');
    const slideWidth = itemWidth + containerAnimais.offsetWidth * gapBetweenItems / 100;
    containerAnimais.style.transform = `translateX(-${slideWidth * currentSlide + 'px'})`;
  }

  function previousSlide() {
    if (currentSlide == 0) {
      return;
    }
    --currentSlide;
    setPositionSlide();
  }

  function nextSlide() {
    if (currentSlide + slidesPerPage == totalSlideItems) {
      return;
    }
    ++currentSlide;
    setPositionSlide();
  }

  let inicio_X;
  let atual_X;
  let final_X;
  let distanceDragged;

  function draggingSlider(e) {
    if (e.x === 0) return;
    atual_X = e.x;
    distanceDragged = atual_X - inicio_X;
  }

  function startDrag(e) {
    inicio_X = e.x
  }

  function endDrag() {
    final_X = distanceDragged;
    if (distanceDragged > 0) {
      previousSlide()
    } else {
      nextSlide()
    }
  }

  function setSlidesPerPage() {
    if (window.innerWidth <= 560) {
      slidesPerPage = 1
    } else if (window.innerWidth <= 700) {
      slidesPerPage = 2
    }
    else if (window.innerWidth <= 920) {
      slidesPerPage = 3;
    } else {
      slidesPerPage = 4
    }
  }
  setSlidesPerPage()

  btnAnterior.addEventListener('click', previousSlide)
  btnProximo.addEventListener('click', nextSlide)

  window.addEventListener('resize', setSlidesPerPage)
  containerAnimais.addEventListener('dragstart', startDrag)
  containerAnimais.addEventListener('drag', draggingSlider)
  containerAnimais.addEventListener('dragend', endDrag)
}
slider()


function scrollAnimation() {
  const itemScroll = document.querySelectorAll('.js-scroll');
  const windowTop = window.innerHeight * 0.7
  function scrollAnima() {
    itemScroll.forEach((item) => {
      const topo = item.getBoundingClientRect().top - windowTop;
      if (topo < 0) {
        item.classList.add('anima-scroll')
      }
    })
  }
  scrollAnima()
  window.addEventListener('scroll', scrollAnima)
}
scrollAnimation()


function numeroScroll() {
  const numeros = document.querySelectorAll('.js-numero')
  const containerNumeros = document.querySelector('.numeros')
  const windowTop = window.innerHeight * 0.7
  const topoNumeros = containerNumeros.getBoundingClientRect().top - windowTop;

  if (topoNumeros < 0) {
    numeros.forEach(numero => {
      const valor = +numero.innerText
      const incremento = Math.floor(valor / 20);
      let start = 0;
      const timer = setInterval(() => {
        start = start + incremento;
        numero.innerText = start;
        if (start > valor) {
          numero.innerText = valor;
          clearInterval(timer)
        }
      }, 50)
    })
    window.removeEventListener('scroll', numeroScroll)
  }
}

window.addEventListener('scroll', numeroScroll)

function scrollHeader() {
  function updateHeaderScrolled() {
    const header = document.querySelector('.js-header')
    const pageScrolled = window.scrollY;

    if (pageScrolled > 0) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }

  }
  updateHeaderScrolled()
  window.addEventListener('scroll', updateHeaderScrolled)
}
scrollHeader()