import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LhoComponent } from './lho.component';

describe('LhoComponent', () => {
  let component: LhoComponent;
  let fixture: ComponentFixture<LhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
