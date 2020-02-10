import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StPlaylistCardComponent } from './st-playlist-card.component';

describe('StPlaylistCardComponent', () => {
  let component: StPlaylistCardComponent;
  let fixture: ComponentFixture<StPlaylistCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StPlaylistCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StPlaylistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
