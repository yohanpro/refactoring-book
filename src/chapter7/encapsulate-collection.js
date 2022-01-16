class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses;
  }

  set courses(aList) {
    this._courses = aList;
  }
}

class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }
  get name() {
    return this._name;
  }
  get isAdvanced() {
    return this._isAdvanced;
  }
}

// 사용
numAdvanceCourses = aPerson.courses.filter(
  (course) => course.isAdvanced
).length;

// 모든 필드가 접근자 메소드로 보호받고 있으니, 데이터를 캡슐화했다고 생각하기 쉬우나,
// 세터를 이용해 course 컬렉션을 통째로 설정한 클라이언트는 마음대로 컬렉션을 수정할 수 있다.

const basicCoursesNames = readBasicCourseNames(filename);
aPerson.courses = basicCoursesNames.map((name) => new Course(name, false));

// 따라서 아래와 같은 방법으로 만드는 것이 좋다.
// 위에서 만든 Person에다가 수업을 하나씩 추가하고 제거하는 메서드를 추가하자.

class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
  addCourses(aCourse) {
    this._courses.push(aCourse);
  }
  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) {
      fnIfAbsent();
    } else this._courses.splice(index, 1);
  }
}

// 사용
for (const name of readBasicCourseNames(filename)) {
  aPerson.addCourses(new Course(name, false));
}

aPerson.addCourses(
  readBasicCourseNames(filename).map((name) => new Course(name, false))
);
// 이렇게 개별 원소를 추가, 제거하는 메소드가 있기 때문에 setCourses를 사용할 이유가 없으니 제거한다.
// 세터를 제공해야 할 특별한 이유가 있다면 인수로 받은 컬렉션의 복제본을 필드에 저장하게 한다.

class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList.slice(); // 복제본을 만든다.
  }
  addCourses(aCourse) {
    this._courses.push(aCourse);
  }
  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) {
      fnIfAbsent();
    } else this._courses.splice(index, 1);
  }
}

// 여기에다가 이 메소드를 사용하지 않고서는 아무도 목록을 변경할 수 없게 만들고 싶다.
// 따라서 위에다가 이렇게 복제본을 제공하게 한다.

class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses.slice(); // 복제본만 제공
  }
  set courses(aList) {
    this._courses = aList.slice();
  }
  addCourses(aCourse) {
    this._courses.push(aCourse);
  }
  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) {
      fnIfAbsent();
    } else this._courses.splice(index, 1);
  }
}

// 컬렉션을 다룰때는 어느정도 강박증을 갖고 불필요한 복제본을 만드는 편이 낫다.
// 다른 언어들은 컬렉션을 수정하는 연산들이 기본적으로 복제본을 만들지만, 자바스크립트는 배열을 정렬할때 원본을 수정한다.
// 컬렉션 관리를 책임진다면 항상 복제본만 제공해야 한다.
