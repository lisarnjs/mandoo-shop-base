const loginIdInput = document.getElementById("loginIdInput");
const loginPasswordInput = document.getElementById("loginPasswordInput");
const loginBtn = document.getElementById("loginBtn");

const signupInfo = JSON.parse(localStorage.getItem("signupInfo"));

if (!signupInfo) {
  alert("회원가입 정보가 없습니다. 회원가입을 먼저 진행해주세요.");
  location.href = "/signup/index.html";
}

let loginId = "";
let loginPw = "";

loginIdInput.addEventListener("change", (e) => {
  loginId = e.target.value;
});

loginPasswordInput.addEventListener("change", (e) => {
  loginPw = e.target.value;
});

loginBtn.addEventListener("click", () => {
  console.log(loginId, loginPw);
  if (loginId === "" || loginPw === "") {
    alert("아이디/비밀번호를 입력하세요");
    return;
  }
  if (loginId !== "" && loginId !== signupInfo.id) {
    alert("아이디가 일치하지 않습니다");
    loginIdInput.focus();
    return;
  }
  if (loginPw !== "" && loginPw !== signupInfo.pw) {
    alert("비밀번호가 일치하지 않습니다");
    loginPasswordInput.focus();
    return;
  }

  localStorage.setItem("isLogin", true);
  alert("로그인 성공!");
  location.href = "/index.html";
});
