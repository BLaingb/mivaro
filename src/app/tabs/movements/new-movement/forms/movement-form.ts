import { EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from 'src/app/tabs/accounts/accounts.model';

export class MovementForm {
  @Output() formEmitter = new EventEmitter<FormGroup>(true);
}
