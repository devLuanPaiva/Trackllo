import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IBoard, IUser } from '../../../models';
import { MatDialog } from '@angular/material/dialog';
import { latterAnimation } from '../../../animations';
import { openConfirmationDialog } from '../../../utils';
import { Component, Input, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BoardService } from '../../../services/board.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertComponent } from '../../shared/alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BoardFormComponent } from '../board-form/board-form.component';
@Component({
  selector: 'app-user-boards',
  imports: [BoardFormComponent, RouterModule, CommonModule, AlertComponent, FontAwesomeModule, TranslateModule, MatProgressBarModule],
  templateUrl: './user-boards.component.html',
  animations: [latterAnimation],
})
export class UserBoardsComponent implements OnInit {
  @Input() user!: IUser;
  boards: IBoard[] = [];
  showForm: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoadingOperation = false;
  constructor(
    private readonly boardService: BoardService,
    private readonly dialog: MatDialog,
    private readonly translate: TranslateService
  ) { }

  icons = {
    trash: faTrash,
  };
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
    this.isLoadingOperation = true;
    this.boardService.createBoard(title).subscribe({
      next: () => {
        this.successMessage = this.translate.instant('8372978979');
        this.loadBoards();
      },
      error: (err) => (this.errorMessage = err),
      complete: () => (this.isLoadingOperation = false),
    });
  }

  onDeleteBoard(event: MouseEvent, id: string): void {
    event.stopPropagation();
    event.preventDefault();
    this.isLoadingOperation = true;
    openConfirmationDialog(this.dialog, this.translate.instant('5367357768')).subscribe((result) => {
      if (result) {
        this.boardService.deleteBoard(id).subscribe({
          next: (): void => {
            this.successMessage = this.translate.instant('2786786786');
            this.loadBoards();
          },
          error: (err: string): void => {
            this.errorMessage = err;
          },
          complete: () => (this.isLoadingOperation = false),
        });
      }
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
