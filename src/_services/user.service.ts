import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../app/app.config';
import { User } from '../_model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
 
    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + '/user/');
    }

    getById(_id: string) {
        return this.http.get<User>(appConfig.apiUrl + '/user/' + _id);
    }
    
    create(user: User) {
        return this.http.post<User>(appConfig.apiUrl + '/user/create', user);
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + '/user/' + user._id, user);
    }

    updatePassword(user: User, newPassword: string) {
        return this.http.put(appConfig.apiUrl + '/user/updatePassword', [user, newPassword]);
    }

    delete(_id: number) {
        return this.http.delete(appConfig.apiUrl + '/user/' + _id);
    }
}