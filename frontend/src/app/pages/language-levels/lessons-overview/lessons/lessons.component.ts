import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import lessons from '../../../../../assets/data/lessons.json';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

interface Lesson {
  title: string;
  title_pic: string;
  intro: {
    title: string;
    paragraph: string[];
    speech_levels_title: string;
    speech_levels: string[];
    paragraph2: string;
    warning: string;
  };
  intro_video: string;
  vocab_title: string;
  vocab_intro: string;
  vocab: {
    title: string;
    paragraph: string[];
    words: { ko: string; en: string }[];
  };
  grammar: {
    title: string;
    paragraph: string[];
    grammar: { title: string; info: string }[];
  };
  examples: string[];
  test: {
    title: string;
    paragraph: string[];
  }
  video: string;
  image: string;
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
  lessonId: number = 0;
  lesson: Lesson | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const level = params.get('level');
      const lessonId = params.get('lesson');

      if (level && lessonId && (lessons as any).levels[level]) {
        this.levelKey = level;
        this.lessonId = parseInt(lessonId, 10);
        
        const levelLessons = (lessons.levels as any)[level].lessons;
        this.lesson = levelLessons[lessonId];

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isIntroString(intro: any): intro is string {
    return typeof intro === 'string';
  }

  isIntroObject(intro: any): intro is object {
    return typeof intro === 'object' && intro !== null;
  }
}