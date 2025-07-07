import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import lessons from '../../../../assets/data/lessons.json';
import { CommonModule } from '@angular/common';

interface LessonOverview {
  title: string;
  title_pic: string;
}

@Component({
  selector: 'app-lessons-overview',
  imports: [CommonModule, RouterModule],
  templateUrl: './lessons-overview.component.html',
  styleUrl: './lessons-overview.component.css'
})

export class LessonsOverviewComponent implements OnInit {
  lessons: LessonOverview[] = [];
  levelKey!: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

   ngOnInit() {
    this.levelKey = this.route.snapshot.paramMap.get('level')!;
    const levelLessons = (lessons.levels as Record<string, any>)[this.levelKey]?.lessons;

    if (levelLessons) {
      this.lessons = Object.values(levelLessons).map((lesson: any) => ({
        title: lesson.title,
        title_pic: lesson.title_pic
      }));
    }
  }

  getTitleEn(title: string): string {
    return title.split('|||')[0].trim();
  }

  getTitleKo(title: string): string | null {
    const parts = title.split('|||');
    return parts.length > 1 ? parts[1].trim() : null;
  }

  goToLesson(index: number) {
    this.router.navigate(['/lessons', this.levelKey, index]);
  }

}