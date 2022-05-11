const games = document.getElementById("games");
const searchGame = document.getElementById("search-game");
const categoryGame = document.getElementById("category-game");
let page = 1;
let category = "";

//Start page with 10 best game
const getFeaturedGames = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/features`;
    const res = await fetch(url);
    const data = await res.json();
    games.innerHTML = data.data
      .map(
        (item) => `<div class="tag-game">
<div class="img-game">
  <img
    src="${item.header_image}"+
    alt="${item.name}"
  />
</div>
<div class="name-price-game">
    <div class="name-game">${item.name}</div>
    <div class="price-game">${item.price}</div>
</div>
</div>`
      )
      .join("");
  } catch (err) {
    console.log("err", err);
  }
};
getFeaturedGames();

// Search game
const getAllGame = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/games?q=${searchGame.value}`;
    const res = await fetch(url);
    const data = await res.json();
    games.innerHTML = data.data
      .map(
        (item) => `<div class="tag-game">
<div class="img-game">
  <img
    src="${item.header_image}"+
    alt="${item.name}"
  />
</div>
<div class="name-price-game">
    <div class="name-game">${item.name}</div>
    <div class="price-game">${item.price}</div>
</div>
</div>`
      )
      .join("");
  } catch (error) {
    console.log(error);
  }
};

// Category list

const categoryList = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/genres`;
    const res = await fetch(url);
    const data = await res.json();
    categoryGame.innerHTML = data.data
      .map(
        (item) =>
          `<div onclick="seachByCategory('${item.name}')" class="filterGame">${item.name}</div>`
      )
      .join("");
  } catch (error) {
    console.log(error);
  }
};
categoryList();

// Search by category

const getDataCategory = async () => {
  let url = `https://cs-steam-api.herokuapp.com/games?page=${page}&limit=20`;
  try {
    if (category) {
      url += `&genres=${category}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    games.innerHTML = data.data
      .map(
        (item) => `<div class="tag-game">
<div class="img-game">
  <img
    src="${item.header_image}"+
    alt="${item.name}"
  />
</div>
<div class="name-price-game">
    <div class="name-game">${item.name}</div>
    <div class="price-game">${item.price}</div>
</div>
</div>`
      )
      .join("");
  } catch (error) {
    console.log(error);
  }
};

const seachByCategory = (key) => {
  //key la gia tri lay duoc khi click vao list category
  category = key;
  getDataCategory();
};

// page up & page down:

const forward = async () => {
  page += 1;
  getDataCategory();
};

const backward = async () => {
  if (page <= 1) {
    page = 1;
  } else {
    page -= 1;
  }
  getDataCategory();
};
