var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './dashboard/mentor/exams/classfilter.pipe';
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
import { ResultsComponent } from './dashboard/mentor/results/results.component';
import { UnassignedComponent } from './dashboard/mentor/unassigned/unassigned.component';
import { ExamstartComponent } from './dashboard/student/examstart/examstart.component';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
            ResultsComponent,
            UnassignedComponent,
            ExamstartComponent,
            FilterPipe
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            ClarityModule.forChild(),
            RouterModule.forRoot([
                { path: '', component: LoginComponent },
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
                                { path: 'results', component: ResultsComponent }
                            ] },
                        { path: 'student', component: StudentComponent, children: [
                                { path: '', redirectTo: 'student', pathMatch: 'full' },
                                { path: 'examstart', component: ExamstartComponent }
                            ] }
                    ],
                }
            ])
        ],
        entryComponents: [],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=../../../src/app/app.module.js.map