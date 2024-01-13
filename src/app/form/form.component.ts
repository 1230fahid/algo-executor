import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() formGroup: FormGroup;
  @Input() action: string;
  @Input() properties;
  @Output() formSubmission: EventEmitter<FormGroup>;

  constructor() {
    this.formSubmission = new EventEmitter<FormGroup>();
  }

  onSubmission() {
    this.formSubmission.emit(this.formGroup);
  }

  getFormClasses() {
    if(this.properties === undefined || !('class' in this.properties)) {
      return ''
    }
    return this.properties.class;
  }

  getFormStyles() {
    if(this.properties === undefined || !('style' in this.properties)) {
      return {}
    }
    return this.properties.style;
  }

  getButtonColor() {
    if(this.properties === undefined || !('bootStrapButtonClass' in this.properties)) {
      return ''
    }
    return this.properties.bootStrapButtonClass
  }

  getDisability() {
    if(this.properties === undefined || !('disabled' in this.properties)) {
      return false;
    }
    return this.properties.disabled;
  }
}
