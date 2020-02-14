import { Component, OnInit } from '@angular/core';
import { TicketService, AuthenticationService, AlertService } from 'src/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  dataSource: Object[] = [];
  constructor(private ticketService: TicketService, private alertService:AlertService,
    private authService: AuthenticationService, private router: Router) {

  }

  ngOnInit(): void {
    this.ticketService.getAll(this.authService.getSession().user._id).subscribe(tickets => {

      for (let index = 0; index < tickets.length; index++) {
        const ticket = tickets[index];
        this.dataSource.push({ position: index + 1, description: ticket.description });
      }
    },
      error => {
        console.log(error);
        //this.alertService.error(error);
      });

  }

  addTicket() {
    this.router.navigate(['/create-ticket']);
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
