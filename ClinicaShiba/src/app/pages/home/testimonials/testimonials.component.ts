import { Component, OnInit } from '@angular/core';

interface Testimonial {
  image: string;
  text: string;
  author: string;
  pet: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [
    {
      image:
        'https://images.unsplash.com/photo-1553322378-eb94e5966b0c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
      text: 'Son muy buenos, gracias por la ayuda, logramos resolver la urgencia de nuestro pequeño, y todo salió bien finalmente. También tienen una página web increíble, super fácil de usar y muy linda para ser una veterinaria :)',
      author: 'Viviana Suárez',
      pet: 'con su mascota Toby',
      rating: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1598681244895-1786022fe447?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
      text: 'Excelente atención, el Dr. Martínez fue muy profesional y cariñoso con mi gato. Las instalaciones son modernas y limpias.',
      author: 'Carlos Mendoza',
      pet: 'con su mascota Luna',
      rating: 5,
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1665296633338-f4fb190f71ef?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3',
      text: 'Mi perro recibió un tratamiento excepcional. El personal es muy atento y las consultas son muy completas. Recomiendo totalmente esta clínica.',
      author: 'Miguel Ángel Pérez',
      pet: 'con su mascota Max',
      rating: 4,
    },
  ];

  currentIndex = 0;
  fadeClass = 'fade-in';

  ngOnInit(): void {
    this.setFadeIn();
  }

  next(): void {
    this.setFadeOut();
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      this.setFadeIn();
    }, 300);
  }

  prev(): void {
    this.setFadeOut();
    setTimeout(() => {
      this.currentIndex =
        (this.currentIndex - 1 + this.testimonials.length) %
        this.testimonials.length;
      this.setFadeIn();
    }, 300);
  }

  goTo(index: number): void {
    this.setFadeOut();
    setTimeout(() => {
      this.currentIndex = index;
      this.setFadeIn();
    }, 300);
  }

  setFadeIn(): void {
    this.fadeClass = 'fade-in';
  }

  setFadeOut(): void {
    this.fadeClass = 'fade-out';
  }

  generateStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => (i < rating ? '★' : '☆'));
  }
}
