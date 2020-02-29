import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/shared/helpers.service';
import { MovementsService } from '../movements.service';
import { ExchangeFormComponent } from './forms/exchange-form/exchange-form.component';
import { ExpenseFormComponent } from './forms/expense-form/expense-form.component';
import { IncomeFormComponent } from './forms/income-form/income-form.component';
import { MovementForm } from './forms/movement-form';

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
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private movementsService: MovementsService,
    private helpersService: HelpersService
  ) {}

  ngOnInit() {
    this.loadForm({ detail: {} });
  }

  async onConfirm() {
    await this.helpersService.handlePromise(
      this.movementsService
        .addDocument({ ...this.form.value, type: this.type }),
        {
          showToast: true,
          successMessage: '¡Transacción registrada!',
          errorMessage: 'Hubo un problema :('
        }
    );
    this.form.reset();
    this.router.navigate(['/', 'tabs', 'movements']);
  }

  loadForm(event: any) {
    this.form = new FormGroup({});
    this.type = event.detail.value || this.type;
    this.movementFormContainer.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<
      MovementForm
    >(formTypes[this.type]);
    const componentRef = this.movementFormContainer.createComponent(
      componentFactory
    );
    componentRef.instance.formEmitter.asObservable().subscribe(childForm => {
      this.form = childForm;
    });
  }
}
