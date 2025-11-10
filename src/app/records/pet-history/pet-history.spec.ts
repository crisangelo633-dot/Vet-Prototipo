import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHistory } from './pet-history';

describe('PetHistory', () => {
  let component: PetHistory;
  let fixture: ComponentFixture<PetHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
