import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-empphotoicon',
  templateUrl: './empphotoicon.component.html',
  styleUrls: ['./empphotoicon.component.css'],
})
export class EmpphotoiconComponent implements OnInit {
  @Input() name: string;
  @Input() EmpID: string;
  @Input() big = false;
  HasImage: boolean;
  Initials: any;
  constructor(public bksvc: BackendService) {}
  ngOnInit() {
    if (Array.isArray(this.bksvc.employeelist))
      this.bksvc.employeelist.some((e) => {
        if (this.EmpID == e.Id) {
          this.HasImage = e.HasImage;
          return true;
        }
      });
    else this.HasImage = true;

    if (this.HasImage && this.bksvc.empimage[this.EmpID] == undefined)
      this.getEmpPhoto(this.EmpID);
    if (this.name != undefined)
      this.Initials = this.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(-2);
  }

  getEmpPhoto(id) {
    this.bksvc.sendcommand(
      (f) => {
        if (f.size > 10) {
          var reader = new FileReader();
          reader.readAsDataURL(f);
          reader.onloadend = () => {
            this.bksvc.empimage[id] = reader.result;
          };
        }
      },
      'GetEmployeeImage',
      { id: id },
      { responseType: 'blob' as 'json' }
    );
  }
}
