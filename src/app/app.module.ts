import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent} from './login/login.component';
import { BackendService } from './backend.service';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { AppRouterModule } from './router/router.module';
import { AllMaterialModule} from './material-module';
import { EmpphotoiconComponent } from './empphotoicon/empphotoicon.component';
import { TimecardComponent } from './timecard/timecard.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TimeoffComponent } from './timeoff/timeoff.component';
import { MatSidenavComponent } from './mat-sidenav/mat-sidenav.component';
import {WebcamModule} from 'ngx-webcam';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { SettingsComponent } from './settings/settings.component';
import { ComplogoComponent } from './complogo/complogo.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { USignedComponent,SignitureComponent } from './usigned/usigned.component';
import { StatusboardComponent } from './statusboard/statusboard.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { PunchdialogComponent } from './punchdialog/punchdialog.component';
import { FooterComponent } from './footer/footer.component';
import { ChooseemployeeComponent } from './chooseemployee/chooseemployee.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PunchanalysisComponent } from './punchanalysis/punchanalysis.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { DatechooserComponent } from './datechooser/datechooser.component';
import { OpenshiftComponent } from './openshift/openshift.component';
import { ShiftrequestComponent } from './shiftrequest/shiftrequest.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TimeoffuserComponent } from './timeoffuser/timeoffuser.component';
import { AgmCoreModule } from '@agm/core';
import { LatecomersComponent } from './latecomers/latecomers.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { UserpunchComponent } from './userpunch/userpunch.component';
import { SubtimecardComponent } from './timecard/subtimecard/subtimecard.component';
import { EmptyPipe } from './timecard/subtimecard/empty.pipe';

interface Date {
    f1(): number;
    week1(): string;
    month1():string;
}

// Add the implementation
Date.prototype.week1 = function () {  
const firstDay = new Date(this.getFullYear(), this.getMonth(), this.getDate() - this.getDay())
const lastDay = new Date(this.getFullYear(), this.getMonth(), firstDay.getDate() + 6);
return firstDay.toLocaleDateString(undefined,{year: 'numeric', month: 'short', day: 'numeric' })+" - "+lastDay.toLocaleDateString(undefined,{year: 'numeric', month: 'short', day: 'numeric' })   
}

Date.prototype.month1 = function () {
const firstDay = new Date(this.getFullYear(), this.getMonth(), 1);
const lastDay = new Date(this.getFullYear(), this.getMonth() + 1, 0);
return firstDay.toLocaleDateString(undefined,{year: 'numeric', month: 'short', day: 'numeric' })+" - "+lastDay.toLocaleDateString(undefined,{year: 'numeric', month: 'short', day: 'numeric' }) 
}

Date.prototype.f1 = function () {
  return this.getFullYear() + "-" +
  ("0" + (this.getMonth()+1)).slice(-2) + "-" +
  ("0" + this.getDate()).slice(-2) + " " +
  ("0" + this.getHours()).slice(-2) + ":" +
  ("0" + this.getMinutes()).slice(-2) + ":" +
  ("0" + this.getSeconds()).slice(-2)
};

@NgModule({

    imports:      [SignaturePadModule ,WebcamModule,AllMaterialModule, AppRouterModule, HttpClientModule ,BrowserAnimationsModule, BrowserModule, FormsModule,StorageServiceModule,NgxChartsModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5wbecefqYqGVuEsW4erTBOCqXPqthrIc'
    })],
  declarations: [ AppComponent, CameraComponent, LoginComponent, HomescreenComponent, EmpphotoiconComponent, TimecardComponent, BenefitsComponent, ScheduleComponent, TimeoffComponent, MatSidenavComponent, PasswordresetComponent, SettingsComponent, ComplogoComponent,  ConfirmDialogComponent, USignedComponent,SignitureComponent, StatusboardComponent, PunchdialogComponent, FooterComponent,ChooseemployeeComponent, PunchanalysisComponent, DatechooserComponent, OpenshiftComponent, ShiftrequestComponent, TrackingComponent, TimeoffuserComponent, LatecomersComponent, AttendanceComponent, UserpunchComponent, SubtimecardComponent, EmptyPipe],
  bootstrap:    [ AppComponent ],
  providers: [BackendService],
                entryComponents: [SignitureComponent,ConfirmDialogComponent,PunchdialogComponent]

               
})
export class AppModule { }
