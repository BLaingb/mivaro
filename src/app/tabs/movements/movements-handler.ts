import { FormGroup } from '@angular/forms';

export interface MovementsHandler {
  getReactiveFormGroup(): FormGroup;
}

export class ExpenseHandler implements MovementsHandler {
  getReactiveFormGroup(): FormGroup {
    return new FormGroup({});
  }
}
