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

let localArr = [];

const mainContainer = document.getElementsByClassName("items-container")[0];

//Base URL
const url =
  "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";
getMenu();
//Fetch Menu
async function fetchMenu() {
  let response = await fetch(url, { method: "GET" });

  let res = await response.json();
  localArr = res;
  return res;
}

//Load Menu
async function getMenu() {
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
          <button class="order" value=${val.id}>+</button>
        </div>
      </div>`;
    mainContainer.appendChild(item);
  });

  let orderButton = document.getElementsByClassName("order");

  Array.from(orderButton).forEach((val) => {
    val.addEventListener("click", TakeOrder);
  });
}

//Function to Take Order
function TakeOrder(e) {
  let fooItem = localArr[Number(e.target.value) - 1].name;
  let price = localArr[Number(e.target.value) - 1].price;
  alert(`Order for ${fooItem} has been taken!`);
  let ans = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ FoodItem: fooItem , Price : price });
    }, 2500);
  });
  ans
    .then((data) => {
      OrderPrep(data);
    })
    .catch(() => {
      alert("Order could not be taken");
    });
}

//Function for OrderPreparation 
function OrderPrep(Order) {
  alert(`Preparing order ${Order["FoodItem"]}`);
  let Prep = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ status: true, paid: false, item: Order["FoodItem"] , Price : Order["Price"]});
    }, 1500);
  });
  Prep.then((data) => {
    payOrder(data);
  }).catch(() => {
    alert("Item is not available");
  });
}

function payOrder(OrderStaus) {
  let payMent = new Promise((resolve, reject) => {
    setTimeout(() => {
      //Confirm the order
      if (confirm(`Pay for ${OrderStaus["item"]} for $${OrderStaus["Price"]}/-`))
      //Incase the food was not cooked
        if (OrderStaus["paid"] === false && OrderStaus["status"] === true) {
          resolve(OrderStaus);
        }
      reject(OrderStaus);
    }, 1000);
  });
  payMent
    .then((data) => {
      thankYou(data);
    })
    .catch(() => {
      alert("Payment not considered! Because Order was rejected");
    });
}

//Function for thanksgiving
function thankYou(Sucess) {
  alert(`Payment Successful for ${Sucess["item"]} thanking you for your Visit`);
}
