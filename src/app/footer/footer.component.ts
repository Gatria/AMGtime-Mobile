import { Component } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private bksvc:BackendService) { }

}