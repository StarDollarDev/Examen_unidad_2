import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  success(message: string, title: string = '¡Logrado!') {
    Swal.fire({ title, text: message, icon: 'success', confirmButtonColor: '#003A6C' });
  }

  // Alerta de error
  error(message: string, title: string = 'Error') {
    Swal.fire({ title, text: message, icon: 'error', confirmButtonColor: '#dc3545' });
  }

  async confirm(message: string, title: string = '¿Estás seguro?'): Promise<boolean> {
    const result = await Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#003A6C',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
  }

  toast(message: string, icon: 'success' | 'error' | 'info' = 'success') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({ icon, title: message });
  }
}
