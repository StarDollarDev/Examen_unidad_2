package pe.edu.upeu.lp2_back_examen_gp1.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.upeu.lp2_back_examen_gp1.dto.ReservaDTO;
import pe.edu.upeu.lp2_back_examen_gp1.exception.ResourceNotFoundException;
import pe.edu.upeu.lp2_back_examen_gp1.services.IReservaService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservas")
public class ReservaController {

    private final IReservaService reservaService;

    public ReservaController(IReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> listar() {
        return ResponseEntity.ok(reservaService.listarTodo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaDTO> obtener(@PathVariable Long id) {
        return reservaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada con Id:" + id));
    }

    @PostMapping
    public ResponseEntity<ReservaDTO> crear(@Valid @RequestBody ReservaDTO dto) {
        return new ResponseEntity<>(reservaService.crear(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservaDTO> actualizar(@PathVariable Long id,
                                                 @Valid @RequestBody ReservaDTO dto) {
        return reservaService.actualizar(id, dto)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("No se pudo actualizar con Id:" + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (reservaService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        throw new ResourceNotFoundException("No se pudo eliminar con Id:" + id);
    }
}
