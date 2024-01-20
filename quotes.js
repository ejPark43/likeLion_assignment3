const quotes = [
  {
    quote:
      "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein",
  },
  {
    quote: "No one can make you feel inferior without your consent.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "J. R. R Tolkein",
  },
  {
    quote: "Do not let making a living prevent you from making a life.",
    author: "John Wooden",
  },
  {
    quote: "Life is either a daring adventure or nothing.",
    author: "Helen Keller",
  },
  {
    quote: "The time is always right to do what is right.",
    author: "Martin Luther King, Jr.",
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    quote: "If you fell down yesterday, stand up today.",
    author: "H.G. Wells",
  },
  {
    quote: "Never regret anything that made you smile.",
    author: "Mark Twain",
  },
];

const quote = document.querySelector("#quote span:first-child"); // quote는 맨 처음 나오는 span으로,
const author = document.querySelector("#quote span:last-child"); // author은 맨 마지막에 나오는 span으로 만들어뒀기 때문에 first-child last-child로 가능.

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)]; // quotes 배열에 들어가 있는 내용 개수대로 곱해서 랜덤하게 나오도록. 예: 배열에 든게 10개면 .0 .1 .2 .3 .. .9 까지 내용이 0, 1,2,3,...9까지 됨.

quote.innerText = `${todaysQuote.quote}`;
author.innerText = `${todaysQuote.author}`;
