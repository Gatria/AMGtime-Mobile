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
import { StatusboardComponent } from '../statusboard/statusboard.component';



export const routes: Routes = [
 
{ path: 'toEmp', component: LoginComponent },
{ path: 'toUser', component: LoginComponent },  
{ path: 'login', component: LoginComponent },
{ path: 'logout', component: LoginComponent, canActivate: [AuthguardService] },
{ path: 'passwordreset', component: PasswordresetComponent  },
{ path: 'settings', component:  SettingsComponent },
{ path: '', component:   HomescreenComponent, canActivate: [AuthguardService] },
{ path: 'timecard', component:   TimecardComponent, canActivate: [AuthguardService] },
{ path: 'benefit', component:   BenefitsComponent, canActivate: [AuthguardService] },
{ path: 'schedule', component:   ScheduleComponent , canActivate: [AuthguardService] },
{ path: 'timeoff', component: TimeoffComponent, canActivate: [AuthguardService] },
{ path: 'camera', component: CameraComponent, canActivate: [AuthguardService] }
,
{ path: 'usigned', component: USignedComponent, canActivate: [AuthguardService] }
,
{ path: 'statusboard', component: StatusboardComponent, canActivate: [AuthguardService] },
 
 {path: '**', redirectTo: 'https://yyyy.gg'}
];


 
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthguardService]
})

export class AppRouterModule { }



