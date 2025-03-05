import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HangulComponent } from './pages/hangul/hangul.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { VocabComponent } from './pages/vocab/vocab.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GrammarComponent } from './pages/grammar/grammar.component';


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
    path: "lesson",
    component: LessonComponent
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
    path: "layout",
    component: LayoutComponent
}];
