import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IUserDto } from '../../../common/interfaces';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user?: IUserDto;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (user) => (this.user = user),
    });
  }
}
