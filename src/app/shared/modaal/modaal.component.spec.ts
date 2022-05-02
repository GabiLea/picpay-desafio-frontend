import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaalComponent } from './modaal.component';

describe('ModaalComponent', () => {
  let component: ModaalComponent;
  let fixture: ComponentFixture<ModaalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
