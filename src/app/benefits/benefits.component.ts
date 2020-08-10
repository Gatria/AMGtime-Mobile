import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent implements OnInit {
  displayedColumns: string[] = ['Code', 'Name', 'Pending', 'Taken', 'Left'];

  constructor(public bksvc: BackendService) {}
  benefits;
  ngOnInit() {
    this.bksvc.heightadjustemnt()
    this.bksvc.sendcommand(
      (f) => {
        this.benefits = f;
      },
      'GetEmployeeBenefits',
      { id: this.bksvc.AMGSettings.Id }
    );
  }
}
