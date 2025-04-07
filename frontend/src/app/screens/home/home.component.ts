import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../models';
import { AuthenticationService } from '../../services/authentication.service';
import { UserBoardsComponent } from '../../components/board/user-boards/user-boards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserBoardsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user: IUser = {
    id: '',
    name: '',
    email: '',
  };
  constructor(
    private readonly authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getLoggedUser();
    if (!user) {
      console.error('user undefined!');
      return;
    }
    this.user = user;
  }
}
