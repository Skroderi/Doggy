import "../sass/style.scss";

class Doggy {
  constructor() {
    this.apiUrl = "https://dog.ceo/api";
    this.imgEl = document.querySelector(".featured img");
    this.bgEl = document.querySelector(".featured-dog__bg");
    this.tilesEl = document.querySelector(".tiles");
    this.spinnerEl = document.querySelector(".spinner");
    this.init();
  }

  toggleImg(displayType) {
    this.imgEl.style.display = `${displayType}`;
    this.bgEl.style.display = `${displayType}`;
  }

  showSpinner() {
    this.toggleImg("none");
    this.spinnerEl.style.display = "block";
  }

  hideSpinner() {
    this.toggleImg("block");
    this.spinnerEl.style.display = "none";
  }

  listBreeds() {
    return fetch(`${this.apiUrl}/breeds/list/all`)
      .then(res => res.json())
      .then(data => data.message);
  }
  getRandomImage() {
    return fetch(`${this.apiUrl}/breeds/image/random`)
      .then(res => res.json())
      .then(data => data.message);
  }
  getRandomImageByBreed(breed) {
    return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
      .then(res => res.json())
      .then(data => data.message);
  }
  init() {
    this.showSpinner();
    this.getRandomImage().then(img => this.showImageWhenReady(img));

    this.showAllBreeds();
  }

  showImageWhenReady(image) {
    this.imgEl.setAttribute("src", image);
    this.bgEl.style.background = `url("${image}")`;
    this.hideSpinner();
  }

  addBread(breed, subBreed) {
    let name;
    let type;

    if (typeof subBreed === "undefined") {
      name = breed;
      type = breed;
    } else {
      name = `${breed} ${subBreed}`;
      type = `${breed}/${subBreed}`;
    }
    const tile = document.createElement("div");
    tile.classList.add("tiles__tile");

    const tileContent = document.createElement("div");
    tileContent.classList.add("tiles__tile-content");

    tileContent.innerText = name;
    tileContent.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      this.showSpinner();
      this.getRandomImageByBreed(type).then(img =>
        this.showImageWhenReady(img)
      );
    });
    tile.appendChild(tileContent);
    this.tilesEl.appendChild(tile);
  }

  showAllBreeds() {
    this.listBreeds().then(breedsList => {
      for (const breed in breedsList) {
        if (breedsList[breed].length === 0) {
          this.addBread(breed);
        } else {
          for (const subBreed of breedsList[breed])
            this.addBread(breed, subBreed);
        }
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Doggy();
});
