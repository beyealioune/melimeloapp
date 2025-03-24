import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PenduService {

  constructor() { }

  private mots = ['angular', 'developpeur', 'typescript', 'programmation', 'service', 'component'];

  genererMot(): string {
    const index = Math.floor(Math.random() * this.mots.length);
    return this.mots[index];
  }
}
