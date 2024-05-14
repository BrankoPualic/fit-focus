import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChartService } from '../../services/chart.service';
import { BodyweightService } from '../../services/bodyweight.service';
import { IUserBodyweightDto } from '../../common/interfaces';

@Component({
  selector: 'app-bodyweight-modal',
  templateUrl: './bodyweight-modal.component.html',
  styleUrl: './bodyweight-modal.component.scss',
})
export class BodyweightModalComponent implements AfterViewInit {
  @Input('edit') editObj?: IUserBodyweightDto;
  @Output() closeModalEvent = new EventEmitter<void>();
  @ViewChild('btn') button?: ElementRef;
  modalRef?: BsModalRef;
  defaultDate = new Date();
  bsConfig = {
    isAnimated: true,
    containerClass: 'theme-dark-blue',
  };
  newLog: FormGroup = this.fb.group({});

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private chartService: ChartService,
    private bodyweightService: BodyweightService
  ) {}
  ngAfterViewInit(): void {
    if (this.button) {
      this.button.nativeElement.click();
    }

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
        [Validators.maxLength(4), Validators.pattern(/^\d{2,}(\.\d+)?$/)],
      ],
      date: [
        obj?.date ? new Date(obj.date) : this.defaultDate,
        Validators.required,
      ],
    });
  }

  open(content: TemplateRef<void>) {
    this.modalRef = this.modalService.show(content);
  }

  hide() {
    this.modalRef?.hide();
    this.closeModalEvent.emit();
  }

  disableTyping(event: any) {
    event.preventDefault();
  }

  logBodyweight() {
    const data = {
      label: this.chartService.getBodyweightDateLabel(
        this.newLog.get('date')?.value
      ),
      bw: this.newLog.get('bw')?.value,
      bf: this.newLog.get('bf')?.value,
    };
    this.chartService.setNewBodyweightLog(data);

    const data2: IUserBodyweightDto = {
      date: this.newLog.get('date')?.value,
      bodyweight: this.newLog.get('bw')?.value,
      bodyfat: this.newLog.get('bf')?.value,
    };
    this.bodyweightService.setNewBodyweightLog(data2);

    this.hide();
  }
}
