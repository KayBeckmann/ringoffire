import { Component, OnInit } from "@angular/core";
import { Game } from "src/models/game";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddPlayerComponent } from "../dialog-add-player/dialog-add-player.component";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  game: Game = new Game();
  currentCard: string = ``;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.game.currentPlayer =
          (this.game.currentPlayer + 1) % this.game.players.length;
      }, 1000);
    }
  }

  dropCard() {
    this.pickCardAnimation = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name) => {
      console.log("The dialog was closed");
      this.game.players.push(name);
    });
  }
}
