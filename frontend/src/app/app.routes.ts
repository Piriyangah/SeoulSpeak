import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HangulComponent } from './pages/hangul/hangul.component';
import { VocabComponent } from './pages/vocab/vocab.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GrammarComponent } from './pages/grammar/grammar.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { LessonsComponent } from './pages/lessons/lessons.component';


export const routes: Routes = [{
    path: "",
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: "hangul",
    component: HangulComponent
  },
  {
    path: "vocab",
    component: VocabComponent
  }, 
  {
    path: "grammar",
    component: GrammarComponent
  }, 
  { 
    path: 'lessons', 
    component: LessonsComponent 
  },
  {
    path: "layout",
    component: LayoutComponent
  },
  { 
    path: 'vocab/:id',
    component : DetailComponent
  },
  {
    path: "create",
    component: CreateComponent
  }
];
