import { Component, OnInit, Input } from '@angular/core';
import { AlertService, TicketService, AuthenticationService } from 'src/_services';
import { Ticket } from 'src/_model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() ticketDescription: string = "";
  
  constructor(private alertService:AlertService, private authService:AuthenticationService, private ticketService:TicketService) { }

  ngOnInit(): void {
  }


  createTicket() {
    try {
      if (this.ticketDescription == "") {
        this.alertService.info("Please, enter a valid description.");
      }
      else {
        var ticket:Ticket = new Ticket();
        ticket.description = this.ticketDescription;
        ticket.id_user = this.authService.getSession().user._id;

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
}
