import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarksheetsPage } from './marksheets.page';

describe('MarksheetsPage', () => {
  let component: MarksheetsPage;
  let fixture: ComponentFixture<MarksheetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksheetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarksheetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
