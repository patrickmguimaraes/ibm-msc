import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/_model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, UserService } from 'src/_services';
import * as CryptoJS from 'crypto-js';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
 
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class CreateAccountComponent implements OnInit {
  @Input() user: User;
  @Input() password: String = "";
  @Input() passwordConfirmed: String = "";
  loading = false;
  
  constructor(private router: Router, private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.user = new User();
  }

  create() {
    try {
      if (!this.user.name || this.user.name == "") {
        this.alertService.info("Please, enter a valid name.");
      }
      else if (!this.user.email || this.user.email == "" || this.user.email.search("@") <= 0) {
        this.alertService.info("Please, enter a valid e-mail.");
      }
      else if (!this.password || this.password == "" || this.passwordConfirmed=="") {
        this.alertService.info("Please, enter a valid password.");
      }
      else if(this.passwordConfirmed!=this.password) {
        this.alertService.info("The password is not confirmed.");
      }
      else {
        this.loading = true;

        //Function encrypts a password usind the same password (only the user knows)
        this.user.password = CryptoJS.HmacSHA1(this.password, this.password).toString();
    
        this.userService.create(this.user)
          .subscribe(data => {
              this.alertService.success('The user was created successfuly!', true);
              this.router.navigate(["/login"]);
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
}
