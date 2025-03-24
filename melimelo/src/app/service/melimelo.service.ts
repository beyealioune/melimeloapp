import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MelimeloService {

  constructor() { }

  private themes: Record<string, string[]> = {
    animaux: ['TIGRE', 'LION', 'ZEBRE', 'SINGE', 'CHEVAL', 'CHIEN', 'CHAT', 'OURS'],
    pays: ['FRANCE', 'ESPAGNE', 'ITALIE', 'CANADA', 'BRESIL', 'JAPON', 'CHINE', 'MAROC'],
    fruits: ['POMME', 'BANANE', 'KIWI', 'RAISIN', 'ORANGE', 'MANGUE', 'POIRE', 'CERISE'],
    informatique: ['ANGULAR', 'REACT', 'VUEJS', 'PYTHON', 'JAVASCRIPT', 'NODE', 'HTML', 'CSS'],
    sports: ['FOOTBALL', 'TENNIS', 'RUGBY', 'SKI', 'HANDBALL', 'BOXE', 'NATATION', 'VELO']
  };

  getThemes(): string[] {
    return Object.keys(this.themes);
  }

  getMotsParTheme(theme: string): string[] {
    const mots = this.themes[theme.toLowerCase()];
    if (!mots) return [];
    const shuffled = [...mots].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }
}
