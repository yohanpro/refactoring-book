// 예를 들어 다음과 같은 변수가 있다.

let topHeader = "rename variables";

// 어떤 참조는 다음과 같이 변수를 읽기만 함

result += `<h1>${topHeader}</h1>`;

// 그런데 값을 수정하는 곳도 있음

topHeader = obj["articleHeader"];

// 이런 경우라면 변수를 캡슐화하자.

let _title = "rename variables";
function title() {
  return _title;
}

function setTitle(arg) {
  _title = arg;
}
