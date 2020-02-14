import { Component, OnInit, Input } from '@angular/core';
import { UserService, AuthenticationService, AlertService, TicketService } from 'src/_services';
import { User, Ticket } from 'src/_model';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    slideInAnimation,
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class HomeComponent implements OnInit {
  @Input() user: User = this.authService.getSession().user;
  
  constructor(private userService: UserService, private ticketService: TicketService, private router: Router, private authService: AuthenticationService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  logout(){
    this.authService.logout(true);
  }

  isActive(page) {
    return this.router.isActive(page, true);
  }
}
