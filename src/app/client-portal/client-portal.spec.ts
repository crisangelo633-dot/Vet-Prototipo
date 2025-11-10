import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPortal } from './client-portal';

describe('ClientPortal', () => {
  let component: ClientPortal;
  let fixture: ComponentFixture<ClientPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
