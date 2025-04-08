import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../models';
import { AuthenticationService } from '../../services/authentication.service';
import { UserBoardsComponent } from '../../components/board/user-boards/user-boards.component';
import { HeaderComponent } from "../../components/template/header/header.component";
import { LoadingComponent } from "../../components/shared/loading/loading.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserBoardsComponent, HeaderComponent, LoadingComponent],
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
  ) { }

  ngOnInit(): void {
    const user = this.authService.getLoggedUser();
    if (!user) {
      console.error('user undefined!');
      return;
    }
    this.user = user;
  }
}
