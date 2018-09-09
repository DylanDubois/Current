import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEventCreationComponent } from './modal-event-creation.component';

describe('ModalEventCreationComponent', () => {
  let component: ModalEventCreationComponent;
  let fixture: ComponentFixture<ModalEventCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEventCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEventCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
