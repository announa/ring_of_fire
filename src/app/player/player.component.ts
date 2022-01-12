import { Component, Input, OnInit } from '@angular/core';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog } from '@angular/material/dialog';

import { Game } from '../models/game';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { DatabaseSaveService } from '../database-save.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() game!: Game;
  @Input() gameId: string = '';

  constructor(public dialog: MatDialog, private saveToDb: DatabaseSaveService) {}

  ngOnInit(): void {}

  editPlayer(playerId: number) {
    console.log('edit Player ' + playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('Player ' + playerId + ' edited: ' + change);
      this.game.players[playerId].image = change;
      this.saveToDb.saveGameToDataBase(this.gameId, this.game);
    });
  }
}
