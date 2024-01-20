const loginForm = document.querySelector("#login-form");
const logInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";

const USERNAME_KEY = "username"; // *** 우리가 local storage에서 확인할 key값 ***. 나중에 실수하지 않기 위해 통일해서 넣을 변수 만듦

function onLoginSubmit(getInfo) {
  getInfo.preventDefault(); /// *** form을 submit하면 자동 새로고침되는 기능이 디폴트인데, 이 디폴트 기능을 막는 함수.
  loginForm.classList.add(HIDDEN_CLASSNAME); // HIDDEN_CLASSNAME을 form 태그의 클래스로 추가함(CSS파일에서 .hidden 은 안보이게 설정함), input 폼 칸 사라짐!

  const username = logInput.value; // input 값 받아옴
  localStorage.setItem(USERNAME_KEY, username);

  paintGreetings(username); //
}

function paintGreetings(username) {
  //중복되는 코드를 함수로 만들어서 사용.
  //   greeting.innerText = "hello " + username; // 받아온 유저이름을 greeting 아이디를 가진 태그의 텍스트로 넣어줌
  //   greeting.classList.remove(HIDDEN_CLASSNAME); // 숨겨져 있던 greeting 아이디 갖는 태그를 hidden 클래스를 지워줌으로써 다시 보여줌!
  greeting.innerText = "Hello " + username;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

// ******* //
const savedUserName = localStorage.getItem(USERNAME_KEY); // username이라는 로컬저장소에 만들어진 아이템을 갖고옴. 이게 null값이라면 아무것도 안 넣은 상태인 것임!
//console.log(savedUserName)으로 비어있는지 아닌지, 타입 확인 가능

if (savedUserName === null) {
  // local storage가 비어있다면 show form
  loginForm.classList.remove(HIDDEN_CLASSNAME); // hidden으로 설정한 폼을 보여주면서 input 받게 함.
  loginForm.addEventListener("submit", onLoginSubmit); // input 받으면 이벤트 전달해줌!
} else {
  // local storage가 비어있지 않다면
  paintGreetings(savedUserName);
}
