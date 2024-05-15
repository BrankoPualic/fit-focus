import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-user-func',
  templateUrl: './user-func.component.html',
  styleUrl: './user-func.component.scss',
})
export class UserFuncComponent implements AfterViewInit {
  @ViewChild(TabsetComponent)
  tabset?: TabsetComponent;

  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    if (this.tabset) {
      this.tabset.tabs[2].active = true;
      this.cdr.detectChanges();
    }
  }
}
