import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardFormComponent } from '../board-form/board-form.component';
import { IBoard, IUser } from '../../../models';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-user-boards',
  imports: [BoardFormComponent, RouterModule],
  templateUrl: './user-boards.component.html',
})
export class UserBoardsComponent implements OnInit {
  @Input() user!: IUser;
  boards: IBoard[] = [];
  showForm: boolean = false;
  constructor(private readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.loadBoards();
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
}
