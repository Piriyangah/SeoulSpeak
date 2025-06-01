import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component'; 
import { HomeComponent } from './pages/home/home.component';
import { HangulComponent } from './pages/hangul/hangul.component';
import { VocabComponent } from './pages/vocab/vocab.component';
import { GrammarComponent } from './pages/grammar/grammar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { routes } from './app.routes';
import { DetailComponent } from './detail/detail.component';
import { LessonsComponent } from './pages/lessons/lessons.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    HangulComponent, 
    VocabComponent,
    LayoutComponent,
    GrammarComponent,
    LessonsComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
