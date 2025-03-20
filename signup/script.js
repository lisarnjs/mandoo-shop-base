const idInput = document.getElementById("idInput");
const pwInput = document.getElementById("pwInput");
const usernameInput = document.getElementById("usernameInput");
const signupBtn = document.getElementById("signupBtn");

let singupInfo = {
  id: "",
  pw: "",
  username: "",
  setId(value) {
    console.log(value);
    if (value.length < 6) {
      alert("아이디는 6자 이상이여야 합니다.");
      return;
    }
    this.id = value;
  },
  setPassword(value) {
    console.log(value);
    if (value.length < 8) {
      alert("비밀번호는 8자 이상이여야 합니다.");
      return;
    }
    this.pw = value;
  },
  setUsername(value) {
    console.log(value);
    this.username = value;
  },
};

idInput.addEventListener("change", (e) => {
  singupInfo.setId(e.target.value);
});

pwInput.addEventListener("change", (e) => {
  singupInfo.setPassword(e.target.value);
});

usernameInput.addEventListener("change", (e) => {
  singupInfo.setUsername(e.target.value);
});

signupBtn.addEventListener("click", () => {
  if (singupInfo.id === "") {
    alert("아이디를 입력하세요");
    idInput.focus();
    return;
  }

  if (singupInfo.pw === "") {
    alert("비밀번호를 입력하세요");
    pwInput.focus();
    return;
  }

  if (singupInfo.username === "") {
    alert("닉네임을 입력하세요");
    usernameInput.focus();
    return;
  }

  const isConfirm = confirm(
    `username: ${singupInfo.username}\nid: ${singupInfo.id}\npassword: ${singupInfo.pw}\n위 정보로 회원가입 하시겠어요?`
  );

  if (isConfirm) {
    alert("성공적으로 회원가입 완료되었습니다!");
    localStorage.setItem("signupInfo", JSON.stringify(singupInfo));
    location.href = "../login/index.html";
  } else {
    alert("회원가입에 실패하였습니다.");
  }
});
