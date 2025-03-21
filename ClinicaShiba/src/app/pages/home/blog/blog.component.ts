import { Component } from '@angular/core';

interface BlogPost {
  title: string;
  text: string;
  tags: string[];
  image: string;
  link: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  blogPosts: BlogPost[] = [
    {
      title: 'El Reto de Viajar con Gatos',
      text: 'Personalizamos nuestras recomendaciones según tus necesidades específicas.',
      tags: ['Datos Curiosos', 'Gatos'],
      image:
        'https://images.unsplash.com/photo-1548403119-4f9f60f7c064?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3',
      link: '/blog',
    },
    {
      title: 'Perros v.s Gatos',
      text: 'El buen cuidado: una necesidad de perros y gatos.',
      tags: ['Perros', 'Gatos'],
      image:
        'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500',
      link: '/blog',
    },
    {
      title: 'Ladridos y Salud',
      text: 'Que sus ladridos sean de felicidad: ¿Cómo cuidar a mi mascota?',
      tags: ['Datos Curiosos', 'Perros'],
      image:
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500',
      link: '/blog',
    },
    {
      title: 'Tips de viaje con Perros',
      text: 'Personalizamos nuestras recomendaciones según tus necesidades específicas.',
      tags: ['Datos Curiosos', 'Perros'],
      image:
        'https://plus.unsplash.com/premium_photo-1738781517833-e24e4a6561f7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
      link: '/blog',
    },
  ];

  currentIndex = 0;

  visiblePosts(): BlogPost[] {
    const total = this.blogPosts.length;
    return Array.from({ length: 3 }, (_, i) => {
      const index = (this.currentIndex + i) % total;
      return this.blogPosts[index];
    });
  }

  prev(): void {
    const total = this.blogPosts.length;
    this.currentIndex = (this.currentIndex - 1 + total) % total;
  }

  next(): void {
    const total = this.blogPosts.length;
    this.currentIndex = (this.currentIndex + 1) % total;
  }
}
