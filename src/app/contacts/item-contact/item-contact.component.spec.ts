import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemContactComponent } from './item-contact.component';

describe('ItemContactComponent', () => {
  let component: ItemContactComponent;
  let fixture: ComponentFixture<ItemContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
