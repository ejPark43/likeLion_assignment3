const API_KEY = "277a5b2fb72db24e5c7f20417d28fff1"; // 날씨 알려주는 사이트 API 키

function onGeoOk(position) {
  const lat = position.coords.latitude; // 위도
  const lon = position.coords.longitude; // 경도
  console.log("You live in ", lat, lon);

  /* javascript에서 url 부름 */
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector("#weather span:first-child"); // 날씨 받아서 html에 저장할 변수
      const weather = document.querySelector("#weather span:last-child"); // 도시 받아서 html에 저장할 변수

      city.innerText = "- " + data.name + " -"; // innertext로 써줌.
      weather.innerText = `${data.weather[0].main} , ${data.main.temp}°C`; // innerText로 써줌
    }); // javascript가 이 url을 부름(Fetch만 함)
}
function onGeoError() {
  alert("Can't find you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); // 지금 위치를 알려줌!
// 함수 괄호 안 내용은 getCurrentPosition(성공했을 때 실행할 함수, 실패했을 때 실해할 함수)이다.

// 유저의 위치 알수 있음.
