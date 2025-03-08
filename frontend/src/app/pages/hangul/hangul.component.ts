import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hangul',
  imports: [CommonModule],
  templateUrl: './hangul.component.html',
  styleUrl: './hangul.component.css'
})
export class HangulComponent {
  consonants = [
    { char: "ㄱ", audio: "assets/audio/giyeok.mp3" },
    { char: "ㄴ", audio: "assets/audio/nieun.mp3" },
    { char: "ㄷ", audio: "assets/audio/digeut.mp3" },
    { char: "ㄹ", audio: "assets/audio/rieul.mp3" },
    { char: "ㅁ", audio: "assets/audio/mieum.mp3" },
    { char: "ㅂ", audio: "assets/audio/bieup.mp3" },
    { char: "ㅅ", audio: "assets/audio/siot.mp3" },
    { char: "ㅇ", audio: "assets/audio/ieung.mp3" },
    { char: "ㅈ", audio: "assets/audio/jieut.mp3" },
    { char: "ㅊ", audio: "assets/audio/chieut.mp3" },
    { char: "ㅋ", audio: "assets/audio/kieuk.mp3" },
    { char: "ㅌ", audio: "assets/audio/tieut.mp3" },
    { char: "ㅍ", audio: "assets/audio/pieup.mp3" },
    { char: "ㅎ", audio: "assets/audio/hieut.mp3" }
  ];

  doubleConsonants = [
    { char: "ㄲ", audio: "assets/audio/ssanggiyeok.mp3" },
    { char: "ㄸ", audio: "assets/audio/ssangdigeut.mp3" },
    { char: "ㅃ", audio: "assets/audio/ssangbieup.mp3" },
    { char: "ㅆ", audio: "assets/audio/ssangsiot.mp3" },
    { char: "ㅉ", audio: "assets/audio/ssangjieut.mp3" }
  ];

  vowels = [
    { char: "ㅏ", audio: "assets/audio/a.mp3" },
    { char: "ㅑ", audio: "assets/audio/ya.mp3" },
    { char: "ㅓ", audio: "assets/audio/eo.mp3" },
    { char: "ㅕ", audio: "assets/audio/yeo.mp3" },
    { char: "ㅗ", audio: "assets/audio/o.mp3" },
    { char: "ㅛ", audio: "assets/audio/yo.mp3" },
    { char: "ㅜ", audio: "assets/audio/u.mp3" },
    { char: "ㅠ", audio: "assets/audio/yu.mp3" },
    { char: "ㅡ", audio: "assets/audio/eu.mp3" },
    { char: "ㅣ", audio: "assets/audio/i.mp3" }
  ];

  complexVowels = [
    { char: "ㅐ", audio: "assets/audio/ae.mp3" },
    { char: "ㅔ", audio: "assets/audio/e.mp3" },
    { char: "ㅒ", audio: "assets/audio/yae.mp3" },
    { char: "ㅖ", audio: "assets/audio/ye.mp3" },
    { char: "ㅘ", audio: "assets/audio/wa.mp3" },
    { char: "ㅙ", audio: "assets/audio/wae.mp3" },
    { char: "ㅚ", audio: "assets/audio/oe.mp3" },
    { char: "ㅝ", audio: "assets/audio/wo.mp3" },
    { char: "ㅞ", audio: "assets/audio/we.mp3" },
    { char: "ㅟ", audio: "assets/audio/wi.mp3" },
    { char: "ㅢ", audio: "assets/audio/ui.mp3" }
  ];

  playAudio(audioPath: string) {
    console.log("Attempting to play:", audioPath);
    const audio = new Audio();
    audio.src = audioPath;
    audio.load();
    audio.play().catch(error => console.error("Audio play error:", error));
  }
}