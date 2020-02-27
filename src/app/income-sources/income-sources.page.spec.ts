import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncomeSourcesPage } from './income-sources.page';

describe('IncomeSourcesPage', () => {
  let component: IncomeSourcesPage;
  let fixture: ComponentFixture<IncomeSourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeSourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeSourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
