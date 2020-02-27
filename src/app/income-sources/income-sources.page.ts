import { Component, OnInit } from '@angular/core';
import { IncomeSource } from './income-source.model';
import { IncomeSourcesService } from './income-sources.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-income-sources',
  templateUrl: './income-sources.page.html',
  styleUrls: ['./income-sources.page.scss'],
})
export class IncomeSourcesPage implements OnInit {
  sources: IncomeSource[];
  form: FormGroup;

  constructor(
    private incomeSourceService: IncomeSourcesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.incomeSourceService.getListObservable().subscribe(srcs => {
      this.sources = srcs;
    });
    this.form = this.fb.group({
      name: ['', Validators.required],
      plannedIncome: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onConfirm() {
    if (this.form.valid) {
      this.incomeSourceService.addDocument({ ...this.form.value });
      this.form.reset();
    }
  }

}
