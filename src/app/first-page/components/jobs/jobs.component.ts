import { Component } from '@angular/core';
import { LabioComponent } from './components/labio/labio.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    LabioComponent
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {

}
