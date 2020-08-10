import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { trigger, animate, transition, style, query } from '@angular/animations';

export const fadeAnimation =

    trigger('fadeAnimation', [

        transition( '* => *', [

            query(':enter',
                [
                    style({ opacity: 0,filter: "blur(2px)"})
                ],
                { optional: true }
            ),

            query(':leave',
                [
                    style({ opacity: 1 }),
                    animate('0.5s', style({ opacity: 0,filter: "blur(2px)" }))
                ],
                { optional: true }
            ),

            query(':enter',
                [
                    style({ opacity: 0 }),
                    animate('0.5s', style({ opacity: 1,filter: "blur(0)"}))
                ],
                { optional: true }
            )

        ])

    ]);


@Component({
  selector: 'my-app',
  animations: [fadeAnimation],
  template: "<main [@fadeAnimation]='getRouterOutletState(o)'><router-outlet #o='outlet'></router-outlet></main><app-footer></app-footer>"
})
export class AppComponent  {
  name = 'AMG';
   constructor ( public metaService: Meta) {


this.metaService.updateTag({
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1.0, user-scalable=no'
      }, 'name=viewport');

   }

   public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
