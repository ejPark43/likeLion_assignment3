const images = [
  "SU_BeachHouse.jpeg",
  "SU_EmpireCity.jpeg",
  "SU_NightField.jpeg",
  "SU_Mountains.png",
];

const chosenImage = images[Math.floor(Math.random() * images.length)]; // 배열 숫자까지 랜덤한 숫자 나오도록 하는 코드

// console.log(chosenImage);

const bgImage = document.createElement("img"); // ** javascript에서 html에 엘리먼트를 생성하고 있음 . (img 태그) **

bgImage.src = `img/${chosenImage}`; // <img src="이미지 주소"> 처럼 코드생성됨
// console.log(bgImage);

bgImage.classList.add("bgImg");
document.body.appendChild(bgImage); // html의 body에 bgImage 코드 내용을 추가함. "append"사용

document.body.style.backgroundImage = `url(${bgImage.src})`;

// const bg = document.querySelector("img");
// bg.style.url = bgImage.src; // 이미지 주소가 나옴
// console.log("???", bgImage.src);
