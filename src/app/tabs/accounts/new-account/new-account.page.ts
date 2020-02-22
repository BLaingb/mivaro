import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountsService: AccountsService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.initializeForm();
  }

  ionViewWillEnter() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      startingBalance: ['', Validators.required],
      type: ['EFECTIVO', Validators.required]
    });
  }

  async onConfirm() {
    const loader = await this.loadingCtrl.create();
    const toast = await this.toastCtrl.create({
      message: '¡Cuenta creada!',
      duration: 2000
    });
    loader.present().then(() => {
      this.accountsService
        .addDocument({ ...this.form.value, balance: this.form.value.startingBalance })
        .then(() => {
          toast.present();
        }).catch(() => {
          toast.message = 'Hubo un problema :(';
          toast.present();
        }).finally(() => {
          loader.dismiss();
          this.router.navigate(['/', 'tabs', 'accounts']);
        });
    });
  }

}
