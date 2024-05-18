import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartService } from '../../services/chart.service';
import { BodyweightService } from '../../services/bodyweight.service';
import { IUserBodyweightDto } from '../../common/interfaces';
import { DATASET_LABELS } from '../../common/constants';

@Component({
  selector: 'app-bodyweight-modal',
  templateUrl: './bodyweight-modal.component.html',
  styleUrl: './bodyweight-modal.component.scss',
})
export class BodyweightModalComponent implements OnInit {
  @Input('edit') editObj?: IUserBodyweightDto;
  @Output() closeModalEvent = new EventEmitter<void>();
  defaultDate = new Date();
  bsConfig = {
    isAnimated: true,
    containerClass: 'theme-dark-blue',
  };
  newLog: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private chartService: ChartService,
    private bodyweightService: BodyweightService
  ) {}
  
  ngOnInit(): void {
    this.initForm(this.editObj);
  }

  initForm(obj?: IUserBodyweightDto) {
    this.newLog = this.fb.group({
      bw: [
        obj?.bodyweight ? obj.bodyweight : '',
        [
          Validators.maxLength(4),
          Validators.required,
          Validators.pattern(/^\d{2,}(\.\d+)?$/),
        ],
      ],
      bf: [
        obj?.bodyfat ? obj.bodyfat : null,
        [Validators.maxLength(4), Validators.pattern(/^\d{1,}(\.\d+)?$/)],
      ],
      date: [
        obj?.date ? new Date(obj.date) : this.defaultDate,
        Validators.required,
      ],
    });
  }

  hide() {
    this.closeModalEvent.emit();
  }

  disableTyping(event: any) {
    event.preventDefault();
  }

  logBodyweight() {
    const data = {
      label: this.chartService.getDateLabel(this.newLog.get('date')?.value),
      value: this.newLog.get('bw')?.value,
      datasetLabel: DATASET_LABELS.Bodyweight,
    };
    this.chartService.setNewBodyweightLog(data);

    const data2: IUserBodyweightDto = {
      date: this.newLog.get('date')?.value,
      bodyweight: this.newLog.get('bw')?.value,
      bodyfat: this.newLog.get('bf')?.value,
    };
    this.bodyweightService.setNewBodyweightLog(data2);

    if (this.newLog.get('bf')?.value) {
      const bfData = {
        label: this.chartService.getDateLabel(this.newLog.get('date')?.value),
        value: this.newLog.get('bf')?.value,
        datasetLabel: DATASET_LABELS.Bodyfat,
      };
      this.chartService.setNewBodyweightLog(bfData);

      const bfData2: IUserBodyweightDto = {
        date: this.newLog.get('date')?.value,
        bodyweight: this.newLog.get('bw')?.value,
        bodyfat: this.newLog.get('bf')?.value,
      };
      this.bodyweightService.setNewBodyweightLog(bfData2);
    }

    this.hide();
  }
}
