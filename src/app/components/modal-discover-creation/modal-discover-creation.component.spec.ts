import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDiscoverCreationComponent } from './modal-discover-creation.component';

describe('ModalDiscoverCreationComponent', () => {
  let component: ModalDiscoverCreationComponent;
  let fixture: ComponentFixture<ModalDiscoverCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDiscoverCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDiscoverCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
