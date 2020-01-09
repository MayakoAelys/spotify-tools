import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDuplicatePageComponent } from './remove-duplicate-page.component';

describe('RemoveDuplicatePageComponent', () => {
  let component: RemoveDuplicatePageComponent;
  let fixture: ComponentFixture<RemoveDuplicatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveDuplicatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveDuplicatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
