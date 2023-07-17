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
            console.log(`${this.shipName} has slain ${ship.shipName}!`);
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
        console.log(`You have successfully retreated from battle. There were ${enemyShips.length} enemy ships left.`);
        gameIsOn = false
    }
}

class enemyShip extends Ship{
    constructor(shipName) {
        super(shipName);
        this.hull = Math.floor(Math.random() * 4) + 9;//should be 3
        this.firepower = Math.floor(Math.random() * 3) + 2;
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
      }//create own attack method to supersede parent
}




const humanShip = new  userShip('USS General');
let gameIsOn = true

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
while (gameIsOn){
    if (enemyShips.length > 0){//checks if anymore enemy ships left, keep repeating in game loop
        const answer = prompt(`There are ${enemyShips.length} enemy ships remaining. Would you like to attack the next ship or retreat? Type "a" to attack or "r" to retreat`);
        if (answer.toLowerCase() == 'a'){
            if (humanShip.attack(enemyShips[0])){
                enemyShips.shift()
            }
            else{//if user's attack didn't kill enemy ship
                if(enemyShips[0].attack(humanShip)){//returns true is humanship dies
                    gameIsOn = false
                    console.log(`${humanShip.shipName} has fallen.`);
                    break
                }
                
            }
            console.log(enemyShips);
            // if (enemyShips[0].hull <= 0)
    }else{
        humanShip.retreat(enemyShips)
    }
    }
    else{
        console.log(`There are no more enemy ships! You win!`);
        gameIsOn = false
    }
}

prompt('GAME OVER');