import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-grammar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grammar.component.html',
  styleUrl: './grammar.component.css'
})
export class GrammarComponent {
  showResetButtons: { [key: string]: boolean } = {};

  checkExercise(id: string): void {
    const container = document.getElementById(id);
    const items = Array.from(container?.querySelectorAll('[data-answer]') || []);
    const unanswered = items.filter(item => {
      const input = item.querySelector('input[type="radio"]:checked');
      return !input;
    });

    if (unanswered.length > 0 && !confirm('Some questions are unanswered. Show answers anyway?')) {
      return;
    }

    items.forEach(item => {
      const correct = item.getAttribute('data-answer');
      const radios = Array.from(item.querySelectorAll('input[type="radio"]')) as HTMLInputElement[];

      // Clean old styles and feedback
      item.querySelectorAll('label').forEach(label => {
        label.classList.remove('correct', 'incorrect', 'highlight-correct');
      });
      const oldExplanation = item.querySelector('.explanation-text') as HTMLElement;
      if (oldExplanation) oldExplanation.remove();

      // Check answers and style
      radios.forEach(radio => {
        const label = radio.closest('label');
        if (!label) return;

        if (radio.checked && radio.value === correct) {
          label.classList.add('correct');
        }

        if (radio.checked && radio.value !== correct) {
          label.classList.add('incorrect');

          const correctLabel = radios.find(r => r.value === correct)?.closest('label');
          if (correctLabel) correctLabel.classList.add('highlight-correct');

          const explanation = document.createElement('div');
          explanation.classList.add('explanation-text');
          explanation.textContent = 'Explanation: ' + this.getExplanation(radio.name);
          item.appendChild(explanation);
        }
      });
    });

    this.showResetButtons[id] = true;
  }

  resetExercise(id: string): void {
    const container = document.getElementById(id);
    const items = Array.from(container?.querySelectorAll('[data-answer]') || []);

    items.forEach(item => {
      const radios = Array.from(item.querySelectorAll('input[type="radio"]')) as HTMLInputElement[];
      radios.forEach(radio => {
        radio.checked = false;
        const label = radio.closest('label');
        if (label) {
          label.classList.remove('correct', 'incorrect', 'highlight-correct');
        }
      });

      const explanation = item.querySelector('.explanation-text') as HTMLElement;
      if (explanation) explanation.remove();
    });

    this.showResetButtons[id] = false;
  }

  private getExplanation(qid: string): string {
    switch (qid) {
      case 'q1_1':
        return '책 ends in a consonant, so use 책이에요, not 책예요.';
      case 'q1_2':
        return '물 ends in a consonant, so use 물이에요.';
      case 'q1_3':
        return '의사 ends in a vowel, so use 의사예요.';
      default:
        return 'Check the rule again.';
    }
  }
}
