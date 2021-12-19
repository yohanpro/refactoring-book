function sampleProvinceData() {
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

class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc._demand;
    this._price = doc._price;
    doc._producers.forEach((d) =>
      this.addProducer(new this._producers(this, d))
    );
  }

  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
}
