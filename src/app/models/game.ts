export class Game {
  stack: string[] = [];
  playedCards: string[] = [];
  players: string[] = [];
  /* players: {name: string, image: string}[] = []; */
  currentPlayer: number = 0;

  constructor() {
    this.fillStack();
    shuffle(this.stack);
    /* this.setPlayers(); */
    console.log(this)
  }

  fillStack() {
    for (let i = 1; i < 14; i++) {
      this.stack.push(`ace_${i}`);
      this.stack.push(`clubs_${i}`);
      this.stack.push(`diamonds_${i}`);
      this.stack.push(`hearts_${i}`);
    }
  }
} 

function shuffle(array: string[]) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
