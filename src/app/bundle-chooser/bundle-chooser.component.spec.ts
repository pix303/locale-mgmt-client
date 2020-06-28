import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleChooserComponent } from './bundle-chooser.component';

describe('BundleChooserComponent', () => {
  let component: BundleChooserComponent;
  let fixture: ComponentFixture<BundleChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundleChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
