import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalListContactsComponent } from './horizontal-list-contacts.component';

describe('HorizontalListContactsComponent', () => {
  let component: HorizontalListContactsComponent;
  let fixture: ComponentFixture<HorizontalListContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalListContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalListContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
