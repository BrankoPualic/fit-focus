import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IUserBodyweightDto, IUserDto } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dataService: DataService) {}

  getUserInfo() {
    return this.dataService.get<IUserDto>('assets/data/user.json');
  }

  getUserBodyweightLog() {
    return this.dataService.get<IUserBodyweightDto[]>(
      'assets/data/bodyweight.json'
    );
  }
}
