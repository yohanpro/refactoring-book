// 배송 추적 정보를 표현하는 클래스
class TrackingInformation {
  get shippingCompany() {
    return this._shippingCompany;
  }
  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }
  get trackingNumber() {
    return this._trackingNumber;
  }
  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

// shipment 클래스의 일부처럼 사용된다.

class Shipment {
  get trackingInfo() {
    return this._trackingInformation.display;
  }
  get trackingInformation() {
    return this._trackingInformation;
  }
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}

// 예전에는 TrackingInformatino이 유용했겠지만 더 이상 제역할을 못하므로 Shipment 클래스로 인라인해보리자.
// 우선 사용하는 곳을 찾는다.
aShipment.trackingInformation.shippingCompany = request.vendor;

// 외부에서 직접 호출하는 TrackingInformation의 메소드들을 Shipment로 옮긴다.
// 먼저 Shipment에 위임 함수를 만들고 클라이언트가 이를 호출하도록 한다.

class Shipment {
  get trackingInfo() {
    return this._trackingInformation.display;
  }
  get trackingInformation() {
    return this._trackingInformation;
  }
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
  set shippingCompany(arg) {
    this._trackingInformation.shippingCompany = arg;
  }
}

// 그럼 이렇게 바뀐다.
aShipment.shippingCompany = request.vendor;

// TrackingInformation의 모든 요소를 shipment로 옮긴다.

// 우선 보여주는 display를 인라인한다.

class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
  get trackingInformation() {
    return this._trackingInformation;
  }
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
  set shippingCompany(arg) {
    this._trackingInformation.shippingCompany = arg;
  }
}
// 배송 회사 필드도 인라인한다.
class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
  get trackingInformation() {
    return this._trackingInformation;
  }

  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
  get shippingCompany() {
    this.shippingCompany;
  }
  set shippingCompany(arg) {
    this.shippingCompany = arg;
  }
}

// 반복후 다 옮기면 TrackingInformation 클래스를 삭제한다.
class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
  get trackingNumber() {
    return this._trackingNumber;
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
  get shippingCompany() {
    this.shippingCompany;
  }
  set shippingCompany(arg) {
    this.shippingCompany = arg;
  }
}
