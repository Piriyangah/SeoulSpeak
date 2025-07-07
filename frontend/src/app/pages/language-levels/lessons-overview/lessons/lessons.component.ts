import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import lessons from '../../../../../assets/data/lessons.json';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Vocab } from '../../../../shared/vocab';

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
      // Aufgabe 1: Multiple Choice
      multiple_choice?: {
        instruction: string;
        questions: {
          question: string;
          answers: string[];
          correct_answer: string[];
        }[];
      };
      // Aufgabe 2: Richtig/Falsch
      true_false?: {
        instruction: string;
        questions: {
          question: string;
          correct_answer: boolean;
        }[];
      };
      // Aufgabe 3: Lückentext
      fill_in_the_blanks?: {
        instruction: string;
        words: string[];
        sentences: {
          text: string;
          answer: string;
        }[];
      };
      // Aufgabe 4: Satzreihenfolge
      sentence_order?: {
        instruction: string;
        questions: {
          segments: string[];
          correct_order: string[];
        }[];
      };
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
  
  levelKey: string = ''; //aktueller Level (A1)
  level: any;  // level object
  lessons: { [key: string]: Lesson } = {}; // Liste der Lexionen aus aktuellen Level
  lessonId: number = 0; // aktuelle Lektion ID (Index 0)
  lesson: Lesson | null = null; // Aktuelle Lektion (Lesson nur 1)

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const level = params.get('level');
      const lessonId = params.get('lesson');

      // speichert den Level und Lektio aus URL  und gibt sie weiter
      if (level && lessonId && (lessons as any).levels[level]) {
        this.levelKey = level;
        this.lessonId = parseInt(lessonId, 10);
        
        const levelLessons = (lessons.levels as any)[level].lessons;
        this.lesson = levelLessons[lessonId];

        // Aufgabe 4: Initialisierung Satzreihenfolge
        if (this.lesson?.test?.type?.sentence_order) {
        this.initializeOrderQuestions();
      }
        // Nach oben scrollen, wenn eine Lektion geladen wird
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Hilfsfunktionen: Sicherheit für eingebettete URLs (YT Video)
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isIntroString(intro: any): intro is string {
    return typeof intro === 'string';
  }

  isIntroObject(intro: any): intro is object {
    return typeof intro === 'object' && intro !== null;
  }

  // Vokabeln von Lektion in hinzufügen auf die Vokabelliste
  addToVocabList(word: { ko: string; en: string }): void {
    const vocabEntry: Vocab = {
      id: 0,
      korean: word.ko,
      pronunciation: '',
      english: word.en,
      example: '',
      meaning: '',
      difficulty: 0 // 👈 wichtig: kein "A1" als String!
    };

    fetch('http://localhost:3000/vocabulary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vocabEntry)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Fehler beim Speichern');
      }
      return response.json();
    })
    .then(data => {
      alert(`Vokabel "${data.korean}" wurde gespeichert.`);
      console.log('Gespeichert:', data);
    })
    .catch(error => {
      console.error('Fehler:', error);
      alert('Fehler beim Speichern.');
    });
  }


  saveAllVocab(): void {
    if (!this.lesson) return;

    // 1. Hole aktuelle Vokabelliste vom Server
    fetch('http://localhost:3000/vocabulary')
      .then(res => res.json())
      .then((existingVocab: Vocab[]) => {
        const newWords = this.lesson!.vocab.words;

        // 2. Prüfe auf Duplikate
        const duplicates: { ko: string, en: string }[] = [];
        const toInsert: { ko: string, en: string }[] = [];

        for (const word of newWords) {
          const exists = existingVocab.some(v => v.korean === word.ko && v.english === word.en);
          if (exists) {
            duplicates.push(word);
          } else {
            toInsert.push(word);
          }
        }

        // 3. Falls Duplikate -> Frage nach
        if (duplicates.length > 0) {
          const confirmMessage = `Folgende Vokabeln existieren bereits:\n\n${duplicates
            .map(w => `- ${w.ko} / ${w.en}`)
            .join('\n')}\n\nTrotzdem alle speichern?`;

          if (!confirm(confirmMessage)) {
            // wenn nur neue 
            this.bulkSave(toInsert);
            return;
          }
        }

        // sonst alle
        this.bulkSave(newWords);
      })
      .catch(err => {
        console.error('Fehler beim Laden vorhandener Vokabeln:', err);
        alert('Fehler beim Speichern.');
      });
  }

  bulkSave(words: { ko: string; en: string }[]): void {
    for (const word of words) {
      const vocabEntry: Vocab = {
        id: 0,
        korean: word.ko,
        pronunciation: '',
        english: word.en,
        example: '',
        meaning: '',
        difficulty: 0
      };

      fetch('http://localhost:3000/vocabulary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vocabEntry)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Fehler beim Speichern');
        }
        return res.json();
      })
      .then(data => {
        console.log('Gespeichert:', data);
      })
      .catch(err => {
        console.error('Fehler beim Speichern:', err);
      });
    }

    alert(`${words.length} Vokabel(n) wurden gespeichert.`);
  }


  // TEST LOGIC
  // 1) multiple_choice_questions
  selectedAnswers: { [qIndex: number]: Set<number> } = {}; // Map von Frageindex zu Set von Antwortindex
  results: { correct: boolean }[] = []; // Array von Ergebnissen für jede Frage

  // pürft, ob Antwort ausgewählt
  isSelected(qIndex: number, aIndex: number): boolean {
    return this.selectedAnswers[qIndex]?.has(aIndex) || false;
  }

  // toggelt die Auswahl einer Antwort; sammelt die Antworten in einem Set
  toggleAnswer(qIndex: number, aIndex: number): void {
    // prüft, ob Antwort bereits gewählt; nein -> initialisiere ein Set
    if (!this.selectedAnswers[qIndex]) { 
      this.selectedAnswers[qIndex] = new Set<number>(); 
    }

    // prüft, ob die Antwort bereits ausgewählt ist, wenn ja -> entfernen, wenn nein -> hinzufügen
    if (this.selectedAnswers[qIndex].has(aIndex)) {
      this.selectedAnswers[qIndex].delete(aIndex);
    } else {
      this.selectedAnswers[qIndex].add(aIndex);
    }
  }

  //
  checkAnswers(): void {
    if (!this.lesson || !this.lesson.test || !this.lesson.test.type || !this.lesson.test.type.multiple_choice) {
      return;
    }
    const questions = this.lesson.test.type.multiple_choice.questions;
    this.results = questions.map((q, i) => {
      const selected = this.selectedAnswers[i] || new Set<number>();
      
      const correctAnswers = Array.isArray(q.correct_answer)
      ? q.correct_answer
      : [q.correct_answer];

    const correctIndexes = q.answers
      .map((a, idx) => (correctAnswers.includes(a) ? idx : -1))
      .filter(idx => idx !== -1);

    // prüfe: gleiche Anzahl + gleiche Werte
    const selectedArray = Array.from(selected).sort();
    const correctSorted = correctIndexes.sort();

    const isCorrect =
      selectedArray.length === correctSorted.length &&
      selectedArray.every((val, index) => val === correctSorted[index]);

    return { correct: isCorrect };
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

 // 3) fill_in_the_blank_questions
  selectedWords: { [sentenceIndex: number]: string } = {};
  fillInResults: { correct: boolean }[] = [];
  draggedWord: string | null = null;
  activeBlankIndex: number | null = null;

  getRemainingWords(): string[] {
    if (!this.lesson?.test?.type?.fill_in_the_blanks) {
      return [];
    }
    const allWords = this.lesson.test.type.fill_in_the_blanks.words;
    const usedWords = Object.values(this.selectedWords);
    return allWords.filter(w => !usedWords.includes(w));
  }

  onDragStart(word: string): void {
    this.draggedWord = word;
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, sentenceIndex: number): void {
    event.preventDefault();
    if (this.draggedWord) {
      this.selectedWords[sentenceIndex] = this.draggedWord;
      this.draggedWord = null;
      this.activeBlankIndex = null;  
    }
  }

  onBlankClick(sentenceIndex: number): void {
    if (this.activeBlankIndex === sentenceIndex) {
      this.activeBlankIndex = null; 
    } else {
      this.activeBlankIndex = sentenceIndex;
    }
  }

  onSelectWord(word: string): void {
    if (this.activeBlankIndex !== null) {
      this.selectedWords[this.activeBlankIndex] = word;
      this.activeBlankIndex = null; 
    }
  }

  checkBFAnswers(): void {
    if (!this.lesson?.test?.type?.fill_in_the_blanks) return;

    const sentences = this.lesson.test.type.fill_in_the_blanks.sentences;
    this.fillInResults = sentences.map((sentence, i) => {
      return {
        correct: this.selectedWords[i] === sentence.answer
      };
    });
  }
  
  // 4) sentence_order_questions
  sentenceSlots: { [index: number]: string[] } = {};
  // aus 4: draggedWord: string | null = null;
  sentenceOrderWords: string[] = [];
  sentenceOrderResults: { correct: boolean }[] = [];
  sentenceOrderWordsPerQuestion: { [index: number]: string[] } = {};

  shuffleArray(array: string[]): string[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  onDropSentenceWord(qIndex: number, i: number): void {
    if (!this.draggedWord) return;
    const usedWords = Object.values(this.sentenceSlots[qIndex]);
    if (usedWords.includes(this.draggedWord)) return;

    this.sentenceSlots[qIndex][i] = this.draggedWord;
    this.draggedWord = null;
  }

  onSelectSentenceWord(word: string): void {
    // Optional: Direkt per Klick setzen in das nächste freie Feld
    const index = this.findFirstEmptySlot();
    if (index.qIndex !== -1 && index.i !== -1) {
      this.sentenceSlots[index.qIndex][index.i] = word;
    }
  }

  findFirstEmptySlot(): { qIndex: number; i: number } {
    for (let qIndex in this.sentenceSlots) {
      for (let i = 0; i < this.sentenceSlots[qIndex].length; i++) {
        if (!this.sentenceSlots[qIndex][i]) {
          return { qIndex: +qIndex, i };
        }
      }
    }
    return { qIndex: -1, i: -1 };
  }

  onDropClick(qIndex: number, i: number): void {
    this.sentenceSlots[qIndex][i] = '';
  }

  checkSentenceOrderAnswers(): void {
    if (!this.lesson?.test?.type?.sentence_order) return;

    const questions = this.lesson.test.type.sentence_order.questions;
    this.sentenceOrderResults = questions.map((q, i) => {
      const current = this.sentenceSlots[i];
      return {
        correct: JSON.stringify(current) === JSON.stringify(q.correct_order)
      };
    });
  }

  initializeOrderQuestions(): void {
  const questions = this.lesson?.test?.type?.sentence_order?.questions;
  if (!questions) return;

  this.sentenceSlots = {};
  this.sentenceOrderWordsPerQuestion = [];

  questions.forEach((q, i) => {
    this.sentenceSlots[i] = Array(q.correct_order.length).fill('');
    const shuffled = this.shuffleArray(q.segments);
    this.sentenceOrderWordsPerQuestion[i] = shuffled;
  });

  this.sentenceOrderResults = [];
  }

  resetSentenceOrder(): void {
    this.initializeOrderQuestions();
    this.sentenceOrderResults = [];
  }
}