const headerLoginBtn = document.getElementById("headerLoginBtn");
const homeMainLoginBtn = document.getElementById("homeMainLoginBtn");

const isLogin = localStorage.getItem("isLogin");
const signupInfo = JSON.parse(localStorage.getItem("signupInfo"));

if (isLogin) {
  homeMainLoginBtn.style.display = "none";

  headerLoginBtn.textContent = "Logout";
  headerLoginBtn.href = "";

  headerLoginBtn.addEventListener("click", () => {
    localStorage.removeItem("isLogin");
    window.reload();
  });
}

const homeWelcomSpan = document.getElementById("homeWelcomSpan");
console.log(homeWelcomSpan);
if (homeWelcomSpan) {
  homeWelcomSpan.textContent = isLogin
    ? `안녕하세요👋🏻 ${signupInfo?.username || "사용자"}님!` // ?. 는 옵셔널 체이닝이라는 문법입니다.
    : `안녕하세요👋🏻 로그인 하시면 여기에 닉네임이 뜰거에요!`;
} else {
  console.warn("Element with id 'homeWelcomSpan' not found.");
}

headerLoginBtn.addEventListener("click", () => {
  localStorage.removeItem("isLogin");
  location.reload(); // 새로고침해주면서 DOM 원상 복귀 한번에
});
