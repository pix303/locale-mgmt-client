import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleitemDetailComponent } from './localeitem-detail.component';

describe('LocaleitemDetailComponent', () => {
  let component: LocaleitemDetailComponent;
  let fixture: ComponentFixture<LocaleitemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaleitemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaleitemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
