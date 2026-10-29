package pe.edu.upeu.lp2_back_examen_gp1.services;

import pe.edu.upeu.lp2_back_examen_gp1.dto.ReservaDTO;

import java.util.List;
import java.util.Optional;

public interface IReservaService {
    List<ReservaDTO> listarTodo();
    Optional<ReservaDTO> buscarPorId(Long id);
    ReservaDTO crear(ReservaDTO r);
    Optional<ReservaDTO> actualizar(Long id, ReservaDTO r);
    boolean eliminar(Long id);
}
