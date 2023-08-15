import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateProgramsComponent } from './graduate-programs.component';

describe('GraduateProgramsComponent', () => {
  let component: GraduateProgramsComponent;
  let fixture: ComponentFixture<GraduateProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraduateProgramsComponent]
    });
    fixture = TestBed.createComponent(GraduateProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
