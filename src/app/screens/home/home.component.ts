import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../../components/board/board.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
  ) { }


}
