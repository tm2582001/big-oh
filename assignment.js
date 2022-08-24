class Fuel {
  constructor(name) {
    this.name = name;
    this.price = null;
  }

  setPrice(value) {
    this.price = value;
  }
}

class Vehicle {
  constructor(fuelType,manufactured) {
    this.fuelType = fuelType;
    this.manufactured = manufactured
    this.purchaseDetails = {
      date: "",
      place: "",
      preOwned: false,
      owner: "",
    };
    this.isImported= false;
  }

  purchase = (date, owner, place, preOwned = false)=> {
    if (this.purchaseDetails.owner) {
      preOwned = true;
      this.purchaseDetails.owner.removeVehicle(this);
    }

    if (place !== this.manufactured) {
      this.isImported = true;
    }
    
    owner.addNewVehicle(this);
    
    const prevDetail = this.purchaseDetails;
    this.purchaseDetails = { ...prevDetail, date, place, preOwned, owner };
  }
}

class Car extends Vehicle {
  constructor(brand, color, fuelType,manufactured) {
    super(fuelType,manufactured);
    this.brand = brand;
    this.color = color;
  }
}

class Bike extends Vehicle {
  constructor(brand, color, fuelType,manufactured) {
    super(fuelType,manufactured);
    this.brand = brand;
    this.color = color;
  }
}

class Person {
  constructor(name, country) {
    this.name = name;
    this.country = country;
    this.personalVehicles = [];
  }

  addNewVehicle =(vehicle) =>{
    this.personalVehicles.push(vehicle);
  }

  removeVehicle =(soldVehicle)=> {
    this.personalVehicles = this.personalVehicles.filter(
      (vehicle) => vehicle !== soldVehicle
    );
  }
}

const diesel = new Fuel('Diesel');
diesel.setPrice(90.56);

const petrol = new Fuel('Petrol');
petrol.setPrice(98.24);

// tushar purchase new dugati bike
const tushar = new Person("Tushar", "United States of America");
const dugati = new Bike("Dugati", "red", petrol,"India");
const time = new Date().toLocaleDateString();
dugati.purchase(time, tushar, "United States of America");

// original owner of dugati
// console.log(tushar.personalVehicles[0].purchaseDetails,"Tushar");


// sourav purchased new Honda Acoord
const sourav = new Person("Sourav", "India");
const hondaAcoord = new Car("Honda Acoord", "White", diesel,"India");
const newTime = new Date().toLocaleDateString();
hondaAcoord.purchase(newTime, sourav, "India");

// honda Acoord
// console.log(sourav.personalVehicles[0].purchaseDetails,"Sourav");

// sourav puchase old dugati
dugati.purchase(newTime, sourav,"India");

// after selling dugati
// console.log(tushar.personalVehicles,'Tushar');
sourav.personalVehicles.forEach((vehicle) => console.log(vehicle));

