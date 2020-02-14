import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../_directives';
//const Noty = import('noty');
import * as Noty from 'noty'

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router, private modalService: NgbModal) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    notification(tipo: any, icon: string, mensagem: string) {
        var newNoty = new Noty({
            type: tipo,
            layout: 'topRight',
            timeout: 4000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
                open: 'animated bounceInRight', // Animate.css class names
                close: 'animated bounceOutRight' // Animate.css class names
            },
            text: mensagem,
            theme: 'nest'
          });

        newNoty.show();
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.notification('success', "hs-admin-check", message);
    }
 
    error(message: string, erro = "", keepAfterNavigationChange = false) {
       this.notification('error', "hs-admin-alert", message);
    }

    info(message: string, keepAfterNavigationChange = false) {
        this.notification('info',  "hs-admin-info", message);
    }

    warning(message: string, keepAfterNavigationChange = false) {
        this.notification('warning', "hs-admin-bolt", message);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    public confirm(
        title: string,
        message: string,
        btnOkText: string = 'Yes',
        btnCancelText: string = 'No',
        dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
        const modalRef = this.modalService.open(AlertComponent, { size: dialogSize, centered:true});
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.btnOkText = btnOkText;
        modalRef.componentInstance.btnCancelText = btnCancelText;
    
        return modalRef.result;
      }
}