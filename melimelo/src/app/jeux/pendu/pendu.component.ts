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

  ngOnInit() {
    this.demarrerJeu();
  }

  demarrerJeu() {
    const mot = this.penduService.genererMot();
    this.motMystere.set(mot);
    this.lettresTrouvees.set([]);
    this.lettresRatees.set([]);
  }

  devinerLettre() {
    const lettre = this.lettreInput.toLowerCase();
    this.lettreInput = '';
    if (!lettre || lettre.length !== 1 || !/[a-z]/.test(lettre)) return;

    if (this.motMystere().includes(lettre)) {
      if (!this.lettresTrouvees().includes(lettre)) {
        this.lettresTrouvees.set([...this.lettresTrouvees(), lettre]);
      }
    } else {
      if (!this.lettresRatees().includes(lettre)) {
        this.lettresRatees.set([...this.lettresRatees(), lettre]);
      }
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

  rejouer() {
    this.demarrerJeu();
  }
}
