import { Component, OnInit } from '@angular/core';
import { IncomeSource } from './income-source.model';
import { IncomeSourcesService } from './income-sources.service';

@Component({
  selector: 'app-income-sources',
  templateUrl: './income-sources.page.html',
  styleUrls: ['./income-sources.page.scss'],
})
export class IncomeSourcesPage implements OnInit {
  sources: IncomeSource[];

  constructor(
    private incomeSourceService: IncomeSourcesService
  ) { }

  ngOnInit() {
    this.incomeSourceService.getListObservable().subscribe(srcs => {
      this.sources = srcs;
    });
  }

}
