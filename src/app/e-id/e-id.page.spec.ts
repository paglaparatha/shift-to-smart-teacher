import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EIdPage } from './e-id.page';

describe('EIdPage', () => {
  let component: EIdPage;
  let fixture: ComponentFixture<EIdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EIdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
