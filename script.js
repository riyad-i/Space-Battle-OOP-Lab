const attackBtn = document.querySelector('#attack-btn');


class Ship {
    constructor(shipName) {
        this.shipName = shipName;
        this.attack = this.attack.bind(this);
        this.isAlive = true;
    }

    attack(ship) {//pass in object instance whose health to reduce
        console.log(`${this.shipName} is attacking.... ${ship.shipName}`);
        console.dir(this);
    }
}

class userShip extends Ship{
    constructor(shipName) {
        super(shipName);
        this.hull = 20;
        this.accuracy = .7
        this.firepower = 5
        
      }
}

class enemyShip extends Ship{
    constructor(shipName) {
        super(shipName);
        this.hull = Math.floor(Math.random() * 4) + 3;
        this.firepower = Math.floor(Math.random() * 3) + 2;
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
      }
}




const humanShip = new  userShip('USS General');
const gameIsOn = true

// event listener
attackBtn.addEventListener('click', humanShip.attack);


const enemyShips = []//instances of enemy ships
for (let i = 1; i<7; i++){
    enemyShips.push(new enemyShip(`enemyShip${i}`));
}
console.log(enemyShips);



