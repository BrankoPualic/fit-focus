import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WorkoutService } from '../../../services/workout.service';
import { IEditSetDto, IExerciseDto, ISetDto } from '../../../common/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrl: './create-workout.component.scss',
})
export class CreateWorkoutComponent implements OnInit {
  newWorkout: FormGroup = this.fb.group({});
  defaultDate = new Date();
  addedExercises: IExerciseDto[] = [];
  modalRef?: BsModalRef;
  editingSet = {} as IEditSetDto;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private workoutService: WorkoutService,
    private router: Router
  ) {
    modalService.config.ignoreBackdropClick = true;
  }
  ngOnInit(): void {
    this.initForm();
    this.newExerciseSubscription();
    this.subscriptionForEditSet();
  }

  initForm() {
    this.newWorkout = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      date: [this.defaultDate, Validators.required],
      exercises: [[], Validators.required],
    });
  }

  newExerciseSubscription() {
    this.workoutService.addExercise$.subscribe({
      next: (data) => {
        if (data) {
          const setsAsArray = new Array(Number(data.sets)).fill(0);
          let forForm = [...this.addedExercises];
          let sets: ISetDto[] = [];
          for (let i = 0; i < setsAsArray.length; i++) {
            sets.push({
              weight: data.weight!,
              repetitions: data.repetitions,
              notes: data.notes,
            });
          }
          const newDataObject = {
            name: data.exercise,
            sets,
          };
          forForm.push(newDataObject);
          this.addedExercises.push(newDataObject);
          this.newWorkout.get('exercises')?.setValue(forForm);
        }
      },
    });
  }

  subscriptionForEditSet() {
    this.workoutService.editSet$.subscribe({
      next: (data) => {
        if (data) {
          this.updateGrid(data);
        }
      },
    });
  }

  openAddExerciseModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  disableTyping(event: any) {
    event.preventDefault();
  }

  editExercise(
    name: string,
    set: ISetDto,
    exerciseIndex: number,
    setIndex: number,
    template: any
  ) {
    this.editingSet = {
      name,
      date: this.newWorkout.get('date')?.value,
      set,
      exerciseIndex,
      setIndex,
    };

    this.modalRef = this.modalService.show(template);
  }

  onWorkoutComplete() {
    this.workoutService.setNewWorkout(this.newWorkout.value);
    this.addedExercises = [];
    this.workoutService.setNewWorkoutExercise(null);
    this.newWorkout.reset();
    console.log(this.addedExercises);
    this.router.navigateByUrl('/workouts');
  }

  private updateGrid(data: IEditSetDto) {
    this.addedExercises.forEach((el, index) => {
      if (el.name === data.name && index === data.exerciseIndex) {
        el.sets[data.setIndex] = data.set;
      }
    });
  }
}
