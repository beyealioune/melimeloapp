import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnagrammeService {

  constructor() { }
  private themes: Record<string, string[]> = {
    animaux: ['LION', 'TIGRE', 'CHIEN', 'CHAT', 'ZEBRE', 'SINGE'],
    pays: ['FRANCE', 'ESPAGNE', 'CANADA', 'JAPON', 'MAROC', 'ITALIE'],
    fruits: ['POMME', 'BANANE', 'KIWI', 'MANGUE', 'RAISIN', 'CERISE'],
    informatique: ['ANGULAR', 'PYTHON', 'REACT', 'VUEJS', 'JAVASCRIPT', 'CSS'],
    sports: ['FOOTBALL', 'TENNIS', 'RUGBY', 'SKI', 'HANDBALL', 'BOXE']
  };

  getThemes(): string[] {
    return Object.keys(this.themes);
  }

  getMotAleatoire(theme: string): string {
    const mots = this.themes[theme.toLowerCase()] ?? [];
    if (mots.length === 0) return '';
    const mot = mots[Math.floor(Math.random() * mots.length)];
    return mot;
  }

  melangerMot(mot: string): string[] {
    const lettres = mot.split('');
    for (let i = lettres.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lettres[i], lettres[j]] = [lettres[j], lettres[i]];
    }
    return lettres;
  }
}
