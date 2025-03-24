import { Routes } from '@angular/router';

import { MelimeloComponent } from './jeux/melimelo/melimelo.component';
import { PenduComponent } from './jeux/pendu/pendu.component';
import { AnagrammeComponent } from './jeux/anagramme/anagramme.component';
import { AccueilComponent } from './page/accueil/accueil.component';
import { ContactComponent } from './page/contact/contact.component';
import { JeuxComponent } from './page/jeux/jeux.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'jeux', component: JeuxComponent },
  { path: 'jeux/melimelo', component: MelimeloComponent },
  { path: 'jeux/pendu', component: PenduComponent },
  { path: 'jeux/anagramme', component: AnagrammeComponent },
  { path: 'contact', component: ContactComponent },
];
