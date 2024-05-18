import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { IExerciseTypeDto } from '../../common/interfaces';

@Component({
  selector: 'app-add-exercise-modal',
  templateUrl: './add-exercise-modal.component.html',
  styleUrl: './add-exercise-modal.component.scss',
})
export class AddExerciseModalComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<void>();
  addExercise: FormGroup = this.fb.group({});
  exercisesComplex: IExerciseTypeDto[] = [];
  exerciseControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.initExercises();
    this.initForm();
  }

  initForm() {
    this.addExercise = this.fb.group({
      exercise: ['', [Validators.required]],
      weight: [
        '',
        [Validators.maxLength(4), Validators.pattern(/^\d+(\.\d+)?$/)],
      ],
      sets: [
        '',
        [
          Validators.required,
          Validators.maxLength(2),
          Validators.pattern(/^\d+$/),
        ],
      ],
      repetitions: [
        '',
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern(/^\d+$/),
        ],
      ],
      notes: ['', Validators.maxLength(500)],
    });
  }

  initExercises() {
    this.workoutService.getAllExercises().subscribe({
      next: (data) => (this.exercisesComplex = data),
    });
  }

  hide() {
    this.closeModalEvent.emit();
  }

  saveAddedExercise() {
    this.workoutService.setNewWorkoutExercise(this.addExercise.value);
    this.hide();
  }

  onExerciseSelect(event: any) {
    this.addExercise.get('exercise')?.setValue(event.value);
  }
}
