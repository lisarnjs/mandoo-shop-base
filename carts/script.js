const cartContainerUl = document.querySelector(".cart-container");

const cartItems = JSON.parse(localStorage.getItem("cartItems"));

function displayCarts() {
  if (!cartItems) {
    cartContainerUl.innerHTML = "장바구니에 담긴 상품이 없습니다.";
    return;
  }
  // console.log(cartItems);

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" id="${item.productName}" /><label for="${item.productName}">${item.productName}</label>`;
    cartContainerUl.appendChild(li);
  });
}
displayCarts();

const deleteButton = document.querySelector(".delete-button");

deleteButton.addEventListener("click", () => {
  // 삭제를 눌렀을 때 새롭게 반영된 장바구니 데이터를 가져오기 위해
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  const checkboxes = document.querySelectorAll(
    ".cart-container input[type='checkbox']:checked"
  );
  const checkedIds = Array.from(checkboxes).map((checkbox) => checkbox.id);
  // console.log(checkedIds);

  const updatedCart = cartItems.filter(
    (item) => !checkedIds.includes(item.productName)
  );
  // console.log(updatedCart);

  if (updatedCart.length === 0) {
    localStorage.removeItem("cartItmes");
    cartContainerUl.innerHTML = "장바구니에 담긴 상품이 없습니다.";
    return;
  }

  localStorage.setItem("cartItems", JSON.stringify(updatedCart));

  cartContainerUl.innerHTML = "";
  updatedCart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" id="${item.productName}" /><label for="${item.productName}">${item.productName}</label>`;
    cartContainerUl.appendChild(li);
  });
});

const deleteAllBtn = document.querySelector(".delete-all-button");

deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("cartItems");
  location.reload();
});
