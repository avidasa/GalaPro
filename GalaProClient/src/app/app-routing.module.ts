import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddActionComponent } from './components/add-action/add-action.component';

const routes: Routes = [
{ path: '', redirectTo: '/users', pathMatch: 'full' },
{ path: 'users', component: UsersListComponent },
{ path: 'action', component: AddActionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
