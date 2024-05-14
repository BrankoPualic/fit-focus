import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { ILiftDataDto } from '../../common/interfaces';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss',
})
export class ExercisesComponent implements OnInit {
  liftData?: ILiftDataDto;

  constructor(private exerciseService: ExerciseService) {}

  async ngOnInit(): Promise<void> {
    this.liftData = await this.getLiftData();
  }

  async getLiftData(): Promise<ILiftDataDto> {
    return this.exerciseService.getLiftData().toResult();
  }
}
