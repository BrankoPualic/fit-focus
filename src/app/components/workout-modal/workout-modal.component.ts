import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEditSetDto } from '../../common/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-modal',
  templateUrl: './workout-modal.component.html',
  styleUrl: './workout-modal.component.scss',
})
export class WorkoutModalComponent implements OnInit {
  @Input('edit') editObj = {} as IEditSetDto;
  @Output() closeModalEvent = new EventEmitter<void>();
  defaultDate = new Date();
  bsConfig = {
    isAnimated: true,
    containerClass: 'theme-dark-blue',
  };
  editSet: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.initForm(this.editObj);
  }

  initForm(obj?: IEditSetDto) {
    this.editSet = this.fb.group({
      weight: [
        obj?.set.weight ? obj.set.weight : '',
        [Validators.maxLength(3), Validators.pattern(/^\d+$/)],
      ],
      repetitions: [
        obj?.set.repetitions ? obj.set.repetitions : '',
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern(/^\d+$/),
        ],
      ],
      notes: [obj?.set.notes ? obj.set.notes : '', Validators.maxLength(500)],
    });
  }

  hide() {
    this.closeModalEvent.emit();
  }

  saveEditedSet() {
    const toSend: IEditSetDto = {
      ...this.editObj,
      set: this.editSet.value,
    };
    this.workoutService.setEditedSet(toSend);

    this.hide();
  }
}
