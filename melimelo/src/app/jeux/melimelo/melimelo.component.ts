// melimelo.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MelimeloService } from '../../service/melimelo.service';

@Component({
  selector: 'app-melimelo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './melimelo.component.html',
  styleUrls: ['./melimelo.component.scss']
})
export class MelimeloComponent {
  gridSize = 10;
  letters = signal<string[][]>([]);
  selectedCells = signal<{ row: number, col: number }[]>([]);
  foundWords = signal<string[]>([]);
  solutionPositions = signal<{ row: number, col: number }[]>([]);
  solutionVisible = false;
  themes: string[] = [];
  themeActuel: string = '';
  
  motsADeviner = ['ANGULAR', 'MELO', 'CODE'];

  constructor(private melimeloService: MelimeloService) {}

  ngOnInit() {
    this.themes = this.melimeloService.getThemes();
    this.choisirTheme(this.themes[0]); // charge un thème par défaut
  }
  
  choisirTheme(theme: string) {
    this.themeActuel = theme;
    this.motsADeviner = this.melimeloService.getMotsParTheme(theme);
    this.genererGrille();
  }
  
  afficherSolution() {
    this.solutionVisible = true;
  }

  estDansSolution(row: number, col: number): boolean {
    return this.solutionPositions().some(pos => pos.row === row && pos.col === col);
  }

  genererGrille() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const grid: string[][] = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(''));
    const positions: { row: number; col: number }[] = [];

    // Insère les mots à deviner horizontalement
    this.motsADeviner.forEach(mot => {
      let placed = false;
      const maxAttempts = 100;
      let attempts = 0;
    
      while (!placed && attempts < maxAttempts) {
        attempts++;
    
        // Directions possibles : [dx, dy]
        const directions = [
          { dx: 1, dy: 0 },   // horizontal →
          { dx: 0, dy: 1 },   // vertical ↓
          { dx: 1, dy: 1 },   // diagonal ↘
          { dx: 1, dy: -1 }   // diagonal ↗
        ];
    
        const { dx, dy } = directions[Math.floor(Math.random() * directions.length)];
        const startRow = dy === -1
          ? Math.floor(Math.random() * (this.gridSize - mot.length)) + mot.length
          : Math.floor(Math.random() * (this.gridSize - (dy * mot.length || 1) + 1));
        const startCol = Math.floor(Math.random() * (this.gridSize - (dx * mot.length || 1) + 1));
    
        const coords: { row: number; col: number }[] = [];
    
        let fits = true;
        for (let i = 0; i < mot.length; i++) {
          const row = startRow + i * dy;
          const col = startCol + i * dx;
          if (grid[row][col] && grid[row][col] !== mot[i]) {
            fits = false;
            break;
          }
          coords.push({ row, col });
        }
    
        if (fits) {
          for (let i = 0; i < mot.length; i++) {
            const row = coords[i].row;
            const col = coords[i].col;
            grid[row][col] = mot[i];
          }
          positions.push(...coords);
          placed = true;
        }
      }
    });
    

    // Complète les cases vides avec des lettres aléatoires
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (!grid[i][j]) {
          grid[i][j] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
      }
    }

    this.letters.set(grid);
    this.selectedCells.set([]);
    this.foundWords.set([]);
    this.solutionVisible = false;
    this.solutionPositions.set(positions);
  }

  onCellClick(row: number, col: number) {
    const cell = { row, col };
    const selected = this.selectedCells();
    const index = selected.findIndex(c => c.row === row && c.col === col);
    if (index >= 0) {
      this.selectedCells.set(selected.filter((_, i) => i !== index));
    } else {
      this.selectedCells.set([...selected, cell]);
    }
  }

  validerMot() {
    const word = this.selectedCells()
      .map(c => this.letters()[c.row][c.col])
      .join('');

    if (this.motsADeviner.includes(word) && !this.foundWords().includes(word)) {
      this.foundWords.set([...this.foundWords(), word]);
      this.selectedCells.set([]);
    }
  }

  nouvelleGrille() {
    this.genererGrille();
  }

  get grid() {
    return this.letters();
  }

  get selected() {
    return this.selectedCells();
  }

  get found() {
    return this.foundWords();
  }

  isSelected(row: number, col: number): boolean {
    return this.selected.some(c => c.row === row && c.col === col);
  }

  get tousLesMotsTrouves() {
    return this.motsADeviner.every(mot => this.foundWords().includes(mot));
  }
}
