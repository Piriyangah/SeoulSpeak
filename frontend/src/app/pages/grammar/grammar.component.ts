import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grammar',
  imports: [CommonModule, RouterLink],
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
  
      radios.forEach(radio => {
        const label = radio.closest('label');
        label?.classList.remove('correct', 'incorrect', 'selected', 'bold');
      });
  
      radios.forEach(radio => {
        const label = radio.closest('label');
        if (!label) return;
  
        const feedback = label.querySelector('.feedback') as HTMLElement || document.createElement('span');
        if (!feedback.classList.contains('feedback')) {
          feedback.classList.add('feedback');
          label.appendChild(feedback);
        }
        feedback.textContent = '';
  
        if (radio.value === correct) {
          label.classList.add('correct');
        } else {
          label.classList.add('incorrect');
        }
  
        if (radio.checked) {
          label.classList.add('bold');
          if (radio.value === correct) {
           // feedback.textContent = '✔️';
          } else {
           // feedback.textContent = '❌';
          }
        }
      });
    });
  
    this.showResetButtons[id] = true;
  }
  
  // Reset
  resetExercise(id: string): void {
    const container = document.getElementById(id);
    const items = Array.from(container?.querySelectorAll('[data-answer]') || []);
  
    items.forEach(item => {
      const radios = Array.from(item.querySelectorAll('input[type="radio"]')) as HTMLInputElement[];
  
      radios.forEach(radio => {
        radio.checked = false;
  
        const label = radio.closest('label');
        if (label) {
          label.classList.remove('correct', 'incorrect', 'bold', 'selected');
  
          const feedback = label.querySelector('.feedback') as HTMLElement;
          if (feedback) {
            feedback.textContent = '';
          }
        }
      });
    });
  
    this.showResetButtons[id] = false;
  }  
}
