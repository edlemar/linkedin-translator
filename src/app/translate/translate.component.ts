import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  textToTranslate = '';
  translatedText = '';
  debounceTranslateSubject = new Subject<void>();
  baseUrl = '';
  translation: { source: string; target: string };

  constructor(private translationService: TranslationService) { };

  ngOnInit() {
    this.debounceTranslateSubject.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.translate();
    });
  }

  debounceTranslate() {
    this.debounceTranslateSubject.next();
  }

  translate() {
    try {
      this.translatedText = this.translationService.translate(this.textToTranslate);
    } catch (error) {
      this.translatedText = "Translation not found";
    }
  }


  getRandomTranslation() {
    const translation = this.translationService.random();
    this.textToTranslate = translation.source;
    this.translatedText = translation.target;
  }
}
