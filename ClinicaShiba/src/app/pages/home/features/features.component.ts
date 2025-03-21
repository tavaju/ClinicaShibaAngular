import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
})
export class FeaturesComponent implements AfterViewInit {
  @ViewChild('statsRef') statsRef!: ElementRef;
  animated = false;

  ngAfterViewInit(): void {
    if (!this.statsRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            const statElements =
              this.statsRef.nativeElement.querySelectorAll('.stat-number');
            statElements.forEach((el: HTMLElement) => {
              const target = parseInt(el.textContent || '0', 10);
              this.animateNumber(el, target, 2000);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(this.statsRef.nativeElement);
  }

  animateNumber(el: HTMLElement, target: number, duration: number): void {
    let current = 0;
    const increment = target / (duration / 16);
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        current = Math.min(current + increment, target);
        el.textContent = Math.floor(current).toString();
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toString();
      }
    };

    requestAnimationFrame(update);
  }
}
