/* eslint-disable linebreak-style */
function getRandomInt(maximum, minimum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
//
const fishCount = 5; // количество рыб на экране -1
const minSpeed = 4;
const maxSpeed = 30;
//
// функция для переключения состояния с дефолного на "аквариум"
function goToAquarium() {
  document.querySelector('#scene button').style.display = 'none';
  document.querySelector('#aqarium').style.display = 'block';
}

function addFishes() {
  // margin-top: -30px;
  const aqarium = document.querySelector('#aqarium');
  const fishProto = document.querySelector('.fish').cloneNode(true);

  for (let i = 0; i < fishCount; i += 1) {
    const newFish = fishProto.cloneNode(true);
    if (Math.random() > 0.5) {
      newFish.classList.add('reverce_fish');
    }
    newFish.style.setProperty('-webkit-animation-duration', `${getRandomInt(minSpeed, maxSpeed)}s`);
    aqarium.appendChild(newFish);
  }
}
// /////////////////////////////
// on load file
document.querySelector('#scene button').addEventListener('click', () => {
  goToAquarium();
  addFishes();
});
document.querySelector('#aqarium .fish').addEventListener('mouseenter', () => {
  alert('asd');
  console.log("asdasd");
});
console.log(document.querySelector('#aqarium .fish'));
