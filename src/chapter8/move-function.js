// GPS 추적기록의 총 거리 계산

function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace,
  };

  function calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;
  }
  function distance(p1, p2) {} // 두 지점 거리계산
  function radians(degress) {} // 라디안 값으로 변환
  function calculateTime() {} // 총 시간 계산
}

// 중첩으로 되어있는 calcuateDistance를 최상위로 옮기고 싶음.

function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace,
  };

  function calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;
  }
  function distance(p1, p2) {} // 두 지점 거리계산
  function radians(degress) {} // 라디안 값으로 변환
  function calculateTime() {} // 총 시간 계산
}

function top_calculateDistance(points) {
  // 최상위로 옮긴 후 , 임시 이름을 지어줌 points를 매개변수로 넘김
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;
}

// 임시로 지어주고, 지금 정의되지 않은 distance와 points를 사용하고 있다.

// distance도 똑같이 처리가 가능하지만, calculateDistance와 함께 처리해버리는게 좋다.

//distance 내부

function distance(p1, p2) {
  const EARTH_RADIUS = 3959;
  const dLat = radians(p2.latitude - p1.latitude);
  const dLon = radians(p2.longitude - p1.longitude);
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(radians(p1.latitude)) *
      Math.cos(radians(p2.latitude)) *
      Math.pow(Math.sin(dLon / 2), 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
}

function radians(degrees) {
  return (degrees * Math.PI) / 180;
}

// distance는 radians만 사용하며, radians는 현재 어떤 컨텍스트에 있는 것도 사용하지 않는다.
// 따라서 두 함수를 매개변수로 넘기기보다 함께 옮겨버리는게 낫다.
// 현재 컨텍스트에서 이 함수들을 calculateDistance 함수 안으로 옮긴다.

function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace,
  };

  function calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;

    function distance(p1, p2) {} //calculateDistance 내부안으로 옮겼음
    function radians(degress) {} //calculateDistance 내부안으로 옮겼음
  }
  function calculateTime() {}
}

// 이렇게 하고 정적분석과 테스트를 통해 어딘가에서 문제가 있는지 검사해본다.
// 같은 내용을 임시함수에도 옮겨준다.

function top_calculateDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;
  function distance(p1, p2) {}
  function radians(degress) {}
}

// calculateDistance를 에서 top_calculateDistance를 호출하도록 한다.

function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace,
  };

  function calculateDistance() {
    top_calculateDistance(points);
  }
}

// 이제 호출하는 부분을 임시함수로 변경하고, 기존에 있던 함수는 제거해버린다.
function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = top_calculateDistance(points);
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace,
  };

  // function calculateDistance() { //제거
  //   top_calculateDistance(points);
  // }
}
// 적절한 이름을 지어준다. totalDistance가 적당하지만 tracksummary안에서 사용하고 있으므로 변수 인라인하기6.4절로 해결한다.
function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);

  return {
    time: totalTime,
    distance: totalDistance(points),
    pace,
  };
}

// distance와 radians도 어떤 것에도 의존하지 않으니 최상위로 옮긴다.
