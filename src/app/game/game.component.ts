import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  currentCard: string = '';
  cardPicked = false;
  constructor(public dialog: MatDialog) {
    this.game = new Game();
    console.log(this.game.currentPlayer);
  }

  ngOnInit(): void {}

  takeCard() {
    this.placeCard();
    this.finishMove();
  }

  placeCard() {
    if (!this.cardPicked) {
      let cardFace = this.game.stack.pop();
      if (cardFace) {
        this.currentCard = cardFace;
      } else {
        console.log('No more cards in stack');
      }
      this.cardPicked = true;
    }
  }

  finishMove() {
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.cardPicked = false;
      this.nextPlayer();
    }, 700);
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
    console.log(this.game.currentPlayer);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }
}
