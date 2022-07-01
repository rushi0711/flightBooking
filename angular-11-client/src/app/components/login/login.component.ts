import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  email:string;
  userRole=false;
  adminRole=false;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.email = this.tokenStorage.getUser().email;
        this.userRole = this.roles.includes('ROLE_USER');
        this.adminRole = this.roles.includes('ROLE_ADMIN');
       this.reloadPage();
        // setTimeout(() => {
        //       this.loadComponent();
        // }, 10);
        
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  loadComponent(){
    if( this.roles.includes('ROLE_USER')){
      const navigationDetails: string[] = ['/bookingHistory/'+this.email];
      this.router.navigate(navigationDetails);
    }if(this.roles.includes('ROLE_ADMIN')){
      const navigationDetails: string[] = ['/scheduledFlights'];
      this.router.navigate(navigationDetails);
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
