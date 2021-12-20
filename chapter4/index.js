export function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzantium", cost: 10, production: 9 },
      { name: "Tor", cost: 12, production: 10 },
      { name: "Roki", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}

export class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }
  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
  get name() {
    return this._name;
  }
  get producers() {
    return this._producers.slice();
  }
  get totalProduction() {
    return this._totalProduction;
  }
  set totalProduction(arg) {
    this._totalProduction = arg;
  }
  get demand() {
    return this._demand;
  }
  set demand(arg) {
    return (this._demand = parseInt(arg));
  }

  get price() {
    return this._price;
  }
  set price(arg) {
    this._price = parseInt(arg);
  }
  get shortfall() {
    return this._demand - this.totalProduction;
  }

  get profit() {
    return this.demandValue - this.demandCost;
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand() {
    return Math.min(this.demand, this.totalProduction);
  }

  // 수익계산하기
  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => b.cost - a.cost)
      .forEach((producer) => {
        const contribution = Math.min(remainingDemand, producer.production);
        remainingDemand -= amount;
        result += contribution * producer.cost;
      });
    return result;
  }
}

export class Producer {
  // 단순한 데이터 저장소
  constructor(aProvince, data) {
    this._province = aProvince;
    this._name = data.name;
    this._cost = data.cost;
    this._production = data.production || 0;
  }
  get cost() {
    return this._cost;
  }
  get name() {
    return this._name;
  }
  set cost(arg) {
    this._cost = parseInt(arg);
  }

  get production() {
    return this._production;
  }
  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province._totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}
