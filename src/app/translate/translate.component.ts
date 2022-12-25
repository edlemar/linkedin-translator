import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  textToTranslate = '';
  translatedText = '';
  debounceTranslateSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

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
    const baseUrl = "http://localhost:3000/api/translate";

    const params = {
      text: this.textToTranslate
      //target: 'fr' // target language
    };

    this.http.post(baseUrl, params).subscribe((response: any) => {
      this.translatedText = response.translation;
    });
  }

  getRandomTranslation() {
    const baseUrl = "http://localhost:3000/api/random";

    this.http.post(baseUrl, {}).subscribe((response: any) => {
      this.textToTranslate = response.translation.source;
      this.translatedText = response.translation.target;
    });
  }
}
