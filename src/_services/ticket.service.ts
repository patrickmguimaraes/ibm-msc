import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../app/app.config';
import { Ticket } from '../_model';

@Injectable()
export class TicketService {
    constructor(private http: HttpClient) { }
 
    getAll(_id: string) {
        return this.http.get<Ticket[]>(appConfig.apiUrl + '/ticket/' + _id);
    }
    
    create(ticket: Ticket) {
        return this.http.post<Ticket>(appConfig.apiUrl + '/ticket/create', ticket);
    }

    update(ticket: Ticket) {
        return this.http.put(appConfig.apiUrl + '/ticket/' + ticket._id, ticket);
    }

    delete(_id: number) {
        return this.http.delete(appConfig.apiUrl + '/ticket/' + _id);
    }
}