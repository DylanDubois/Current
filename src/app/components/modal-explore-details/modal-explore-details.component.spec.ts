import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExploreDetailsComponent } from './modal-explore-details.component';

describe('ModalExploreDetailsComponent', () => {
  let component: ModalExploreDetailsComponent;
  let fixture: ComponentFixture<ModalExploreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExploreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExploreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
