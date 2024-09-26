import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { DepartmentsComponent } from './Components/departments/departments.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [{path :"signin", component: SignInComponent},
  {path:"signup", component:SignUpComponent},
  {path:"doctor", component:DoctorsComponent},
  {path:"department", component:DepartmentsComponent},
  {path:"contact", component:ContactComponent},
  {path:"", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
