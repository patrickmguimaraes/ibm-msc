import { Component, OnInit } from '@angular/core';
import { TicketService, AuthenticationService } from 'src/_services';

const dataSource: Object[] = [{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},];

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  
  constructor(private ticketService: TicketService, private authService: AuthenticationService) { 
    
  }

  ngOnInit(): void {
    console.log(this.authService.getSession().user._id);
    this.ticketService.getAll(this.authService.getSession().user._id).subscribe(tickets => {
      console.log(tickets);
      for (let index = 0; index < tickets.length; index++) {
        const ticket = tickets[index];
        dataSource.push({ position: index + 1, name: ticket.description });
      }
    },
      error => {console.log(error);
        //this.alertService.error(error);
      });
    
}

}
