import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { TestComponent } from './test/test.component';
import { TableComponent } from './table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "table", component: TableComponent},
    {path: "vokabeln:id", component: DetailComponent},
    {path: "test", component: TestComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "form", component: FormComponent}

];
