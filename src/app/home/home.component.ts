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
  @Input() ticketDescription: string = "";
  @Input() tickets: Ticket[];

  constructor(private userService: UserService, private ticketService: TicketService, private router: Router, private authService: AuthenticationService, private alertService: AlertService) { }

  ngOnInit(): void {
    console.log(this.authService.getSession().user._id);
    this.tickets = new Array();

    this.userService.getById(this.authService.getSession().user._id)
      .subscribe(
        user => {
          //console.log(user);
          //User updated
          if (user) { this.user = user; }
        },
        error => {
          //this.alertService.error(error);
        });
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

  createTicket() {
    try {
      if (this.ticketDescription == "") {
        this.alertService.info("Please, enter a valid description.");
      }
      else {
        var ticket:Ticket = new Ticket();
        ticket.description = this.ticketDescription;
        ticket.id_user = this.user._id;

        this.ticketService.create(ticket)
          .subscribe(data => {
              this.alertService.success('The ticket was created successfully!', true);
              this.ticketDescription = "";
          },
          error => {
              this.alertService.error(error);
          });
      }
    } catch (error) {
      this.alertService.error("Sorry, the system couldn't process the information.");
    }
  }

  getTickets() {
    try {
      var ticket:Ticket = new Ticket();
        
        this.ticketService.getAll(this.user._id)
          .subscribe(tickets => {
              this.tickets = tickets;
          },
          error => {
              this.alertService.error(error);
          });
    } catch (error) {
      this.alertService.error("Sorry, the system couldn't process the information.");
    }
  }

  removeTicket(_id) {
    try {
      this.alertService.confirm("Remove Ticket", "Are you sure you want remove the ticket " + _id + "?").
        then(response => { console.log(response);
          if(response) {
            this.ticketService.delete(_id)
              .subscribe(tickets => {
                this.alertService.success("The ticket was removed successfully.");
              },
              error => {
                  this.alertService.error(error);
              });
          }
        }).catch();
    } catch (error) {
      this.alertService.error("Sorry, the system couldn't process the information.");
    }
  }
}
