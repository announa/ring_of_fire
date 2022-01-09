import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Game } from '../models/game';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log(params['id']);
      this.firestore
        .collection('games')
        .doc(params['id'])
        .valueChanges()
        .subscribe((game) => {
          console.log('DB: game: ', game);
          this.loadGameFromDataBase(game);
          })
        });
    }  

  loadGameFromDataBase(game: any){
    this.game.stack = game.stack,
    this.game.playedCards = game.playedCards,
    this.game.players = game.players,
    this.game.currentPlayer = game.currentPlayer,
    this.game.currentCard = game.currentCard,
    this.game.cardPicked = game.cardPicked
  }

  saveGameToDataBase(){
    this.firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJson())
  }

  takeCard() {
    this.placeCard();
    this.finishMove();
  }

  placeCard() {
    if (!this.game.cardPicked) {
      let cardFace = this.game.stack.pop();
      if (cardFace) {
        this.game.currentCard = cardFace;
      } else {
        console.log('No more cards in stack');
      }
      this.game.cardPicked = true;
      this.saveGameToDataBase();
    }
  }

  finishMove() {
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.cardPicked = false;
      this.nextPlayer();
      this.saveGameToDataBase();
    }, 700);
  }
  
  nextPlayer() {
    console.log(this.game.players.length)
    this.game.currentPlayer++;
    this.game.currentPlayer =
    this.game.currentPlayer % this.game.players.length;
    console.log(this.game.currentPlayer)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
        this.saveGameToDataBase();
      }
    });
  }
}
