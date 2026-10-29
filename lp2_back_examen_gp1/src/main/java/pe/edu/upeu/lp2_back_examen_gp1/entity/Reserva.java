package pe.edu.upeu.lp2_back_examen_gp1.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "reserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idreserva;
    private String cliente;
    private String servicio;
    private Integer cantidad;
    private BigDecimal precio;
    private BigDecimal subtotal;
    private BigDecimal total;
    private LocalDate fechaReserva;
    private String estado;

    public Reserva() {
    }

    public Reserva(Long idreserva, String cliente, String servicio, Integer cantidad, BigDecimal precio,
                   BigDecimal subtotal, BigDecimal total, LocalDate fechaReserva, String estado) {
        this.idreserva = idreserva;
        this.cliente = cliente;
        this.servicio = servicio;
        this.cantidad = cantidad;
        this.precio = precio;
        this.subtotal = subtotal;
        this.total = total;
        this.fechaReserva = fechaReserva;
        this.estado = estado;
    }

    public Long getIdreserva() {
        return idreserva;
    }

    public void setIdreserva(Long idreserva) {
        this.idreserva = idreserva;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getServicio() {
        return servicio;
    }

    public void setServicio(String servicio) {
        this.servicio = servicio;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public LocalDate getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDate fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
