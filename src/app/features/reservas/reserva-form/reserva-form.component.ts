import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Reserva } from '../../../core/interfaces/reserva.interface';
import { ReservaService } from '../../../core/services/reserva.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reserva-form.component.html',
  styleUrl: './reserva-form.component.css'
})
export class ReservaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private reservaService = inject(ReservaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);

  readonly IGV = 0.18;
  estados = ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'];
  form: FormGroup;
  id: number | null = null;

  constructor() {
    this.form = this.fb.group({
      cliente: ['', [Validators.required, Validators.minLength(3)]],
      servicio: ['', [Validators.required]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      fechaReserva: [new Date().toISOString().substring(0, 10), [Validators.required]],
      estado: ['PENDIENTE', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.reservaService.getReservaById(this.id).subscribe(r => {
        this.form.patchValue(r);
      });
    }
  }

  get subtotal(): number {
    return (this.form.value.cantidad || 0) * (this.form.value.precio || 0);
  }
  get total(): number {
    return this.subtotal * (1 + this.IGV);
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const reserva: Reserva = this.form.value;
    const request = this.id
      ? this.reservaService.updateReserva(this.id, reserva)
      : this.reservaService.createReserva(reserva);

    request.subscribe({
      next: () => {
        this.alertService.success(this.id ? 'Reserva actualizada' : 'Reserva creada');
        this.router.navigate(['/reservas']);
      },
      error: () => this.alertService.error('Ocurrió un error en la transacción')
    });
  }
}
