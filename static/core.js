/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
function getRandomInt(maximum, minimum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getAquarium() {
  return document.querySelector('#aqarium');
}

function createBarebone(origin) {
  const position = origin.getBoundingClientRect();

  const aqarium = getAquarium();
  const newBarebone = document.querySelector('.barebone').cloneNode(true);
  newBarebone.classList.remove('proto');

  newBarebone.style.left = `${position.left}px`;
  newBarebone.style.top = `${position.top}px`;

  aqarium.appendChild(newBarebone);

  //  самоуничтожение через 5 сек
  setTimeout(() => {
    newBarebone.remove();
  }, 5000);
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
    e.target.classList.add('dead_fish');

    createBarebone(e.target);

    e.target.remove();

    addFishes(1);
  });
}
// /////////////////////////////
// on load file
document.querySelector('#scene button').addEventListener('click', () => {
  goToAquarium();
  addFishes();
});

addDeathEvent(document.querySelector('#aqarium .fish'));
