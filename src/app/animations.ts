import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
} from '@angular/animations';

export const transAnimation = animation([
    style({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
]);

// Routable animations
export const slideInAnimation =
    trigger('routeAnimations', [
       /* transition('LoginPage <=> HomePage', [
            style({ position: 'fixed' }),
            query(':enter, :leave', [
                style({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('900ms ease-out', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('900ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),*/
        transition('LoginPage <=> CreatePage', [
            style({ position: 'fixed' }),
            query(':enter, :leave', [
                style({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('900ms ease-out', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('900ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
    ]);


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/