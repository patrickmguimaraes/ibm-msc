import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/_services/alert.service';
import { appConfig } from '../app.config';
import * as CryptoJS from 'crypto-js';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class LoginComponent implements OnInit {
  @Input() email: String = "";
  @Input() password: String = "";
  loading = false;
  returnUrl: string;

  constructor(private authService: AuthenticationService, private alertService: AlertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // reset login status
    this.authService.logout(false);

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    try {
      if (!this.email || this.email == "" || this.email.search("@") <= 0) {
        this.alertService.info("Please, enter a valid e-mail.");
      }
      else if (!this.password || this.password == "") {
        this.alertService.info("Please, enter a valid password.");
      }
      else {
        this.loading = true;
  
        //Function uses to encrypt a password usind the same password (only the user knows)
        var passwordEncrypted = CryptoJS.HmacSHA1(this.password, this.password).toString();
  
        this.authService.login(this.email, passwordEncrypted)
          .subscribe(
            user => {
              this.router.navigate([this.returnUrl]);
              //window.open(this.returnUrl, '_self');
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
      }
    } catch (error) {
      this.alertService.error("Sorry, the system couldn't process the information.");
      this.loading = false;
    }
  }

  getApiUrl() {
    return appConfig.apiUrl;
  }
}
