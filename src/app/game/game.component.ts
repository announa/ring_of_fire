import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Game } from '../models/game';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseSaveService } from '../database-save.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string = '';
  gameOver: boolean = false;
  addPlayerHint: boolean = false;

  constructor(
    private saveToDb: DatabaseSaveService,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
  ) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.firestore
        .collection('games')
        .doc(params['id'])
        .valueChanges()
        .subscribe((game) => {
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

  takeCard() {
    if(this.game.players.length > 0){
    this.placeCard();
    this.finishMove();
    } else{
      this.highlightHint();
    }
  }

  placeCard() {
    if (!this.game.cardPicked && !this.gameOver) {
      let cardFace = this.game.stack.pop();
      if (cardFace) {
        this.game.currentCard = cardFace;
      }
      this.game.cardPicked = true;
      this.saveToDb.saveGameToDataBase(this.gameId, this.game);
    }
    if(this.game.stack.length == 0){
      this.gameOver = true;
    }
  }

  finishMove() {
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.cardPicked = false;
      this.nextPlayer();
      this.saveToDb.saveGameToDataBase(this.gameId, this.game);
    }, 700);

  }
  
  nextPlayer() {
    console.log(this.game.players.length)
    this.game.currentPlayer++;
    this.game.currentPlayer =
    this.game.currentPlayer % this.game.players.length;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push({name: name, image: this.game.profilePictures[this.game.getProfilePicture()]});
        /* this.game.players.push(name); */
        this.saveToDb.saveGameToDataBase(this.gameId, this.game);
      }
    });
  }

  highlightHint(){
    this.addPlayerHint = true;
    setTimeout(() => {
      this.addPlayerHint = false;
    }, 2100);
  }

  onGameOverReset(gameOverReset: boolean){
    this.gameOver = gameOverReset;
  }
}
