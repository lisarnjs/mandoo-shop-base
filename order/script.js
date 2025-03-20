const orderItems = JSON.parse(sessionStorage.getItem("orderItem"));

function order() {
  if (!orderItems) return;

  const orderProductContainer = document.querySelector(
    ".order-product-container"
  );

  const div = document.createElement("div");
  div.innerHTML = `
    <img src="/imgs/${orderItems.productImgFileName}" alt="${orderItems.productName}" />
    <h3>${orderItems.productName}</h3>
    <p>${orderItems.productPrice}원</p>
    `;

  orderProductContainer.appendChild(div);
}

order();

let orderInfo = {
  name: "",
  phone: "",
  address: "",
  setData(key, value) {
    console.log(key, value);
    this[key] = value;
  },
};

const orderName = document.getElementById("orderName");
const orderPhoneNum = document.getElementById("orderPhoneNum");
const orderAddress = document.getElementById("orderAddress");
const submitOrder = document.getElementById("submitOrder");

orderName.addEventListener("change", (e) =>
  orderInfo.setData("name", e.target.value)
);
orderPhoneNum.addEventListener("change", (e) =>
  orderInfo.setData("phone", e.target.value)
);
orderAddress.addEventListener("change", (e) =>
  orderInfo.setData("address", e.target.value)
);

submitOrder.addEventListener("click", () => {
  if (
    orderInfo.name === "" ||
    orderInfo.phone === "" ||
    orderInfo.address === ""
  ) {
    alert("주문자 정보를 입력해주세요");
    return;
  }

  const isConfirm = confirm(`
    name: ${orderInfo.name}\n
    phone: ${orderInfo.phone}\n
    address: ${orderInfo.address}\n
    위 정보로 주문하시곘습니까?
    `);

  if (isConfirm) {
    alert(`${orderInfo.name}님 주문이 완료되었습니다!`);
    sessionStorage.removeItem("orderItem");
    location.href = "/index.html";
  } else alert(`주문 실패`);
});
