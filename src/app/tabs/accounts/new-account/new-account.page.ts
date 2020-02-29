import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/shared/helpers.service';
import { AccountsService } from '../accounts.service';

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
    private helpersService: HelpersService) { }

  ngOnInit() {
    this.initializeForm();
  }

  ionViewWillEnter() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      balance: ['', Validators.required],
      type: ['EFECTIVO', Validators.required]
    });
  }

  async onConfirm() {
    await this.helpersService.handlePromise(
      this.accountsService.addDocument({...this.form.value}),
      {
        showToast: true,
        successMessage: '¡Cuenta creada!',
        errorMessage: 'No pudimos crear tu cuenta'
      }
    );
    this.router.navigate(['/', 'tabs', 'accounts']);
  }

}
