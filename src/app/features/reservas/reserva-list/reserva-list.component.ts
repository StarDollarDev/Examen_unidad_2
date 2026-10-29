import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reserva } from '../../../core/interfaces/reserva.interface';
import { ReservaService } from '../../../core/services/reserva.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reserva-list.component.html',
  styleUrl: './reserva-list.component.css'
})
export class ReservaListComponent implements OnInit {
  private reservaService = inject(ReservaService);
  private alertService = inject(AlertService);
  reservas: Reserva[] = [];

  ngOnInit(): void {
    this.listarReservas();
  }

  listarReservas() {
    this.reservaService.getReservas().subscribe({
      next: data => this.reservas = data,
      error: () => this.alertService.error('No se pudo conectar con el backend')
    });
  }

  async eliminar(id: number) {
    const confirmado = await this.alertService.confirm('Esta acción no se puede deshacer');
    if (confirmado) {
      this.reservaService.deleteReserva(id).subscribe({
        next: () => {
          this.alertService.toast('Reserva eliminada!!!');
          this.listarReservas();
        },
        error: () => this.alertService.error('No se pudo eliminar')
      });
    }
  }

  claseEstado(estado: string): string {
    switch (estado) {
      case 'CONFIRMADA': return 'bg-success';
      case 'CANCELADA': return 'bg-danger';
      default: return 'bg-warning text-dark';
    }
  }
}
