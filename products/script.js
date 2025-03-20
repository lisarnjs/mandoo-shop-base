const response = await fetch("../db.json");
const data = await response.json();

console.log(data);

const ul = document.querySelector("ul");

let currentPage = 1;
const postsPerPage = 5;

// 데이터를 저장할 배열
let posts = [];

// JSONPlaceholder에서 데이터를 가져오는 함수
async function fetchPosts() {
  const response = await fetch("../db.json");
  posts = await response.json();
  console.log(posts);
  displayPosts();
}

// 데이터를 화면에 보여주는 함수
function displayPosts() {
  const container = document.getElementById("product-container");
  const start = (currentPage - 1) * postsPerPage;
  const end = currentPage * postsPerPage;
  const currentPosts = posts.slice(start, end);

  currentPosts.forEach((post) => {
    const postElement = document.createElement("li");
    postElement.classList.add("show", "hidden");
    postElement.innerHTML = `
      <img src="/imgs/${post.productImgFileName}" />
      <div>
        <h2>${post.productName}</h2>
        <p>${post.productPrice}</p>

        <button id="cart-${post.id}" class="addCartBtn">Cart</button>
        <button id="order-${post.id}" class="orderBtn">Order</button>
      </div>
    `;
    container.appendChild(postElement);
    // hidden 추가했다가 바로 삭제하면서 opacity 애니메이션 적용되게끔
    setTimeout(() => {
      postElement.classList.remove("hidden");
    }, 100);
  });

  // 현재 페이지를 증가시킴
  currentPage++;
  // Intersection Observer를 설정
  setObserver();
}

// Intersection Observer를 설정하는 함수
function setObserver() {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  // ✅ 이 observer는 마지막 포스트 요소가 화면에 보여질 때 데이터를 가져옴
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // entry가 화면에 보여지는 상태이기 때문에 unobserve()를 통해 관찰을 멈춤
        observer.unobserve(entry.target);
        // 현재 페이지가 전체 페이지 수보다 작거나 같을 때만 데이터를 가져옴
        // 전체 페이지 수 = 전체 데이터 개수 / 한 페이지에 보여줄 데이터 수
        if (currentPage <= Math.ceil(posts.length / postsPerPage)) {
          displayPosts();
        }
      }
    });
  }, options);

  // 마지막 포스트 요소를 관찰
  const lastPost = document.querySelector(".show:last-child");
  if (lastPost) {
    // ✅ 마지막 요소에만 observer를 적용했기 때문에 마지막 요소가 화면에 보여질 때만 데이터를 가져오는 것임
    observer.observe(lastPost);
  }
}

// 페이지 로드 시 데이터를 가져옴
fetchPosts();

// 이벤트 위임을 통해 버튼 클릭 인지하기
ul.addEventListener("click", (e) => {
  const productId = e.target.id.split("-").pop();

  if (e.target.className === "addCartBtn") {
    const getCartItems = JSON.parse(localStorage.getItem("cartItems"));

    let newCart = [];
    if (getCartItems) {
      newCart = [...getCartItems, posts[productId]];
    } else {
      newCart.push(posts[productId]);
    }

    localStorage.setItem("cartItems", JSON.stringify(newCart));
    e.target.disabled = true;
    return;
  }

  if (e.target.className === "orderBtn") {
    sessionStorage.setItem("orderItem", JSON.stringify(posts[productId]));
    const isConfirm = confirm(
      `${posts[productId].productName}을 주문하시겠습니까?`
    );
    if (isConfirm) location.href = "/order/index.html";
    return;
  }
});
