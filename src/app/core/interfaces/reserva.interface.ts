export interface Reserva {
  idreserva?: number;
  cliente: string;
  servicio: string;
  cantidad: number;
  precio: number;
  subtotal?: number; 
  total?: number;    
  fechaReserva: string; 
  estado: string;       
}
