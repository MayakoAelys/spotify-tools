import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StSelectComponent } from './st-select.component';

describe('StSelectComponent', () => {
  let component: StSelectComponent;
  let fixture: ComponentFixture<StSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
