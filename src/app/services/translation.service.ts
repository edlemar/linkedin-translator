import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as levenshtein from 'levenshtein';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
    translations: Object;

    constructor(private http: HttpClient) {
      // Read the translations file from the assets folder using the HttpClient
    this.http.get('/assets/translations.json').subscribe(translations => {
        this.translations = translations;
      });
    }

  translate(text: string): string {
    // Look up translation in the translations object
    let translation = '';

    if (text.includes('junior') || text.includes('chief')) {
      translation = this.preProcessRequest(text);
      return translation;
    }

    // Lowercase the text before looking it up in the translations object
    translation = this.translations[text.toLowerCase()];

    // If the translation is not found, use the Levenshtein distance to find a similar translation
    if (!translation) {
      let minDistance = Infinity;
      for (const key in this.translations) {
        const distance = levenshtein(text, key);
        if (distance < minDistance) {
          minDistance = distance;
          translation = this.translations[key];
        }
      }
      if (minDistance >= 3 || minDistance == Infinity) {
        translation = 'Translation not found';
      }
    }

    // If the translation is still not found, set it to 'Translation not found'
    if (!translation) {
      translation = 'Translation not found';
    }

    return translation;
  }

  random(): { source: string; target: string } {
    const indexedTranslations = Object.entries(this.translations).map(([source, target], index) => ({
      id: index,
      source: source as string,
      target: target as string
    }));
    const index = Math.floor(Math.random() * indexedTranslations.length);
    const translation = indexedTranslations[index];
    delete translation.id;

    return translation;
  }

  preProcessRequest(receivedText: string): string {
    if (receivedText.includes('junior')) {
      return this.juniorRequest(receivedText);
    }
    if (receivedText.includes('chief')) {
      return this.chiefRequest(receivedText);
    }
    return "";
  }

  juniorRequest(receivedText: string): string {
    // Split the text into two parts: the part before "junior" and the part after "junior"
    const parts = receivedText.split('junior');

    // Translate the part before "junior"
    let translation = '';
    if (parts[0]) {
      translation += this.translations[parts[0].toLowerCase()] || 'Translation not found';
    }

    // Translate "junior"
    translation += this.translations['junior'] || 'junior';

    // Translate the part after "junior"
    if (parts[1]) {
      translation +=
        '. Usually related to: ' + (this.translations[parts[1].toLowerCase().trim()] || 'Translation not found');
    }

    return translation;
  }

  chiefRequest(receivedText: string): string {
    // Split the text into two parts: the part before "chief" and the part after "chief"
    const parts = receivedText.split('chief');

    // Translate the part before "chief"
    let translation = '';
    if (parts[0]) {
      translation += this.translations[parts[0].toLowerCase()] || 'Translation not found';
    }

    // Translate "chief"
    translation += this.translations['chief'] || 'chief';

    // Translate the part after "chief"
    if (parts[1]) {
      translation +=
        '. Usually related to: ' + (this.translations[parts[1].toLowerCase().trim()] || 'Translation not found');
    }

    return translation;
  }
}

