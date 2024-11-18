import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiCallService } from '../core/services/api-call.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() series: { id: string; name: string }[] = [];

  slides: any[] = [];
  currentSlide = 0;
  intervalId: any;

  constructor(private apiCallService: ApiCallService) {}

  ngOnInit() {
    this.startAutoSlide();
    this.loadSeriesImages();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadSeriesImages(): void {
    this.series.forEach((serie) => {
      const idSerie = parseInt(serie.id);
      this.apiCallService.getSeriesById(idSerie).subscribe({
        next: (response) => {
          const seriesData = response.data.results[0];
          if (seriesData && seriesData.thumbnail) {
            const imageUrl = {
              title: seriesData.title,
              thumbnail: `${seriesData.thumbnail.path}.${seriesData.thumbnail.extension}`
            };
            this.slides.push(imageUrl);
          }
        },
        error: (error) => {
          console.error('Error loading series image:', error);
        },
      });
    });
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 1500);
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
