import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExpenseFormComponent } from './forms/expense-form/expense-form.component';
import { IncomeFormComponent } from './forms/income-form/income-form.component';
import { ExchangeFormComponent } from './forms/exchange-form/exchange-form.component';
import { MovementForm } from './forms/movement-form';
import { MovementsService } from '../movements.service';
import { Movement, Expense } from '../movements.model';

const formTypes = {
  EGRESO: ExpenseFormComponent,
  INGRESO: IncomeFormComponent,
  INTERCUENTA: ExchangeFormComponent
};

@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.page.html',
  styleUrls: ['./new-movement.page.scss']
})
export class NewMovementPage implements OnInit {
  form: FormGroup;
  @ViewChild('movementFormContainer', { read: ViewContainerRef, static: true })
  movementFormContainer: ViewContainerRef;
  type = 'EGRESO';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private movementsService: MovementsService) {}

  ngOnInit() {
    this.loadForm({ detail: {} });
    // const col = this.movementsService.getCollection().subscribe((collection) => {
    //   console.log('COLLECTION: ', collection);
    // });
    // console.log(col);
    this.movementsService.getMovements().subscribe(movements => {
      console.log('movements; ', movements);
    })
  }

  onConfirm() {
    console.log('FORM: ', this.form);
    this.movementsService.addExpense({...this.form.value} as Expense);
  }

  loadForm(event: any) {
    this.form = new FormGroup({});
    this.type = event.detail.value || this.type;
    this.movementFormContainer.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<MovementForm>(formTypes[this.type]);
    const componentRef = this.movementFormContainer.createComponent(
      componentFactory
    );
    componentRef.instance.formEmitter.asObservable().subscribe(childForm => {
      this.form = childForm;
    });
  }
}
