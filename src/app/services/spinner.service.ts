import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  loader(action: boolean) {
    action ? this.open() : this.close();
  }

  private open() {
    this.spinner.show();
  }

  private close() {
    this.spinner.hide();
  }
}
