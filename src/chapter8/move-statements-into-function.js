result.push(`<p>제목: ${person.photo.title}</p>`);
result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>위치: ${aPhoto.location}</p>``<p>날짜: ${aPhoto.date.toDateString()}</p>`,
  ];
}

// 리팩토링 적용 후

result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>제목: ${aPhoto.title}</p>`,
    `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
  ];
}

// 예시 : 사진관련 데이터를 HTML로 내보내는 코드

function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(`<p>제목: ${person.photo.title}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join("\n");
}

function photoDiv(p) {
  return ["<div>", `<p>제목: ${p.title}</p>`, emitPhotoData(p), "</div>"].join(
    "\n"
  );
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>위치: ${aPhoto.location}</p>`);
  result.push(`<p>날짜: ${aPhoto.date.toDateString()}</p>`);
  return result.join("\n");
}

// 총 두곳에서 emitPhotoData를 호출한다. 제목을 출력하는 코드를 emitPhotoData 안으로 옮겨서 중복을 없애보자.

// 한번에 하려고 하지 않는게 중요하다. 함수 추출하기를 적용해보자.

function photoDiv(p) {
  return ["<div>", zzNew(p), "</div>"].join("\n");
}

function zzNew(p) {
  return [`<p>제목: ${p.title}</p>`, emitPhotoData(p)].join("\n");
}

// 다른 호출자들도 새로운 함수를 호출하도록 변경하자.

function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(`<p>제목: ${person.photo.title}</p>`);
  result.push(zzNew(person.photo));
  return result.join("\n");
}

// 다 수정했다면 emitPhotoData를 인라인한다.

function zzNew(p) {
  return [
    `<p>제목: ${p.title}</p>`,
    `<p>위치: ${p.location}</p>`,
    `<p>날짜: ${p.date.toDateString()}</p>`,
  ].join("\n");
}

// 함수 이름을 바꿔서 마무리한다.
function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(`<p>제목: ${person.photo.title}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join("\n");
}
function photoDiv(aPhoto) {
  return ["<div>", emitPhotoData(aPhoto), "</div>"].join("\n");
}

function emitPhotoData(p) {
  return [
    `<p>제목: ${p.title}</p>`,
    `<p>위치: ${p.location}</p>`,
    `<p>날짜: ${p.date.toDateString()}</p>`,
  ].join("\n");
}
