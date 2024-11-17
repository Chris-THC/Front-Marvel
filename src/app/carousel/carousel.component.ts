import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy {
  slides = [
    'https://m.media-amazon.com/images/I/71LHQ1o-3HL._AC_UF894,1000_QL80_.jpg',
    'https://i.blogs.es/6a4817/marvel-secret-wars/450_1000.webp',
    'https://lumiere-a.akamaihd.net/v1/images/disneyplus-marvel_c169_r_46985aa3.jpeg',
  ];
  currentSlide = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    // Limpia el intervalo cuando se destruya el componente
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 1500); // Cambiar cada 8 segundos
  }

  getTransformStyle() {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
