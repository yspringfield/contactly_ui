import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewContactComponent } from './form-new-contact.component';

describe('FormNewContactComponent', () => {
  let component: FormNewContactComponent;
  let fixture: ComponentFixture<FormNewContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
