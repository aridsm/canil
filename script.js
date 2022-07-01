function menu() {
  const menuMobile = document.querySelector('.js-menu-mobile');
  const navMobile = document.querySelector('.js-nav-mobile')

  menuMobile.addEventListener('click', function () {
    navMobile.classList.toggle('ativo');
    menuMobile.classList.toggle('ativo');
  })
}
menu()

function slider() {
  const btnAnterior = document.querySelector('.js-btn-anterior');
  const btnProximo = document.querySelector('.js-btn-proximo');
  const containerAnimais = document.querySelector('.js-scroll-animais');


  function previousSlide() {
    const card = document.querySelectorAll('.js-card');
    card[card.length - 1].classList.add('anima-previous')
    containerAnimais.insertBefore(card[card.length - 1], containerAnimais.firstChild);
    setTimeout(() => {
      card.forEach(item => {
        item.classList.remove('anima-previous')
      })
    }, 1000)
  }

  function nextSlide() {
    const card = document.querySelectorAll('.js-card');
    card[0].classList.add('anima-next')
    setTimeout(() => {
      containerAnimais.appendChild(card[0])
      card.forEach(item => {
        item.classList.remove('anima-next')
      })
    }, 1000)
  }

  btnAnterior.addEventListener('click', previousSlide)
  btnProximo.addEventListener('click', nextSlide)
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
