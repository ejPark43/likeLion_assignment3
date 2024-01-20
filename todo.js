// todo리스트 만들려면 form이 필요함. Html에 넣을것

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input"); // document 전체에서 찾기보다 toDoForm에서 찾기
// == const toDoInput = document.querySelector("#todo-form input"); // 이것과 이 위 코드는 동일
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"; // 로컬 저장소에 저장된 키 이름

let toDos = []; //새로운 todo가 생길 때마다 이 배열에 넣어줄 것임.(=push 해줄거임)

function saveToDos() {
  //localStorage.setItem("todos", toDos); // toDos 배열의 내용을 저장한다. => .setItem("key 이름", 넣을 내용)
  // 윗줄은 배열 내용을 "텍스트 "로만 저장함. 배열로 저장하려면:
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //  *** JSON.stringfy를 사용하면 로컬에 배열로 저장된다. ****
}

function deleteTodo(event) {
  //console.log(event.target); // ** 중요! 이벤트 리스너에서 어떤 버튼을 클릭했는지 모르기 때문에, 알기 위해서는 해당 이벤트의 .target을 확인해야 한다.
  // == > .target: 클릭된 Html의 엘리먼트. 어떤 버튼을 눌렀는지 확인함. 근데 어떤 버튼이 눌렸는지만 중요한게 아니라 그 버튼의 부모 엘리먼트를 알아야 한다. 그러면:
  // event.target.parentElement로 가져올 수 있음. 이때 event.target.parentElement.innerText를 사용하면 해당 내용이 뭔지도 확인 가능.

  const li = event.target.parentElement; // 가져온 엘리먼트(부모 엘리먼트)를 li 변수에 넣음
  //console.log(typeof li.id); // toDo.id 는 숫자인데, li.id 타입 확인해보면 string임. => li.id를 int로 바꿔야 밑밑에서 비교 하고 삭제가 가능함

  li.remove(); // li 내용을 삭제함 == 해당 리스트 삭제!
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // *** (toDo)는 toDos 배열 DB에 들어있는 아이템 요소 중 하나임. 이 코드의 의미는, 우리가 삭제 버튼 클릭한 id (== li.id) 를 제외한 나머지 내용을 남겨두는 것임(==해당하는 한 개만 삭제하는 것)
  saveToDos(); // 삭제했으니 변경사항 저장!!
}

function paintToDo(newTodo) {
  //여기에 이제 newTodo라는 오브젝트가 들어감
  // newTodo는 텍스트가 들어올것
  //   console.log("i will paint", newTodo); 잘 들어오는지 확인
  const list = document.createElement("li"); // li 태그를 생성함
  list.id = newTodo.id; // 투두에게 할당된 아이디를 li 태그에 넣어줌. 이 id를 통해 투두를 삭제할 것임!
  const span = document.createElement("span"); // span 태그를 생성함
  span.innerText = newTodo.text; // 사용자한테서 입력받은 newTodo에 있는 텍스트 내용을 <li>안에 <span>의 내용으로 집어넣음

  const button = document.createElement("button"); // 삭제 버튼 생성
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo); // button 클릭하면 만든 리스트 삭제하는 함수를 호출함

  list.appendChild(span); // list(li 태그)안에 span(span 태그)가 들어가게 됨
  list.appendChild(button); // 삭제 버튼 태그<button>도 li 태그 안에 들어감(span 다음)

  toDoList.appendChild(list); // 리스트 태그를 저장해둔 변수 list안의 내용은:
  //<li> <span> newTodo </span></li>이므로, 이 li 태그 내용을 toDoList(todo-list 태그)에 넣어줌
}

function handleToDoSubmit(event) {
  //
  event.preventDefault(); // 새로고침 방지
  //  console.log(toDoInput.value); // toDoInput 값 확인
  const newTodo = toDoInput.value; // value를 가져와서 newTodo라는 이름으로 저장해둠
  toDoInput.value = ""; // 칸을 빈칸으로 만들기 위해 빈칸 넣어줌

  const newTodoObj = {
    //  각각 다른 아이디를 갖는 newTodo를 오브젝트로 만들어준다.
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj); // 방금 위에서 만든 오브젝트를 push 해서 배열안에 오브젝트로 투두 가 들어가도록 함.(고유한 아이디를 갖도록)

  // toDos.push(newTodo); // paintToDo 로 새로운 투두 보내기 전에 toDos 배열에 Push해서 넣어준다! (사용자가 입력한 투두 리스트 각 내용을 바로 배열에 넣어줌 )
  // => 이제 투두를 local storage에 넣어서 저장해줘야 하는데, local storage는 "텍스트"만 저장해줌. 배열 저장할 수 없음. => saveToDos라는 저장 함수 생성하기.
  paintToDo(newTodoObj); // 입력받은 값과 할당한 랜덤 값을 paintToDO에 보냄.

  saveToDos(); // toDos 배열의 내용을 로컬저장소에 저장하는 함수.
}

toDoForm.addEventListener("submit", handleToDoSubmit);

// local storage에 저장된 내용은 문자열이라서, "["a","b","c"]" 이런 식으로 저장될것임.
// ==> 해결방법: JSON.parse(localStorage.getItem("todos")) 처럼 작성하면, 문자열로 저장되어있던 "["a","b","c"]"가 배열로 변환됨!
// ===> 이걸로 배열 가져와서 새로고침할 때 로드하고, 아이템 추가하고 등 할 수 있음
const savedToDos = localStorage.getItem(TODOS_KEY);

// **** function sayHello(item) {
//   console.log("this is the turn of", item);
// }

console.log(savedToDos);
if (savedToDos !== null) {
  // 저장된 todo 리스트 내용이 있다면:
  const parsedToDos = JSON.parse(savedToDos); // savedToDos 내용이 array가 아니라 문자열로 되어있으므로, parse 사용해서 배열로 바꿔줌
  //****  parsedToDos.forEach(sayHello); // forEach: array의 각 아이템에 대해 function을 실행함. = parsedTodos에 들어있는 (배열의) 아이템 수만큼 sayHello 함수를 호출할 것임. ==
  //혹은,
  //parsedToDos.forEach((item) => console.log("This is turn of", item)); // 이렇게도 출력 가능함. = sayHello같은 함수 따로 안만들어도 쉽게 출력 가능함 , !! arrow function !!이라고 부른다.

  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo); // paintToDo는 텍스트를 받아서 출력함...(원래 저장소에 있던 내용을 불러와서 새로고침해도 그대로 저장된 내용 보여준다.)
}

function filterItem(todo) {
  return todo.id !== 1705742310383;
}
