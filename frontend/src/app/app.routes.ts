import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HangulComponent } from './pages/hangul/hangul.component';
import { VocabComponent } from './pages/vocab/vocab.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GrammarComponent } from './pages/grammar/grammar.component';
import { Lesson1Component } from './pages/lessons/lesson1/lesson1.component';
import { Lesson2Component } from './pages/lessons/lesson2/lesson2.component';
import { Lesson3Component } from './pages/lessons/lesson3/lesson3.component';
import { DetailComponent } from './detail/detail.component';


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
    path: 'lesson1', 
    component: Lesson1Component 
  },
  { 
    path: 'lesson2', 
    component: Lesson2Component 
  },
  { 
    path: 'lesson3', 
    component: Lesson3Component 
  },
  {
    path: "layout",
    component: LayoutComponent
  },
  { 
    path: 'vocab/:id',
    component : DetailComponent
}];
