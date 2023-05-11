const container = document.querySelector(".products");
let products = [];
let basket = [];
let balance = 500;
fetch("https://fakestoreapi.com/products")
  .then((a) => a.json())
  .then((a) => {
    products = a;
    showProduct();
  });

const showProduct = () => {
  calculateTotal();
  container.innerHTML = "";
  products.map((product) => {
    let check = basket.find((a) => a.id === product.id);

    const div = document.createElement("div");
    div.classList.add("product");
    const img = document.createElement("img");
    img.setAttribute("src", product.image);
    const title = document.createElement("h2");
    title.textContent = product.title.slice(0, 15) + "...";
    const price = document.createElement("h1");
    price.textContent = "$ " + product.price;
    const operations = document.createElement("div");
    operations.classList.add("operations");
    const sellBtn = document.createElement("button");
    sellBtn.textContent = "Sell";
    sellBtn.disabled = !check;
    sellBtn.classList.add("sell");
    sellBtn.addEventListener("click", () => sellItem(product.id));
    const buyBtn = document.createElement("button");
    buyBtn.addEventListener("click", () => buyItem(product.id));
    buyBtn.textContent = "Buy";
    buyBtn.classList.add("buy");
    buyBtn.disabled = calculateTotal() < product.price;
    const count = document.createElement("input");
    count.setAttribute("type", "text");
    count.setAttribute("readonly", "");
    count.value = check ? check.count : 0;
    operations.append(sellBtn, count, buyBtn);
    div.append(img, title, price, operations);
    container.append(div);
  });
};

const buyItem = (id) => {
  let check = basket.find((basketItem) => basketItem.id === id);
  if (check) {
    check.count++;
  } else {
    basket.push({
      id: id,
      count: 1,
    });
  }
  showProduct();
  console.log(basket);
};

const sellItem = (id) => {
  let check = basket.find((basketItem) => basketItem.id === id);
  check.count--;
  if (check.count === 0) {
    basket = basket.filter((a) => a.id !== id);
  }
  showProduct();
  console.log(basket);
};

const calculateTotal = () => {
  let total = basket.reduce(
    (acc, item) =>
      acc +
      products.find((product) => product.id === item.id).price * item.count,
    0
  );
  console.log(total);
  document.getElementById("balance").textContent = (balance - total).toFixed(2);
  return balance - total;
};
