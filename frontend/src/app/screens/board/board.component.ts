import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IBoard } from '../../models';
import { BoardService } from '../../services/board.service';
import { ColumnsComponent } from '../../components/board/columns/columns.component';

@Component({
  selector: 'app-board',
  imports: [ColumnsComponent],
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  board$!: Observable<IBoard | null>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.board$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return this.boardService.getBoardById(id!);
      })
    );
  }
}
