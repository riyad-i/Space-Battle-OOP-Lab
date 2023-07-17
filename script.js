console.log(`Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, on a mission to destroy every last alien ship.Battle the aliens as you try to destroy them with your lasers.There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.`);



const attackBtn = document.querySelector('#attack-btn');


class Ship {
    constructor(shipName) {
        this.shipName = shipName;
        this.attack = this.attack.bind(this);
        this.isAlive = true;
    }

    attack(ship) {//pass in object instance whose health to reduce
        console.log(`${this.shipName} is attacking.... ${ship.shipName}`);
        console.log(`${ship.shipName}'s hull is ${ship.hull}. ${this.shipName} attacks it for ${this.firepower}`);
        ship.hull -= this.firepower
        console.log(`${ship.shipName}'s hull is now ${ship.hull}`);
        if (ship.hull <= 0){
            console.log(`You have slain ${ship.shipName}!`);
            return true //returns true if ship is killed, will then use value to either end game if user's ship was destroyed, or to take slain enemy ship out of array
        }
        else{
            return false
        }
        // console.dir(this);
    }
}

class userShip extends Ship{
    constructor(shipName) {
        super(shipName);
        this.hull = 20;
        this.accuracy = .7
        this.firepower = 5
        
      }

    retreat(enemyShips){
        console.log(`You have successfully retreated from battle. There were ${enemyShips.length} left.`);
        gameIsOn = false
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



// while (gameIsOn){
//     humanShip.attack(enemyShips[0])
//     console.log(enemyShips);

// }

if (enemyShips.length > 0){//checks if anymore enemy ships left, keep repeating in game loop
    console.log(`There are ${enemyShips.length} enemy ships remaining. Would you like to attack the next ship or retreat?`);
    if (humanShip.attack(enemyShips[0])){
        enemyShips.shift()
    }
    console.log(enemyShips);
    // if (enemyShips[0].hull <= 0)
}
else{
    console.log(`There are no more enemy ships! You win!`);
}
