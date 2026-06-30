const openBtn = document.querySelector('.open-btn');
const modal = document.querySelector('.modals');
const closeBtn = document.querySelector('.close');

const card = document.querySelector('.card');

const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');

let scale = 1;

let currentX = 0;
let currentY = 0;

/* ABRIR */

openBtn.addEventListener('click', () => {

  modal.classList.add('active');

});

/* CERRAR */

closeBtn.addEventListener('click', () => {

  modal.classList.remove('active');

});

/* EFECTO 3D */

card.addEventListener('mousemove', (e) => {

  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  /* ROTACION */

  currentY = (x - centerX) / 15;
  currentX = -(y - centerY) / 15;

  /* LIMITES */

  currentX = Math.max(-15, Math.min(15, currentX));
  currentY = Math.max(-15, Math.min(15, currentY));

  updateTransform();

});

/* RESET */

card.addEventListener('mouseleave', () => {

  currentX = 0;
  currentY = 0;

  updateTransform();

});

/* ACTUALIZAR */

function updateTransform(){

  card.style.transform = `
    perspective(1000px)
    scale(${scale})
    rotateX(${currentX}deg)
    rotateY(${currentY}deg)
  `;

}

/* ZOOM + */

zoomIn.addEventListener('click', () => {

  scale += 0.1;

  if(scale > 2){
    scale = 2;
  }

  updateTransform();

});

/* ZOOM - */

zoomOut.addEventListener('click', () => {

  scale -= 0.1;

  if(scale < 0.5){
    scale = 0.5;
  }

  updateTransform();

});



