import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TuitionsPage } from './tuitions.page';

describe('TuitionsPage', () => {
  let component: TuitionsPage;
  let fixture: ComponentFixture<TuitionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuitionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TuitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
