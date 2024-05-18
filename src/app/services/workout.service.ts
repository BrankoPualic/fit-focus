import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import {
  IAddExerciseDto,
  IEditSetDto,
  IExerciseTypeDto,
  IWorkoutDto,
} from '../common/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  workouts: IWorkoutDto[] = [];

  private editSet = new BehaviorSubject<IEditSetDto | null>(null);
  editSet$ = this.editSet.asObservable();

  private addExercise = new BehaviorSubject<IAddExerciseDto | null>(null);
  addExercise$ = this.addExercise.asObservable();

  private newWorkout = new BehaviorSubject<IWorkoutDto | null>(null);
  newWorkout$ = this.newWorkout.asObservable();

  constructor(private dataService: DataService) {}

  getAllWorkouts() {
    return this.dataService.get<IWorkoutDto[]>('assets/data/workouts.json');
  }

  setEditedSet(data: IEditSetDto) {
    this.editSet.next(data);
  }

  setNewWorkoutExercise(data: IAddExerciseDto | null) {
    this.addExercise.next(data);
  }

  getAllExercises() {
    return this.dataService.get<IExerciseTypeDto[]>(
      'assets/data/group-exercises.json'
    );
  }

  setNewWorkout(data: IWorkoutDto) {
    this.newWorkout.next(data);
  }
}
