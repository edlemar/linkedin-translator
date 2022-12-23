import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  textToTranslate = '';
  translatedText = '';

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  translate() {
    const API_KEY = 'YOUR_API_KEY';
    const baseUrl = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    const params = {
      text: this.textToTranslate
      //target: 'fr' // target language
    };

    this.http.post("http://localhost:3000/api/translate", params).subscribe((response: any) => {
      this.translatedText = response.translation;
    });
  }
}
