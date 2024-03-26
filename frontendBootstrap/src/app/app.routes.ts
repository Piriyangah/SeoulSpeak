import { Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'detail', component: DetailComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: DetailComponent},
  { path: 'create', component: CreateComponent},
  { path: 'table', component: TableComponent}
];