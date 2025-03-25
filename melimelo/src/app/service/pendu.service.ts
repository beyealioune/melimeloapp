import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PenduService {

  constructor() { }

  private themes: Record<string, string[]> = {
    animaux: ['tigre', 'lion', 'chat', 'chien', 'singe', 'requin'],
    fruits: ['pomme', 'banane', 'kiwi', 'orange', 'raisin', 'mangue'],
    pays: ['france', 'brazil', 'canada', 'espagne', 'japon', 'chine'],
    couleurs: ['rouge', 'bleu', 'vert', 'jaune', 'noir', 'blanc'],
    sports: ['tennis', 'football', 'rugby', 'golf', 'boxe', 'ski']
  };

  private motActuel = '';
  private themeActuel = 'animaux';

  getThemes(): string[] {
    return Object.keys(this.themes);
  }

  setTheme(theme: string) {
    if (this.themes[theme]) {
      this.themeActuel = theme;
    }
  }

  genererMot(): string {
    const mots = this.themes[this.themeActuel];
    const mot = mots[Math.floor(Math.random() * mots.length)];
    this.motActuel = mot;
    return mot;
  }

  getSolution(): string {
    return this.motActuel;
  }

  getThemeActuel(): string {
    return this.themeActuel;
  }

}
