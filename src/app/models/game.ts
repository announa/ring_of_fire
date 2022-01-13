export class Game {
  currentCard: string = '';
  cardPicked = false;
  stack: string[] = [];
  playedCards: string[] = [];
  /* players: string[] = []; */
  players: {name: string, image: string}[] = [];
  profilePictures = ['female.png', 'male.jpg','cat.png', 'dog.png', 'owl.png', 'dragonfly.png', 'tiger.png', 'hummingbird.png']
  currentPlayer: number = 0;

  constructor() {
    this.fillStack();
    shuffle(this.stack);
    /* this.setPlayers(); */
    console.log(this)
  }

  public toJson(){
    return {
      stack: this.stack,
      playedCards: this.playedCards,
      players: this.players,
      currentPlayer: this.currentPlayer,
      cardPicked: this.cardPicked,
      currentCard: this.currentCard
    }
  }

  fillStack() {
    for (let i = 1; i < 2; i++) {
      this.stack.push(`ace_${i}`);
      this.stack.push(`clubs_${i}`);
      this.stack.push(`diamonds_${i}`);
      this.stack.push(`hearts_${i}`);
    }
  }

  getProfilePicture(){
    return Math.floor(Math.random()*(this.profilePictures.length - 1))
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
