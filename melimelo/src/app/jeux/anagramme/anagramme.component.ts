// anagramme.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnagrammeService } from '../../service/anagramme.service';

@Component({
  selector: 'app-anagramme',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './anagramme.component.html',
  styleUrls: ['./anagramme.component.scss']
})
export class AnagrammeComponent {
  themes: string[] = [];
  themeActuel: string = '';
  solutionVisible: boolean = false;

  motOriginal: string = '';
  lettresMelangees: string[] = [];
  lettresSelectionnees: string[] = [];

  score: number = 0;
  message: string = '';

  constructor(private anagrammeService: AnagrammeService) {}

  ngOnInit() {
    this.themes = this.anagrammeService.getThemes();
    this.choisirTheme(this.themes[0]);
  }

  choisirTheme(theme: string) {
    this.themeActuel = theme;
    this.genererMot();
  }
  afficherSolution() {
    this.solutionVisible = true;
  }
  
  genererMot() {
    this.motOriginal = this.anagrammeService.getMotAleatoire(this.themeActuel);
    this.lettresMelangees = this.anagrammeService.melangerMot(this.motOriginal);
    this.lettresSelectionnees = [];
    this.message = '';
  }

  selectionnerLettre(lettre: string, index: number) {
    this.lettresSelectionnees.push(lettre);
    this.lettresMelangees.splice(index, 1);
  }

  deselectionnerLettre(index: number) {
    const lettre = this.lettresSelectionnees[index];
    this.lettresMelangees.push(lettre);
    this.lettresSelectionnees.splice(index, 1);
  }

  validerMot() {
    const motForme = this.lettresSelectionnees.join('');
    if (motForme === this.motOriginal) {
      this.score += 10;
      this.message = '✅ Bien joué !';
    } else {
      this.score -= 5;
      this.message = '❌ Mauvais mot';
    }
  }

  get motMelangeVisible() {
    return this.lettresMelangees;
  }

  get motEnCours() {
    return this.lettresSelectionnees;
  }
}