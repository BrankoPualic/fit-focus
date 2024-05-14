import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bodyweight-modal',
  templateUrl: './bodyweight-modal.component.html',
  styleUrl: './bodyweight-modal.component.scss',
})
export class BodyweightModalComponent implements AfterViewInit {
  @Output() closeModalEvent = new EventEmitter<void>();
  @ViewChild('btn') button?: ElementRef;
  modalRef?: BsModalRef;
  defaultDate = new Date();
  bsConfig = {
    isAnimated: true,
    containerClass: 'theme-dark-blue',
  };
  newLog: FormGroup = this.fb.group({});

  constructor(private modalService: BsModalService, private fb: FormBuilder) {}
  ngAfterViewInit(): void {
    if (this.button) {
      this.button.nativeElement.click();
    }

    this.initForm();
  }

  initForm() {
    this.newLog = this.fb.group({
      bw: [
        '',
        [
          Validators.maxLength(4),
          Validators.required,
          Validators.pattern(/^\d{2,}(\.\d+)?$/),
        ],
      ],
      bf: [
        '',
        [
          Validators.maxLength(4),
          Validators.required,
          Validators.pattern(/^\d{2,}(\.\d+)?$/),
        ],
      ],
      date: [this.defaultDate, Validators.required],
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
    console.log(this.newLog.value);
    this.hide();
  }
}
