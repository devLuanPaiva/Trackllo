import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardFormComponent } from '../board-form/board-form.component';
import { IBoard, IUser } from '../../../models';
import { BoardService } from '../../../services/board.service';
import { CommonModule } from '@angular/common';
import { latterAnimation } from '../../../animations';

@Component({
  selector: 'app-user-boards',
  imports: [BoardFormComponent, RouterModule, CommonModule],
  templateUrl: './user-boards.component.html',
  animations: [latterAnimation],
})
export class UserBoardsComponent implements OnInit {
  @Input() user!: IUser;
  boards: IBoard[] = [];
  showForm: boolean = false;
  letters: string[] = [];
  constructor(private readonly boardService: BoardService) {}
  ngOnInit(): void {
    this.loadBoards();
    this.loadLitters();
  }

  loadBoards(): void {
    this.boardService.getUserBoards().subscribe({
      next: (boards) => {
        if (!boards || boards.length === 0) {
          console.error('Boards not found!');
          this.boards = [];
          return;
        }
        this.boards = boards;
      },
      error: (err) => {
        console.error('Erro ao carregar boards:', err);
      },
    });
  }

  loadLitters(): void {
    const message = `Olá, ${this.user?.name || 'usuário'}!`;
    this.letters = message.split('');
  }

  onCreateBoard(title: string): void {
    this.boardService.createBoard(title).subscribe({
      next: () => this.loadBoards(),
      error: (err) => console.error('Erro ao criar board:', err),
    });
  }

  onDeleteBoard(id: string): void {
    this.boardService.deleteBoard(id).subscribe({
      next: () => this.loadBoards(),
      error: (err) => console.error('Erro ao deletar board:', err),
    });
  }
  getRandomStyle(): Record<string, string> {
    const randomX = Math.floor(Math.random() * 40) - 20;
    return {
      display: 'inline-block',
      transform: `translateX(${randomX}px)`,
    };
  }
}
