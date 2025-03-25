// pendu.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PenduService } from '../../service/pendu.service';

@Component({
  selector: 'app-pendu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [PenduService],
  templateUrl: './pendu.component.html',
  styleUrls: ['./pendu.component.scss']
})
export class PenduComponent {
  private penduService = inject(PenduService);

  motMystere = signal<string>('');
  lettresTrouvees = signal<string[]>([]);
  lettresRatees = signal<string[]>([]);
  lettreInput = '';
  maxErreurs = 6;
  points = signal(0);
  niveau = signal<'facile' | 'moyen' | 'difficile'>('facile');
  lettreCoute = 10;  // Points nécessaires pour découvrir une lettre
  themes = this.penduService.getThemes();
  themeSelectionne = this.penduService.getThemeActuel();
  afficherSolution = signal<boolean>(false);
  lettreCachee = signal<string | null>(null);

  

  ngOnInit() {
    this.demarrerJeu();
  }

  demarrerJeu() {
    this.penduService.setTheme(this.themeSelectionne);
    const mot = this.penduService.genererMot();
    this.motMystere.set(mot);
    this.lettresTrouvees.set([]);
    this.lettresRatees.set([]);
    this.afficherSolution.set(false);
  }

  devinerLettre() {
    const lettre = this.lettreInput.toLowerCase();
    this.lettreInput = '';
    if (!lettre || lettre.length !== 1 || !/[a-z]/.test(lettre)) return;
  
    // Vérifie si la lettre est correcte
    if (this.motMystere().includes(lettre)) {
      if (!this.lettresTrouvees().includes(lettre)) {
        this.lettresTrouvees.set([...this.lettresTrouvees(), lettre]);
        this.points.set(this.points() + this.pointsParLettre);
      }
    } else {
      if (!this.lettresRatees().includes(lettre)) {
        this.lettresRatees.set([...this.lettresRatees(), lettre]);
      }
    }
  
    // Mise à jour du niveau
    if (this.points() >= 50 && this.niveau() === 'facile') this.niveau.set('moyen');
    if (this.points() >= 100 && this.niveau() === 'moyen') this.niveau.set('difficile');
  }
  

  
  // Points obtenus par lettre
  get pointsParLettre(): number {
    return 5;  // points pour chaque lettre correcte
  }
  
  // Calculer le niveau en fonction des points
  get pointsPourNiveau(): number {
    switch (this.niveau()) {
      case 'moyen': return 50;
      case 'difficile': return 100;
      default: return 20; // facile
    }
  }
  
  
  afficherMot(): string {
    return this.motMystere()
      .split('')
      .map(l => this.lettresTrouvees().includes(l) ? l : '_')
      .join(' ');
  }

  estGagne(): boolean {
    return this.motMystere()
      .split('')
      .every(l => this.lettresTrouvees().includes(l));
  }

  estPerdu(): boolean {
    return this.lettresRatees().length >= this.maxErreurs;
  }

  afficherLaSolution() {
    this.afficherSolution.set(true);
  }

  rejouer() {
    this.demarrerJeu();
  }



decouvrirLettre() {
  if (this.points() >= this.lettreCoute) {
    // Choisir une lettre cachée dans le mot mystère
    const lettresNonTrouvees = this.motMystere()
      .split('')
      .filter(l => !this.lettresTrouvees().includes(l) && !this.lettresRatees().includes(l));
    
    if (lettresNonTrouvees.length > 0) {
      const lettreAleatoire = lettresNonTrouvees[Math.floor(Math.random() * lettresNonTrouvees.length)];
      this.lettreCachee.set(lettreAleatoire);
      
      // Ajouter la lettre découverte dans les lettres trouvées
      this.lettresTrouvees.set([...this.lettresTrouvees(), lettreAleatoire]);
      
      // Perdre des points pour l'utilisation du bouton
      this.points.set(this.points() - this.lettreCoute);
    }
  } else {
    alert("Pas assez de points pour découvrir une lettre.");
  }
}

}
