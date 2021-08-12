let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    // on page load, fetches the images using the url
  fetch(imgUrl)
    // parses the response as JSON
    .then(res=> res.json())
    // adds image elements to the DOM for each image in the array
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
  let container = document.querySelector('#dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = dogPicUrl;
  container.appendChild(newImageEl);
}

function loadBreedOptions() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  // on page load, fetches all the dog breeds using the url above
  fetch(breedUrl)
    // parses the response as JSON
    .then(res => res.json())
    .then(results => {
      breeds = Object.keys(results.message);
      // adds the breeds to the page in the <ul> provided in index.html
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
// the user can filter breeds that start with a particular letter using a dropdown
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedsStartingWith(event.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);

  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  // when the user clicks on any one of the <li>s, the font color of that <li> changes. 
  event.target.style.color = 'palevioletred';
}