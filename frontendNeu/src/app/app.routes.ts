import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: "table",
        component: TableComponent
      },
      {
        path: "member/:id",
        component: DetailComponent
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}