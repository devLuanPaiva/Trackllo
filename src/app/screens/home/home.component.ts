import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { AuthenticationService } from '../../services/authentication.service';
import { IBoard } from '../../models';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  boards$: Observable<IBoard[]> | null = null;
  userId: string | null = null;
  newBoardTitle: string = '';
  showModal: boolean = false;

  constructor(
    private readonly boardService: BoardService,
    private readonly authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getLoggedUser();
    if (user) {
      this.userId = user.id;
      this.loadBoards();
    }
  }

  loadBoards(): void {
    if (this.userId) {
      this.boards$ = this.boardService.getBoards(this.userId);
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newBoardTitle = '';
  }

  createBoard(): void {
    if (this.userId && this.newBoardTitle.trim()) {
      this.boardService.createBoard(this.userId, this.newBoardTitle).subscribe(() => {
        this.loadBoards();
        this.closeModal();
      });
    }
  }
}
