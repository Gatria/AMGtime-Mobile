import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-mat-sidenav',
  templateUrl: './mat-sidenav.component.html',
  styleUrls: ['./mat-sidenav.component.css'],
})
export class MatSidenavComponent {
  constructor(public bksvc: BackendService) {}
  toggle() {
    document.getElementById('mmm').classList.toggle('hide');
  }
}
