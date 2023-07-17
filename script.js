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
        this.hull = Math.floor(Math.random() * 4) + 3;//should be 3
        this.firepower = Math.floor(Math.random() * 3) + 2;
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
      }//create own attack method to supersede parent
}




let gameIsOn = true

// event listener
// attackBtn.addEventListener('click', humanShip.attack);


const enemyShips = []//instances of enemy ships
for (let i = 1; i<7; i++){
    enemyShips.push(new enemyShip(`enemyShip${i}`));
}
// console.log(enemyShips);

const accCheck= function(shipObject){
    const roll = Math.random()
    console.log(`rolling ${roll} vs accuracy ${shipObject.accuracy} for ${shipObject.shipName}`);
    if (roll<shipObject.accuracy){
        console.log(`accuracy check passed for ${shipObject.shipName}`);
        return true
    }
    else{
        console.log(`accuracy check failed for ${shipObject.shipName}`);
        return false
    }
}

// while (gameIsOn){
    //     humanShip.attack(enemyShips[0])
    //     console.log(enemyShips);
    
    // }
const uName = prompt('What is the name of your vessel?')
const humanShip = new  userShip(uName);
// while (gameIsOn){
//         if (enemyShips.length > 0){//checks if anymore enemy ships left, keep repeating in game loop
//             const answer = prompt(`There are ${enemyShips.length} enemy ships remaining. Would you like to attack the next ship or retreat? Type "a" to attack or "r" to retreat`);
//             if (answer.toLowerCase() == 'a'){
//                 //accuracy check
//                 const roll = Math.random()
//                 console.log(roll);
//                 if (roll<humanShip.accuracy){
//                     if (humanShip.attack(enemyShips[0])){
//                         enemyShips.shift()
//                     }
//                 }
//                 else{
//                         const roll2 = Math.random()
//                         console.log(`${humanShip.shipName} has missed its target!`);
//                         if (roll2<enemyShip[0].accuracy){
//                             enemyShip[0].attack(humanShip)
//                         }
//                         else{
//                             console.log(`${enemyShip[0].shipName} has missed its target!`);
//                         }
//                 }}
//             else{//if user's attack didn't kill enemy ship
//                 //accuracy check for enemy
//                 if(enemyShips[0].attack(humanShip)){//returns true is humanship dies
//                     gameIsOn = false
//                     console.log(`${humanShip.shipName} has fallen.`);
//                     break
//                 }
                
//             }
//             console.log(enemyShips);
//             // if (enemyShips[0].hull <= 0)
//     }       else{
//         humanShip.retreat(enemyShips)
//     }
//     }
    //     else{
    //         console.log(`There are no more enemy ships! You win!`);
    //         gameIsOn = false
    // }
while (gameIsOn){
    if (enemyShips.length>0){
        console.log('there are still ships');
        const answer = prompt(`There are ${enemyShips.length} enemy ships remaining. Would you like to attack the next ship or retreat? Type "a" to attack or "r" to retreat`);
        if (answer.toLowerCase() == 'a'){
            console.log('you decide to attack');
            // roll = Math.random()
            if (accCheck(humanShip)){//if acc passed, then attack
                if (humanShip.attack(enemyShips[0])){
                    console.log(`${enemyShips[0].shipName} has fallen.`);
                    enemyShips.shift()
                    console.log(`${enemyShips.length} remain`);
                }
                else{//if enemy ship not dead
                    if (accCheck(enemyShips[0])){
                        if(enemyShips[0].attack(humanShip)){
                            gameIsOn=false;
                            console.log(`${humanShip.shipName} has fallen.`);
                            break
                        }
    
                    }
                }


            }
            else{//if whiffed, enemy attacks
                if (accCheck(enemyShips[0])){
                    if(enemyShips[0].attack(humanShip)){
                        gameIsOn=false;
                        console.log(`${humanShip.shipName} has fallen.`);
                        break
                    }

                }
                // else //enemy misses acc check
            }





        }
        else{
            console.log('you decide to retreat');
            humanShip.retreat(enemyShips)
        }
    }
    else{
        console.log('There are no more ships. You win!');
        gameIsOn=false
    }
}
prompt('GAME OVER');