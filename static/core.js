/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
function dateInSeconds() {
  return new Date().getTime() / 1000;
}
let killAwailable = dateInSeconds();
//
function getRandomInt(maximum, minimum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getAquarium() {
  return document.querySelector('#aqarium');
}

function addProp(parent, origin, proto) {
  const position = origin.getBoundingClientRect();

  const element = proto.cloneNode(true);

  element.classList.remove('proto');
  element.style.left = `${position.left}px`;
  element.style.top = `${position.top}px`;

  parent.appendChild(element);

  //  самоуничтожение через 3 сек
  setTimeout(() => {
    element.remove();
  }, 3000);
}

function createBarebone(origin) {
  const newBarebone = document.querySelector('.barebone').cloneNode(true);
  addProp(getAquarium(), origin, newBarebone);
}

function createBubbles(origin) {
  const newBubble = document.querySelector('.bubble').cloneNode(true);

  addProp(getAquarium(), origin, newBubble);
  setTimeout(() => {
    addProp(getAquarium(), origin, newBubble);
  }, 250);
}
//
const fishCount = 5; // количество рыб на экране
const minSpeed = 4;
const maxSpeed = 30;
//
// функция для переключения состояния с дефолного на "аквариум"
function goToAquarium() {
  document.querySelector('#scene button').style.display = 'none';
  getAquarium().style.display = 'block';
}

function addFish(fishProto, aqarium) {
  const newFish = fishProto.cloneNode(true);
  newFish.classList.remove('proto');

  if (Math.random() > 0.5) {
    newFish.classList.add('reverce_fish');
  }
  newFish.style.setProperty('-webkit-animation-duration', `${getRandomInt(minSpeed, maxSpeed)}s`);
  addDeathEvent(newFish);
  //
  aqarium.appendChild(newFish);
}

function addFishes(amount = fishCount) {
  // margin-top: -30px;
  const aqarium = getAquarium();
  const fishProto = document.querySelector('.fish').cloneNode(true);

  for (let i = 0; i < amount; i += 1) {
    addFish(fishProto, aqarium);
  }
}
//
function addDeathEvent(fish) {
  fish.addEventListener('mouseenter', (e) => {
    if (killAwailable < dateInSeconds()) {
      killAwailable = dateInSeconds() + 0.1;

      e.target.classList.add('transparent');

      createBarebone(e.target);
      createBubbles(e.target);

      setTimeout(() => {
        e.target.remove();
        addFishes(1);
      }, 3000);
    }
  });
}
// /////////////////////////////
// on load file
document.querySelector('#scene button').addEventListener('click', () => {
  goToAquarium();
  addFishes();
});

addDeathEvent(document.querySelector('#aqarium .fish'));
