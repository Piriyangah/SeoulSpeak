import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HangulComponent } from './pages/hangul/hangul.component';
import { VocabComponent } from './pages/vocab/vocab.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GrammarComponent } from './pages/grammar/grammar.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { LanguageLevelsComponent } from './pages/language-levels/language-levels.component';
import { LessonsComponent } from './pages/language-levels/lessons-overview/lessons/lessons.component';
import { LessonsOverviewComponent } from './pages/language-levels/lessons-overview/lessons-overview.component';


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
    path: "levels", 
    component: LanguageLevelsComponent 
  },
  {
    path: "lessons/:level",
    component: LessonsOverviewComponent
  },
  { 
    path: 'lessons/:level/:lesson', 
    component: LessonsComponent 
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  { 
    path: "", 
    redirectTo: '/levels', 
    pathMatch: 'full' },
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
