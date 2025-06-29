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
    paragraph2: string[]; 
    warning: string;
  };
  intro_video: string;
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
    type:{
      multiple_choice?: {
        instruction: string;
        questions: {
          question: string;
          answers: string[];
          correct_answer: string;
        }[];
      };
      true_false?: {
        instruction: string;
        questions: {
          question: string;
          correct_answer: boolean;
        }[];
      } 
    }
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

  // Für Tests Prüfen
  // 1) multiple_choice_questions
  selectedAnswers: { [questionIndex: number]: Set<number> } = {};
  results: { correct: boolean }[] = [];

  isSelected(qIndex: number, aIndex: number): boolean {
    return this.selectedAnswers[qIndex]?.has(aIndex) || false;
  }

  toggleAnswer(qIndex: number, aIndex: number): void {
    if (!this.selectedAnswers[qIndex]) {
      this.selectedAnswers[qIndex] = new Set<number>();
    }

    if (this.selectedAnswers[qIndex].has(aIndex)) {
      this.selectedAnswers[qIndex].delete(aIndex);
    } else {
      this.selectedAnswers[qIndex].add(aIndex);
    }
  }

  checkAnswers(): void {
    if (!this.lesson || !this.lesson.test || !this.lesson.test.type || !this.lesson.test.type.multiple_choice) {
      return;
    }
    const questions = this.lesson.test.type.multiple_choice.questions;
    this.results = questions.map((q, i) => {
      const selected = this.selectedAnswers[i] || new Set<number>();
      
      const correctIndex = q.answers.findIndex(ans => ans === q.correct_answer);
      const selectedArray = Array.from(selected);

      return {
        correct: selectedArray.length === 1 && selectedArray[0] === correctIndex
      };
    });
  }

  // 2) true_false_questions
  selectedTFAnswers: { [index: number]: boolean } = {};
  tfResults: { correct: boolean }[] = [];

  toggleTFAnswer(qIndex: number, answer: boolean): void {
    this.selectedTFAnswers[qIndex] = answer;
  }

  checkTFAnswers(): void {
    if (!this.lesson?.test?.type?.true_false) return;
    const questions = this.lesson.test.type.true_false.questions;

    this.tfResults = questions.map((q, i) => ({
      correct: this.selectedTFAnswers[i] === q.correct_answer
    }));
  }

}