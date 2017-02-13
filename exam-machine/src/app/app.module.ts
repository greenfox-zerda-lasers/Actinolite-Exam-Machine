import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { RouterModule } from '@angular/router';

import { FilterPipe } from './dashboard/mentor/exams/classfilter.pipe';
import { ActivateService } from './activate.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MentorComponent } from './dashboard/mentor/mentor.component';
import { StudentComponent } from './dashboard/student/student.component';
import { LoadingComponent } from './loading/loading.component';
import { CohortsComponent } from './dashboard/mentor/cohorts/cohorts.component';
import { ClassesComponent } from './dashboard/mentor/classes/classes.component';
import { StudentsComponent } from './dashboard/mentor/students/students.component';
import { ExamsComponent } from './dashboard/mentor/exams/exams.component';
import { UnassignedComponent } from './dashboard/mentor/unassigned/unassigned.component';
import { ExamstartComponent } from './dashboard/student/examstart/examstart.component';
import { ArchiveComponent } from './dashboard/mentor/archive/archive.component';
import { ResultComponent } from './dashboard/mentor/result/result.component';
import { PastexamsComponent } from './dashboard/student/pastexams/pastexams.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MentorComponent,
    StudentComponent,
    LoadingComponent,
    CohortsComponent,
    ClassesComponent,
    StudentsComponent,
    ExamsComponent,
    UnassignedComponent,
    ExamstartComponent,
    FilterPipe,
    ArchiveComponent,
    ResultComponent,
    PastexamsComponent
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
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'mentor', component: MentorComponent, children: [
            { path: '', redirectTo: 'mentor', pathMatch: 'full' },
            { path: 'cohorts', component: CohortsComponent },
            { path: 'classes', component: ClassesComponent },
            { path: 'students', component: StudentsComponent },
            { path: 'exams', component: ExamsComponent },
            { path: 'result', component: ResultComponent },
            { path: 'archive', component: ArchiveComponent },
          ]},
          { path: 'student', component: StudentComponent, children: [
            { path: '', redirectTo: 'student', pathMatch: 'full' },
            { path: 'examstart', component: ExamstartComponent },
            { path: 'pastexams', component: PastexamsComponent }
          ]}
//        { path: 'unassigned', component: UnassignedComponent },
          // { path: '**', component: PagenotfoundComponent }
        ],
      }
    ])
  ],
  entryComponents: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
