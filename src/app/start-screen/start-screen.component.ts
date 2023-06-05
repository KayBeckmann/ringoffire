import { Component } from "@angular/core";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-start-screen",
  templateUrl: "./start-screen.component.html",
  styleUrls: ["./start-screen.component.scss"]
})
export class StartScreenComponent {
  constructor(private router: Router) {}

  newGame() {
    this.router.navigateByUrl(`/game`);
  }
}
