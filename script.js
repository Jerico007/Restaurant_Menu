// console.log("hello");

{
  /* <div class="item">
<div class="item-image">
  <img src="Image_Assests/rger 1.png" alt="" />
</div>
<div class="item-content">
  <div class="item-name-price">
    <p class="item-name">Burger</p>
    <p class="item-Price">$5.99/-</p>
  </div>
  <div class="add-btn">
    <button>+</button>
  </div>
</div>
</div> */
}

let mainContainer = document.getElementsByClassName("items-container")[0];

let url =
  "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";
loadData();

async function fetchMenu() {
  let response = await fetch(url, { method: "GET" });

  let res = await response.json();
  console.log(res);
  return res;
}

async function loadData() {
  let res = await fetchMenu();

  res.forEach((val) => {
    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `<div class="item-image">
        <img src="${val.imgSrc}" alt="" />
      </div>
      <div class="item-content">
        <div class="item-name-price">
          <p class="item-name">${val.name}</p>
          <p class="item-Price">$${val.price}/-</p>
        </div>
        <div class="add-btn">
          <button>+</button>
        </div>
      </div>`;
      mainContainer.appendChild(item);
  });
}
