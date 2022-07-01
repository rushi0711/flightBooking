import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showRoleBoard = false;
  viewAllFlights = true;
  username?: string;
  userEmail:string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userEmail = user.email;
      console.log(this.userEmail);
      
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showRoleBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
  }

  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
