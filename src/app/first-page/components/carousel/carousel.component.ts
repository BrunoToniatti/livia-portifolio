import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  items = [
    {
      image: 'assets/banner/vasos.png',
      imageMobile: 'assets/banner/vasos.png', // Versão otimizada para mobile
      title: 'Secagem de Vasinhos',
      subtitle: 'Tratamento avançado para eliminar vasinhos e melhorar a aparência da pele',
      type: 'aplication-c',
      position: 'center center'
    },
    {
      image: 'assets/banner/desktop-botox.jpg',
      imageMobile: 'assets/banner/botox.jpg',
      title: 'Toxina Botulínica',
      subtitle: 'Suavize linhas de expressão e previna rugas com segurança',
      type: 'toxina-botulinica',
      position: 'center center'
    },
    {
      image: 'assets/banner/desktop-labio.jpg',
      imageMobile: 'assets/banner/labio.jpg',
      title: 'Especialidade em Lábios',
      subtitle: 'Realce natural e harmonioso para seus lábios',
      type: 'especialidade-labios',
      position: 'center center'
    }
  ];

  constructor(private ngZone: NgZone) { }

  currentIndex = 0;
  interval: any;

  touchStartX = 0;
  touchEndX = 0;

  ngOnInit() {
    if (this.items.length > 1) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex =
      this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  startAutoSlide() {
    this.ngZone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.ngZone.run(() => {
          this.nextSlide();
        });
      }, 7000);
    });
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    clearInterval(this.interval);
  }

  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const deltaX = this.touchStartX - this.touchEndX;
    const threshold = 50;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
    
    this.startAutoSlide();
  }
}
