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

  async ngOnInit(): Promise<void> {
    this.user = await this.getUserInfo();
  }

  async getUserInfo(): Promise<IUserDto> {
    return this.userService.getUserInfo().toResult();
  }
}
