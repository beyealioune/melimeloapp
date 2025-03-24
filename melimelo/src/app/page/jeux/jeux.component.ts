import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jeux',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './jeux.component.html',
  styleUrl: './jeux.component.css'
})
export class JeuxComponent {

}
