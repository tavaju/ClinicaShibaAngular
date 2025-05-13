import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faMedkit, faPaw, faDollarSign, faChartLine, 
  faRotate, faTriangleExclamation, faCalendarAlt,
  faStethoscope, faSyringe, faClock
} from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardData, TratamientoPorMedicamento, TopTratamiento } from '../../model/dashboard';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Chart from 'chart.js/auto';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('medicamentoChart') medicamentoChartRef!: ElementRef;
  @ViewChild('topTratamientosChart') topTratamientosChartRef!: ElementRef;
  @ViewChild('veterinariosChart') veterinariosChartRef!: ElementRef;
  @ViewChild('mascotasChart') mascotasChartRef!: ElementRef;

  // Add ViewChild for veterinarios section
  @ViewChild('veterinarios-section', { static: false }) vetSection!: ElementRef;

  // Font Awesome icons
  faMedkit = faMedkit;
  faPaw = faPaw;
  faDollarSign = faDollarSign;
  faChartLine = faChartLine;
  faRotate = faRotate;
  faTriangleExclamation = faTriangleExclamation;
  faCalendarAlt = faCalendarAlt;
  faStethoscope = faStethoscope;
  faSyringe = faSyringe;
  faClock = faClock;

  dashboardData!: DashboardData;
  loading = true;
  error = false;
  currentDate = new Date();
  
  // Chart objects
  medicamentoChart!: Chart;
  topTratamientosChart!: Chart;
  veterinariosChart!: Chart;
  mascotasChart!: Chart;

  // For auto refresh
  private refreshSubscription!: Subscription;
  
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupAutoRefresh();
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    
    // Destroy charts to prevent memory leaks
    this.destroyCharts();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = false;
    this.currentDate = new Date();
    
    this.dashboardService.getDashboardData()
      .subscribe({
        next: (data) => {
          this.dashboardData = data;
          this.loading = false;
          
          // Initialize charts after data is loaded
          setTimeout(() => {
            this.initializeCharts();
          }, 100);
        },
        error: (err) => {
          console.error('Error al cargar datos del dashboard', err);
          this.error = true;
          this.loading = false;
        }
      });
  }

  setupAutoRefresh(): void {
    // Refresh data every 5 minutes (300000 ms)
    this.refreshSubscription = interval(300000)
      .pipe(
        switchMap(() => this.dashboardService.getDashboardData())
      )
      .subscribe({
        next: (updatedData) => {
          this.dashboardData = updatedData;
          this.currentDate = new Date();
          this.updateCharts();
        },
        error: (err) => console.error('Error en la actualización de datos:', err)
      });
  }

  initializeCharts(): void {
    this.createMedicamentosChart();
    this.createTopTratamientosChart();
    this.createVeterinariosChart();
    this.createMascotasChart();
  }

  updateCharts(): void {
    // Destroy old charts first
    this.destroyCharts();
    
    // Re-create charts with new data
    this.initializeCharts();
  }

  destroyCharts(): void {
    if (this.medicamentoChart) {
      this.medicamentoChart.destroy();
    }
    if (this.topTratamientosChart) {
      this.topTratamientosChart.destroy();
    }
    if (this.veterinariosChart) {
      this.veterinariosChart.destroy();
    }
    if (this.mascotasChart) {
      this.mascotasChart.destroy();
    }
  }

  createMedicamentosChart(): void {
    if (!this.medicamentoChartRef || !this.dashboardData) return;

    const ctx = this.medicamentoChartRef.nativeElement.getContext('2d');
    
    const labels = this.dashboardData.tratamientosPorMedicamento.map((item: TratamientoPorMedicamento) => item.nombreMedicamento);
    const data = this.dashboardData.tratamientosPorMedicamento.map((item: TratamientoPorMedicamento) => item.cantidad);
    
    this.medicamentoChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tratamientos',
          data: data,
          backgroundColor: 'rgba(83, 166, 156, 0.8)',
          borderColor: 'rgba(83, 166, 156, 1)',
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 24,
          maxBarThickness: 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(50, 50, 50, 0.9)',
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            padding: 12,
            cornerRadius: 6,
            displayColors: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: {
                size: 12
              }
            },
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            ticks: {
              font: {
                size: 12
              }
            },
            grid: {
              display: false
            }
          }
        },
        animation: {
          duration: 1200,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  createTopTratamientosChart(): void {
    if (!this.topTratamientosChartRef || !this.dashboardData) return;

    const ctx = this.topTratamientosChartRef.nativeElement.getContext('2d');
    
    const labels = this.dashboardData.topTratamientos.map((item: TopTratamiento) => item.nombreMedicamento);
    const data = this.dashboardData.topTratamientos.map((item: TopTratamiento) => item.unidadesVendidas);
    
    this.topTratamientosChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Unidades Vendidas',
          data: data,
          backgroundColor: [
            'rgba(83, 166, 156, 0.8)', 
            'rgba(255, 183, 77, 0.8)', 
            'rgba(126, 87, 194, 0.8)'
          ],
          borderColor: [
            'rgba(83, 166, 156, 1)', 
            'rgba(255, 183, 77, 1)', 
            'rgba(126, 87, 194, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 12
              },
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(50, 50, 50, 0.9)',
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            padding: 12,
            cornerRadius: 6
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1200,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  createVeterinariosChart(): void {
    if (!this.veterinariosChartRef || !this.dashboardData) return;

    const ctx = this.veterinariosChartRef.nativeElement.getContext('2d');
    
    this.veterinariosChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Activos', 'Inactivos'],
        datasets: [{
          label: 'Veterinarios',
          data: [
            this.dashboardData.veterinariosActivos,
            this.dashboardData.veterinariosInactivos
          ],
          backgroundColor: [
            'rgba(83, 166, 156, 0.8)',
            'rgba(239, 83, 80, 0.8)'
          ],
          borderColor: [
            'rgba(83, 166, 156, 1)',
            'rgba(239, 83, 80, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 12
              },
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(50, 50, 50, 0.9)',
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            padding: 12,
            cornerRadius: 6
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1200,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  createMascotasChart(): void {
    if (!this.mascotasChartRef || !this.dashboardData) return;

    const ctx = this.mascotasChartRef.nativeElement.getContext('2d');
    
    this.mascotasChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Activas', 'Inactivas'],
        datasets: [{
          label: 'Mascotas',
          data: [
            this.dashboardData.mascotasActivas, 
            this.dashboardData.mascotasTotales - this.dashboardData.mascotasActivas
          ],
          backgroundColor: [
            'rgba(83, 166, 156, 0.8)',
            'rgba(239, 83, 80, 0.8)'
          ],
          borderColor: [
            'rgba(83, 166, 156, 1)',
            'rgba(239, 83, 80, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 12
              },
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(50, 50, 50, 0.9)',
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = this.dashboardData.mascotasTotales;
                const percentage = ((value as number) / total * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            },
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            padding: 12,
            cornerRadius: 6
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1200,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  scrollToVets(): void {
    const vetElement = document.getElementById('veterinarios-section');
    if (vetElement) {
      vetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}