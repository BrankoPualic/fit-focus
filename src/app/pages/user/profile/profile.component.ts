import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IUserDto } from '../../../common/interfaces';
import { EExperienceLevel, EWorkoutType } from '../../../common/eNums';

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

  getWorkoutTypeString(workoutType: EWorkoutType) {
    switch (workoutType) {
      case EWorkoutType.Weightlifting:
        return 'Weightlifting';
      case EWorkoutType.CrossFit:
        return 'CrossFit';
      case EWorkoutType.Powerlifting:
        return 'Powerlifting';
      case EWorkoutType.Bodybuilding:
        return 'Bodybuilding';
      case EWorkoutType.Cardio:
        return 'Cardio';
      default:
        return 'Unknown';
    }
  }

  getUserExperienceLevel(experienceLevel: EExperienceLevel) {
    switch (experienceLevel) {
      case EExperienceLevel.Beginner:
        return 'Beginner';
      case EExperienceLevel.Intermediate:
        return 'Intermediate';
      case EExperienceLevel.Advanced:
        return 'Advanced';
    }
  }
}
