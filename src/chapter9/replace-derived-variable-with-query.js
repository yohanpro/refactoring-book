const { assert } = require("console");

class ProductionPlan {
  get production() {
    return this._production;
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

/**
 * 위 코드에서는 데이터 중복이 보기 흉하다. 이 코드는 조정 값 adjustment를 적용하는 과정에서 직접 관련이 없는
 * 누적값인 Production까지 갱신했다.
 * 그런데 이 누적값은 매번 갱신하지 않고도 계산할 수 있을 것 같다. assertion을 사용해서 검증해보자.
 */

class ProductionPlan {
  get production() {
    assert(this._production === this.calculatedProduction);
    return this._production;
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }

  get calculatedProduction() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
}

// 어서션을 테스트해본후 실패하지 않으면 필드를 반환하던 코드를 수정하여 계산 결과를 직접 반환하도록 한다.

class ProductionPlan {
  get production() {
    return this.calculatedProduction;
  }
  get calculatedProduction() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
}
// 그후 인라인해버린다.

class ProductionPlan {
  get production() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
}
// 옛 변수를 참조하는 모든 코드를 정리한다.
