class Account {
  get bankCharge() {
    // 은행 이자 계산
    let result = 4.5;
    if (this._daysOverdrawn > 0) {
      result += this.overdraftCharge;
    }
    return result;
  }

  get overdraftCharge() {
    if (this.type.isPremium) {
      const baseCharge = 10;

      if (this.daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return baseCharge + (this.daysOverdrawn - 7) * 0.85;
      }
    } else {
      return this.daysOverdrawn * 1.75;
    }
  }
}

// 계좌 종류에 따라 이자 책정 알고리즘이 달라지도록 고쳐보자.
// 마이너스 통장의 초과인출 이자를 계산하는 overdraftCharge를 계좌 종류 클래스인 AccountType으로 옮기는 것이 자연스럽다.

class AccountType {
  overdraftCharge(daysOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10;

      if (daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return baseCharge + (daysOverdrawn - 7) * 0.85;
      }
    } else {
      return daysOverdrawn * 1.75;
    }
  }
}
// 메서드의 본문을 수정하여 새 메서드를 호출하도록 한다.
// 이제 원래 메서드는 위임메서드가 된다.

class Account {
  get bankCharge() {
    // 은행 이자 계산
    let result = 4.5;
    if (this._daysOverdrawn > 0) {
      result += this.overdraftCharge;
    }
    return result;
  }

  get overdraftCharge() {
    return this.type.overdraftCharge(this.daysOverdrawn);
  }
}

// overdraftCharge를 인라인한다.
class Account {
  get bankCharge() {
    // 은행 이자 계산
    let result = 4.5;
    if (this._daysOverdrawn > 0) {
      result += this.type.overdraftCharge(this.daysOverdrawn);
    }
    return result;
  }
}
