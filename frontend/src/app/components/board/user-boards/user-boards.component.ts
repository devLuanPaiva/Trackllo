import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardFormComponent } from '../board-form/board-form.component';
import { IBoard, IUser } from '../../../models';
import { BoardService } from '../../../services/board.service';
import { CommonModule } from '@angular/common';
import { latterAnimation } from '../../../animations';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-user-boards',
  imports: [BoardFormComponent, RouterModule, CommonModule, AlertComponent],
  templateUrl: './user-boards.component.html',
  animations: [latterAnimation],
})
export class UserBoardsComponent implements OnInit {
  @Input() user!: IUser;
  boards: IBoard[] = [];
  showForm: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  constructor(private readonly boardService: BoardService) {}
  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.boardService.getUserBoards().subscribe({
      next: (boards) => {
        if (!boards || boards.length === 0) {
          this.boards = [];
          return;
        }
        this.boards = boards;
      },
      error: (err) => (this.errorMessage = err),
    });
  }


  onCreateBoard(title: string): void {
    this.boardService.createBoard(title).subscribe({
      next: () => {
        this.successMessage = 'Projeto criado com sucesso!';
        this.loadBoards();
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  onDeleteBoard(id: string): void {
    this.boardService.deleteBoard(id).subscribe({
      next: () => {
        this.successMessage = 'Projeto deletado com sucesso!';
        this.loadBoards();
      },
      error: (err) => (this.errorMessage = err),
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
