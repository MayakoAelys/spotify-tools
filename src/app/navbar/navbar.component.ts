import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private _userProfile;

  @Input('userProfile')
  set userProfile(userProfile: any) {
    console.warn("userProfile setter, userProfile:", userProfile);
    this._userProfile = userProfile;
    this.updateProfile();
  };
  
  username: string;

  constructor() { }

  ngOnInit() { this.updateProfile(); }

  updateProfile() {
    console.warn("updateProfile called, userProfile: ", this._userProfile);
    console.warn('this.username: ', this.username);

    if (!this._userProfile) {
      this.username = "Anonymous";
    }
    else {
      this.username = this._userProfile.display_name;
      console.warn('this.username: ', this.username);
    }
  }
}
