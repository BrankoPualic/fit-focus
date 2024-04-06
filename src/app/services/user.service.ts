import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IUserDto } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dataService: DataService) {}

  getUserInfo() {
    return this.dataService.get<IUserDto>('assets/data/user.json');
  }
}
