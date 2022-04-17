import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  avatarImagePath: string = "assets/images/avatar.svg";
  constructor() {}

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    location.reload();
  }
}
