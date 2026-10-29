import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reserva-list',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './reserva-list.html',
  styleUrl: './reserva-list.css',
})
export class ReservaList implements OnInit {
  private readonly service = inject(ReservaService);

  protected readonly reservas = signal<Reserva[]>([]);
  protected readonly cargando = signal(false);
  protected readonly error = signal('');

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.service.listar().subscribe({
      next: (data) => {
        this.reservas.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el backend (http://localhost:8080).');
        this.cargando.set(false);
      },
    });
  }

  eliminar(r: Reserva): void {
    if (!r.idreserva || !confirm(`¿Eliminar la reserva #${r.idreserva} de ${r.cliente}?`)) return;
    this.service.eliminar(r.idreserva).subscribe({
      next: () => this.reservas.update((lista) => lista.filter((x) => x.idreserva !== r.idreserva)),
      error: () => this.error.set('No se pudo eliminar la reserva.'),
    });
  }
}
