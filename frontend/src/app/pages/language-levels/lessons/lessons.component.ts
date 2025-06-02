import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import rawLessons from '../../../../assets/data/lessons.json';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// Define the Lesson interface if not imported from elsewhere
interface Lesson {
  title: string;
  intro: string;
  vocab: { ko: string; en: string }[];
  grammar: { title: string; info: string }[];
  examples: string[];
  test: string;
  video: string;
  image: string;
}
const lessons: LessonsJson = rawLessons as LessonsJson;

interface LessonsJson {
  levels: {
    [key: string]: {
      lessons: { [key: string]: Lesson };
    };
  };
}

@Component({
  selector: 'app-lessons',
  imports: [CommonModule, RouterModule],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  levelKey: string = '';
  level: any;
  lessons: { [key: string]: Lesson } = {};

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const level = params.get('level');
    console.log("Level param:", level);
    console.log("Available levels:", Object.keys(lessons.levels));
    if (level && lessons.levels[level]) {
      this.levelKey = level;
      this.level = lessons.levels[level];
      this.lessons = lessons.levels[level].lessons;
    } else {
      console.warn('Level not found in lessons.json');
    }
  });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}