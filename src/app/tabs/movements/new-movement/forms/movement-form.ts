import { EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

export class MovementForm {
  @Output() formEmitter = new EventEmitter<FormGroup>();
}
