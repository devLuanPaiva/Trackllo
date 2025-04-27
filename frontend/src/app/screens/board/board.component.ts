import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IBoard } from '../../models';
import { BoardService } from '../../services/board.service';
import { ColumnsComponent } from '../../components/board/columns/columns.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/template/header/header.component';
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import { LayoutComponent } from '../../components/template/layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-board',
  imports: [
    ColumnsComponent,
    CommonModule,
    HeaderComponent,
    LoadingComponent,
    LayoutComponent,
    TranslateModule
  ],
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  board$!: Observable<IBoard>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.board$ = this.route.data.pipe(map((data) => data['board']));
  }
}
