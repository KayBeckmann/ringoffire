import { Component, inject } from "@angular/core";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Game } from "src/models/game";

@Component({
  selector: "app-start-screen",
  templateUrl: "./start-screen.component.html",
  styleUrls: ["./start-screen.component.scss"]
})
export class StartScreenComponent {
  game: Game = new Game();
  firestore: Firestore = inject(Firestore);
  gameCollection = collection(this.firestore, `games`);
  constructor(private router: Router) {}

  async newGame() {
    const docRef: any = await addDoc(
      this.gameCollection,
      this.game.toJson()
    ).then((gameInfo: any) => {
      let URL = "/game/" + gameInfo.id;
      this.router.navigateByUrl(URL);
    });
  }
}
