import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabioComponent } from './labio.component';

describe('LabioComponent', () => {
  let component: LabioComponent;
  let fixture: ComponentFixture<LabioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
