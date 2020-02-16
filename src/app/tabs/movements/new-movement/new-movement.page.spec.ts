import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewMovementPage } from './new-movement.page';

describe('NewMovementPage', () => {
  let component: NewMovementPage;
  let fixture: ComponentFixture<NewMovementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMovementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMovementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
