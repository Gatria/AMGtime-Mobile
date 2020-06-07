import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent,EmployeeuserselectorComponent } from './login/login.component';
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
import { USignedComponent } from './usigned/usigned.component';
import { StatusboardComponent } from './statusboard/statusboard.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { PunchdialogComponent } from './punchdialog/punchdialog.component';
import { FooterComponent } from './footer/footer.component';
import { ChooseemployeeComponent } from './chooseemployee/chooseemployee.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({

    imports:      [WebcamModule,AllMaterialModule, AppRouterModule, HttpClientModule ,BrowserAnimationsModule, BrowserModule, FormsModule,StorageServiceModule,NgxChartsModule],
  declarations: [ AppComponent, CameraComponent, LoginComponent, HomescreenComponent, EmpphotoiconComponent, TimecardComponent, BenefitsComponent, ScheduleComponent, TimeoffComponent, MatSidenavComponent, PasswordresetComponent, SettingsComponent, ComplogoComponent, EmployeeuserselectorComponent, ConfirmDialogComponent, USignedComponent, StatusboardComponent, PunchdialogComponent, FooterComponent,ChooseemployeeComponent],
  bootstrap:    [ AppComponent ],
  providers: [BackendService],
                entryComponents: [EmployeeuserselectorComponent,ConfirmDialogComponent,PunchdialogComponent]

               
})
export class AppModule { }
