import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { CameraComponent } from '../camera/camera.component';
import { LoginComponent } from '../login/login.component';
import { HomescreenComponent } from '../homescreen/homescreen.component';
import { AuthguardService,ConfirmAction } from './authguard.service';
import { TimecardComponent } from '../timecard/timecard.component';
import { BenefitsComponent } from '../benefits/benefits.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { TimeoffComponent } from '../timeoff/timeoff.component';
import { PasswordresetComponent } from '../passwordreset/passwordreset.component';
import { SettingsComponent } from '../settings/settings.component';
import { USignedComponent } from '../usigned/usigned.component';
import { ChooseemployeeComponent } from '../chooseemployee/chooseemployee.component';
import { StatusboardComponent } from '../statusboard/statusboard.component';
import { PunchanalysisComponent } from '../punchanalysis/punchanalysis.component';
import { OpenshiftComponent } from '../openshift/openshift.component';
import { ShiftrequestComponent } from '../shiftrequest/shiftrequest.component';
import { TrackingComponent } from '../tracking/tracking.component';
import { TimeoffuserComponent } from '../timeoffuser/timeoffuser.component';
import { LatecomersComponent } from '../latecomers/latecomers.component';
import { AttendanceComponent } from '../attendance/attendance.component';



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
{ path: 'camera', component: CameraComponent, canActivate: [AuthguardService] },
{ path: 'usigned', component: USignedComponent, canActivate: [AuthguardService] },
{ path: 'punchanalysis', component:  PunchanalysisComponent, canActivate: [AuthguardService] },
{ path: 'statusboard', component: StatusboardComponent, canActivate: [AuthguardService] }
,
{ path: 'statusboard1', component: StatusboardComponent, canActivate: [AuthguardService] }
,
{ path: 'statusboard2', component: StatusboardComponent, canActivate: [AuthguardService] }
,
{ path: 'statusboard3', component: StatusboardComponent, canActivate: [AuthguardService] }
,
{ path: 'openshift', component: OpenshiftComponent, canActivate: [AuthguardService] }
,
{ path: 'shiftrequest', component:  ShiftrequestComponent, canActivate: [AuthguardService] }
,
{ path: 'tracking', component:  TrackingComponent , canActivate: [AuthguardService] }
,
{ path: 'timeoffuser', component:  TimeoffuserComponent , canActivate: [AuthguardService] },
{ path: 'timeoffuser2', component:  TimeoffuserComponent , canActivate: [AuthguardService] }
,
{ path: 'latecomers', component:  LatecomersComponent , canActivate: [AuthguardService] }
,
{ path: 'attendance', component:  AttendanceComponent , canActivate: [AuthguardService] }
];


 
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthguardService]
})

export class AppRouterModule { }



