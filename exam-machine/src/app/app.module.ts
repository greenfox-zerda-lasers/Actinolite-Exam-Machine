import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { RouterModule } from '@angular/router';

import { FilterPipe } from './dashboard/mentor/exams/classfilter.pipe';
import { AuthGuard } from './services/auth-guard.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { SignupComponent } from './screens/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MentorComponent } from './dashboard/mentor/mentor.component';
import { StudentComponent } from './dashboard/student/student.component';
import { CohortsComponent } from './dashboard/mentor/cohorts/cohorts.component';
import { ClassesComponent } from './dashboard/mentor/classes/classes.component';
import { StudentsComponent } from './dashboard/mentor/students/students.component';
import { ExamsComponent } from './dashboard/mentor/exams/exams.component';
import { UnassignedComponent } from './dashboard/mentor/unassigned/unassigned.component';
import { ExamstartComponent } from './dashboard/student/examstart/examstart.component';
import { ArchiveComponent } from './dashboard/mentor/archive/archive.component';
import { ResultComponent } from './dashboard/mentor/result/result.component';
import { PastexamsComponent } from './dashboard/student/pastexams/pastexams.component';
import { PagenotfoundComponent } from './screens/pagenotfound/pagenotfound.component';
import { UnauthorizedComponent } from './screens/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MentorComponent,
    StudentComponent,
    CohortsComponent,
    ClassesComponent,
    StudentsComponent,
    ExamsComponent,
    UnassignedComponent,
    ExamstartComponent,
    FilterPipe,
    ArchiveComponent,
    ResultComponent,
    PastexamsComponent,
    PagenotfoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule.forChild(),
    RouterModule.forRoot([
      { path: '', component: LoginComponent},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'dashboard', component: DashboardComponent,
        children: [
          { path: '', redirectTo: 'dashboard', canActivate: [AuthGuard], pathMatch: 'full' },
          { path: 'mentor', component: MentorComponent, children: [
            { path: '', redirectTo: 'mentor', canActivateChild: [AuthGuard], pathMatch: 'full' },
            { path: 'cohorts', component: CohortsComponent },
            { path: 'classes', component: ClassesComponent },
            { path: 'roster', component: StudentsComponent },
            { path: 'exams', component: ExamsComponent },
            { path: 'result', component: ResultComponent },
            { path: 'archive', component: ArchiveComponent },
          ]},
          { path: 'student', component: StudentComponent, children: [
            { path: '', redirectTo: 'student', canActivateChild: [AuthGuard], pathMatch: 'full' },
            { path: 'start', component: ExamstartComponent },
            { path: 'previous', component: PastexamsComponent },
            // { path: 'profile', component: ProfileComponent }
          ]},
          { path: '**', component: PagenotfoundComponent }
        ],
      },
      { path: '**', component: PagenotfoundComponent },
      { path: 'unauthorized', component: UnauthorizedComponent }
    ])
  ],
  entryComponents: [
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
