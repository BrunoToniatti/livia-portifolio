import { Component } from '@angular/core';
import { LabioComponent } from './components/labio/labio.component';
import { VasosComponent } from './components/vasos/vasos.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    LabioComponent,
    VasosComponent
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {

}
