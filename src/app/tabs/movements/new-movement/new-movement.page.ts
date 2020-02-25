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
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AccountsService } from '../../accounts/accounts.service';

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
    private accountsService: AccountsService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadForm({ detail: {} });
  }

  async onConfirm() {
    const loader = await this.loadingCtrl.create();
    const toast = await this.toastCtrl.create({
      message: '¡Transacción registrada!',
      duration: 2000
    });
    loader.present().then(() => {
      this.movementsService
        .addDocument({ ...this.form.value, type: this.type })
        .then(() => {
          toast.present();
        }).catch(() => {
          toast.message = 'Hubo un problema :(';
          toast.present();
        }).finally(() => {
          loader.dismiss();
          this.router.navigate(['/', 'tabs', 'movements']);
        });
    });
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
