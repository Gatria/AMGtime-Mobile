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
import { AllMaterialModule} from './material-module';
import { EmpphotoiconComponent } from './empphotoicon/empphotoicon.component';
import { TimecardComponent } from './timecard/timecard.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TimeoffComponent } from './timeoff/timeoff.component';
import { MatSidenavComponent } from './mat-sidenav/mat-sidenav.component';
import { WebcamModule} from 'ngx-webcam';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { SettingsComponent } from './settings/settings.component';
import { ComplogoComponent } from './complogo/complogo.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { USignedComponent,SignitureComponent } from './usigned/usigned.component';
import { StatusboardComponent } from './statusboard/statusboard.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
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
import { SliderDirective } from './slider.directive';
import { EnterValueDialogComponent } from './entervalue-dialog/entervalue-dialog.component';
import { AuthguardService } from './router/authguard.service';
import { Routes, RouterModule} from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';





declare global {
interface Date {
    f1(): string;
    week1(): string;
    month1():string;
    adjust(a:any):Date;
}


}

// Add the implementation
Date.prototype.week1 = function () {
const firstDay = new Date(this)
firstDay.setDate(this.getDate() - this.getDay()+1)
const lastDay = new Date(firstDay)
lastDay.setDate(firstDay.getDate() +6)
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

Date.prototype.adjust = function (a) {

if (a==0) return this
if (a==1) {this.setDate(this.getDate() - this.getDay()+1); return this }
if (a==2) return new Date(this.getFullYear(), this.getMonth(), 1)
}

export const routes: Routes = [
 { path: 'test', component: ChooseemployeeComponent},
{ path: 'toEmp', component: LoginComponent },
{ path: 'toUser', component: LoginComponent },
{ path: 'login', component: LoginComponent },
{ path: 'logout', component: LoginComponent, canActivate: [AuthguardService] },
{ path: 'passwordreset', component: PasswordresetComponent, canActivate: [AuthguardService]  },
{ path: 'passwordreset1', component: PasswordresetComponent},
{ path: 'settings', component:  SettingsComponent },
{ path: 'home', component:   HomescreenComponent, canActivate: [AuthguardService] },
{ path: '', component:   HomescreenComponent, canActivate: [AuthguardService] },
{ path: 'timecard', component:   TimecardComponent, canActivate: [AuthguardService] },
{ path: 'benefit', component:   BenefitsComponent, canActivate: [AuthguardService] },
{ path: 'schedule', component:   ScheduleComponent , canActivate: [AuthguardService] },
{ path: 'timeoff', component: TimeoffComponent, canActivate: [AuthguardService] },
{ path: 'camera', component: CameraComponent},
{ path: 'usigned', component: USignedComponent, canActivate: [AuthguardService] },
{ path: 'punchanalysis', component:  PunchanalysisComponent, canActivate: [AuthguardService] },
{ path: 'statusboard', component: StatusboardComponent, canActivate: [AuthguardService] }
,
{ path: 'openshift', component: OpenshiftComponent, canActivate: [AuthguardService] }
,
{ path: 'shiftrequest', component:  ShiftrequestComponent, canActivate: [AuthguardService] }
,
{ path: 'tracking', component:  TrackingComponent , canActivate: [AuthguardService] }
,
{ path: 'timeoffuser', component:  TimeoffuserComponent , canActivate: [AuthguardService] },
{ path: 'latecomers', component:  LatecomersComponent , canActivate: [AuthguardService] }
,
{ path: 'attendance', component:  AttendanceComponent , canActivate: [AuthguardService] }
,
{ path: 'userpunch', component: UserpunchComponent , canActivate: [AuthguardService] }
];



@NgModule({
exports: [RouterModule],
    imports:      [   AngularFireModule.initializeApp(
      {apiKey: "AIzaSyC2pp4xXSu7FXOt0f6erUTkK4wTKDNizpk",
      authDomain: "amgtime-d6fdf.firebaseapp.com",
      databaseURL: "https://amgtime-d6fdf.firebaseio.com",
      projectId: "amgtime-d6fdf",
      storageBucket: "amgtime-d6fdf.appspot.com",
      messagingSenderId: "834178252655",
      appId: "1:834178252655:web:aade5e5fa22fd0a6eab29a"
    }),
    AngularFireMessagingModule,RouterModule.forRoot(routes),SignaturePadModule ,WebcamModule,AllMaterialModule, HttpClientModule ,BrowserAnimationsModule, BrowserModule, FormsModule,StorageServiceModule,NgxChartsModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5wbecefqYqGVuEsW4erTBOCqXPqthrIc'
    }), ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production })],
  declarations: [ AppComponent, CameraComponent, LoginComponent, HomescreenComponent, EmpphotoiconComponent, TimecardComponent, BenefitsComponent, ScheduleComponent, TimeoffComponent, MatSidenavComponent, PasswordresetComponent, SettingsComponent, ComplogoComponent,  ConfirmDialogComponent, USignedComponent,SignitureComponent, StatusboardComponent, FooterComponent,ChooseemployeeComponent, PunchanalysisComponent, DatechooserComponent, OpenshiftComponent, ShiftrequestComponent, TrackingComponent, TimeoffuserComponent, LatecomersComponent, AttendanceComponent, UserpunchComponent, SubtimecardComponent, EmptyPipe, SliderDirective, EnterValueDialogComponent],
  bootstrap:    [ AppComponent ],
  providers: [BackendService,AuthguardService,StorageServiceModule],
                entryComponents: [SignitureComponent,ConfirmDialogComponent,EnterValueDialogComponent]


})
export class AppModule { }
export class AppRouterModule { }
