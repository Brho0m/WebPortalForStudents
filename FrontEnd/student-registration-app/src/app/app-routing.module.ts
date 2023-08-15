import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GraduateProgramsComponent } from './graduate-programs/graduate-programs.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'graduate-programs', component: GraduateProgramsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
