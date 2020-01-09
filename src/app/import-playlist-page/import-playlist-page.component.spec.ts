import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPlaylistPageComponent } from './import-playlist-page.component';

describe('ImportPlaylistPageComponent', () => {
  let component: ImportPlaylistPageComponent;
  let fixture: ComponentFixture<ImportPlaylistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPlaylistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPlaylistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
