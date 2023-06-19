import { Component, OnInit, inject } from "@angular/core";
import { Game } from "src/models/game";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddPlayerComponent } from "../dialog-add-player/dialog-add-player.component";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  game: Game = new Game();
  currentCard: string = ``;
  firestore: Firestore = inject(Firestore);
  game$: Observable<any>; // Observable -> Bekommt ein Update bei Änderung

  constructor(public dialog: MatDialog) {
    const itemCollection = collection(this.firestore, "games");
    this.game$ = collectionData(itemCollection);
    console.log(this.game$);
  }

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
      if (name) {
        this.game.players.push(name);
      }
    });
  }
}
