import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsListContactsComponent } from './cards-list-contacts.component';

describe('CardsListContactsComponent', () => {
  let component: CardsListContactsComponent;
  let fixture: ComponentFixture<CardsListContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsListContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsListContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
