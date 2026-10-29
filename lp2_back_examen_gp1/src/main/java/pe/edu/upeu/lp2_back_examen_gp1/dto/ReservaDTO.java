package pe.edu.upeu.lp2_back_examen_gp1.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ReservaDTO(
        @Schema(accessMode = Schema.AccessMode.READ_ONLY)
        Long idreserva,
        @NotBlank(message = "El cliente es obligatorio")
        String cliente,
        @NotBlank(message = "El servicio es obligatorio")
        String servicio,
        @NotNull(message = "La cantidad es obligatoria")
        @Min(value = 1, message = "La cantidad debe ser mayor a 0")
        Integer cantidad,
        @NotNull(message = "El precio es obligatorio")
        @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0")
        BigDecimal precio,
        @Schema(accessMode = Schema.AccessMode.READ_ONLY)
        BigDecimal subtotal,
        @Schema(accessMode = Schema.AccessMode.READ_ONLY)
        BigDecimal total,
        @NotNull(message = "La fecha de reserva es obligatoria")
        LocalDate fechaReserva,
        @NotBlank(message = "El estado es obligatorio")
        @Pattern(regexp = "PENDIENTE|CONFIRMADA|CANCELADA", message = "Estado invalido")
        String estado
) {
}
