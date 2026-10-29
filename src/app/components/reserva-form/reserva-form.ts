import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, startWith } from 'rxjs';
import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';

const IGV = 0.18;

@Component({
  selector: 'app-reserva-form',
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './reserva-form.html',
  styleUrl: './reserva-form.css',
})
export class ReservaForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ReservaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly estados = ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'] as const;
  protected readonly idReserva = signal<number | null>(null);
  protected readonly error = signal('');
  protected readonly guardando = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    cliente: ['', [Validators.required, Validators.maxLength(100)]],
    servicio: ['', [Validators.required, Validators.maxLength(100)]],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    fechaReserva: [new Date().toISOString().substring(0, 10), Validators.required],
    estado: ['PENDIENTE' as Reserva['estado'], Validators.required],
  });

  // Vista previa de montos (el backend vuelve a calcularlos al guardar)
  private readonly valores = toSignal(
    this.form.valueChanges.pipe(startWith(this.form.getRawValue()), map(() => this.form.getRawValue())),
    { initialValue: this.form.getRawValue() },
  );
  protected readonly subtotal = computed(() => (this.valores().cantidad || 0) * (this.valores().precio || 0));
  protected readonly total = computed(() => this.subtotal() * (1 + IGV));

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idReserva.set(Number(id));
      this.service.obtener(Number(id)).subscribe({
        next: (r) =>
          this.form.patchValue({
            cliente: r.cliente,
            servicio: r.servicio,
            cantidad: r.cantidad,
            precio: r.precio,
            fechaReserva: r.fechaReserva,
            estado: r.estado,
          }),
        error: () => this.error.set('No se encontró la reserva.'),
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardando.set(true);
    this.error.set('');
    const datos = this.form.getRawValue() as Reserva;
    const id = this.idReserva();
    const peticion = id ? this.service.actualizar(id, datos) : this.service.crear(datos);
    peticion.subscribe({
      next: () => this.router.navigate(['/reservas']),
      error: () => {
        this.error.set('No se pudo guardar la reserva. Revisa los datos.');
        this.guardando.set(false);
      },
    });
  }

  invalido(campo: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }
}
