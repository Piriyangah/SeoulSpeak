import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import rawLessonsData from '../../../../assets/data/lessons.json';
import { CommonModule } from '@angular/common';

interface VocabularyItem {
  ko: string;
  en: string;
}

interface GrammarItem {
  title: string;
  info: string;
}

interface Lesson {
  title: string;
  title_pic?: string;
  intro: string;
  vocab: VocabularyItem[];
  grammar: GrammarItem[];
  examples: string[];
  test: string;
  video: string;
  image: string;
}

interface LessonsByLevel {
  [lessonId: string]: Lesson;
}

interface LevelData {
  lessons: LessonsByLevel;
}

interface LessonsData {
  levels: {
    [levelKey: string]: LevelData;
  };
}

const lessonsData: LessonsData = rawLessonsData;
@Component({
  selector: 'app-lessons-overview',
  imports: [CommonModule],
  templateUrl: './lessons-overview.component.html',
  styleUrl: './lessons-overview.component.css'
})
export class LessonsOverviewComponent implements OnInit {
  level: string = '';
  lessons: LessonsByLevel = {};
  lessonEntries: { key: string; value: Lesson }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.level = params.get('level') || '';
      const levelData = lessonsData.levels[this.level];
      if (levelData?.lessons) {
        this.lessons = levelData.lessons;
        this.lessonEntries = Object.entries(this.lessons).map(([key, value]) => ({ key, value }));
      }
    });
  }

  goToLesson(lessonId: string) {
    this.router.navigate(['/levels', this.level, lessonId]);
  }
}