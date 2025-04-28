import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardData, TopTratamiento, TratamientoPorMedicamento } from '../../model/dashboard';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('medicamentoChart') medicamentoChartRef!: ElementRef;
  @ViewChild('topTratamientosChart') topTratamientosChartRef!: ElementRef;
  @ViewChild('veterinariosChart') veterinariosChartRef!: ElementRef;
  @ViewChild('mascotasChart') mascotasChartRef!: ElementRef;

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
    
    const labels = this.dashboardData.tratamientosPorMedicamento.map(item => item.nombreMedicamento);
    const data = this.dashboardData.tratamientosPorMedicamento.map(item => item.cantidad);
    
    this.medicamentoChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tratamientos por Medicamento (Último Mes)',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  createTopTratamientosChart(): void {
    if (!this.topTratamientosChartRef || !this.dashboardData) return;

    const ctx = this.topTratamientosChartRef.nativeElement.getContext('2d');
    
    const labels = this.dashboardData.topTratamientos.map(item => item.nombreMedicamento);
    const data = this.dashboardData.topTratamientos.map(item => item.unidadesVendidas);
    
    this.topTratamientosChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Top 3 Tratamientos',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Top 3 Tratamientos (Unidades Vendidas)'
          }
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
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Estado de Veterinarios'
          }
        }
      }
    });
  }

  createMascotasChart(): void {
    if (!this.mascotasChartRef || !this.dashboardData) return;

    const ctx = this.mascotasChartRef.nativeElement.getContext('2d');
    
    const activasPct = (this.dashboardData.mascotasActivas / this.dashboardData.mascotasTotales) * 100;
    const inactivasPct = 100 - activasPct;
    
    this.mascotasChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Activas', 'Inactivas'],
        datasets: [{
          label: 'Mascotas',
          data: [activasPct, inactivasPct],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Estado de Mascotas'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = this.dashboardData.mascotasTotales;
                const count = context.dataIndex === 0 ? 
                  this.dashboardData.mascotasActivas :
                  (total - this.dashboardData.mascotasActivas);
                  
                return `${label}: ${count} (${typeof value === 'number' ? value.toFixed(1) : '0'}%)`;
              }
            }
          }
        }
      }
    });
  }
} 