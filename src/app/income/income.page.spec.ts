import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncomePage } from './income.page';

describe('IncomePage', () => {
  let component: IncomePage;
  let fixture: ComponentFixture<IncomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
