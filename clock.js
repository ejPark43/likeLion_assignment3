// 시계!! //
const clock = document.querySelector("h2#clock"); // h2태그의 clock이란 아이디 가진 셀렉터. 붙여서 써야..

// interval: 매번 일어나야 하는것. (예: 2초마다 일어나는 사건)

function getClock() {
  const date = new Date(); // Date object는 호출한 시점의 날짜와 시간을 알려줌. getHours, getMinutes,getSeconds 함수로 시간을 정수 숫자로 가져오게됨.
  const hours = String(date.getHours()).padStart(2, "0"); // padStart(와 padEnd)는 String에 적용하는거기 때문에
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 숫자로 받아온 시간들을 모두 string으로 바꾸고
  const seconds = String(date.getSeconds()).padStart(2, "0"); // 여기선 padStart로 2자리보다 작으면 앞에 "0"을 붙임.

  clock.innerText = `${hours}:${minutes}:${seconds}`; // innerText로 받아온 시간들 적음.
}

getClock(); // 페이지 들어오자마자 시간 보여주기 위해서 한번 먼저 호출함
setInterval(getClock, 1000); // 1초 후에 호출하기 때문에 맨 처음 1초를 기다려야 해서, 위처럼 호출 한번 해주면 시작하자마자 보여준다.
