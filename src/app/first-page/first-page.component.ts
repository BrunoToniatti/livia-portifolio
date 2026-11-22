import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AboutComponent } from "./components/about/about.component";
import { FooterComponent } from "./components/footer/footer.component";
import { JobsComponent } from './components/jobs/jobs.component';
import { DividerComponent } from './components/divider/divider.component';
import { HeroComponent } from './components/hero/hero.component';


@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CarouselComponent,
    AboutComponent,
    FooterComponent,
    JobsComponent,
    DividerComponent,
    HeroComponent

  ],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.scss'
})
export class FirstPageComponent {

}
