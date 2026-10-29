package pe.edu.upeu.lp2_back_examen_gp1.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upeu.lp2_back_examen_gp1.dto.ReservaDTO;
import pe.edu.upeu.lp2_back_examen_gp1.entity.Reserva;
import pe.edu.upeu.lp2_back_examen_gp1.repository.ReservaRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaServiceImpl implements IReservaService {

    private static final BigDecimal IGV = new BigDecimal("0.18");

    private final ReservaRepository reservaRepository;

    public ReservaServiceImpl(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservaDTO> listarTodo() {
        return reservaRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ReservaDTO> buscarPorId(Long id) {
        return reservaRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    @Transactional
    public ReservaDTO crear(ReservaDTO r) {
        Reserva reserva = new Reserva();
        copiarDatos(reserva, r);
        return convertToDTO(reservaRepository.save(reserva));
    }

    @Override
    @Transactional
    public Optional<ReservaDTO> actualizar(Long id, ReservaDTO r) {
        return reservaRepository.findById(id).map(reserva -> {
            copiarDatos(reserva, r);
            return convertToDTO(reservaRepository.save(reserva));
        });
    }

    @Override
    @Transactional
    public boolean eliminar(Long id) {
        return reservaRepository.findById(id).map(reserva -> {
            reservaRepository.delete(reserva);
            return true;
        }).orElse(false);
    }

    private void copiarDatos(Reserva reserva, ReservaDTO r) {
        BigDecimal subtotal = r.precio()
                .multiply(BigDecimal.valueOf(r.cantidad()))
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = subtotal.add(subtotal.multiply(IGV))
                .setScale(2, RoundingMode.HALF_UP);

        reserva.setCliente(r.cliente());
        reserva.setServicio(r.servicio());
        reserva.setCantidad(r.cantidad());
        reserva.setPrecio(r.precio());
        reserva.setSubtotal(subtotal);
        reserva.setTotal(total);
        reserva.setFechaReserva(r.fechaReserva());
        reserva.setEstado(r.estado());
    }

    private ReservaDTO convertToDTO(Reserva r) {
        return new ReservaDTO(
                r.getIdreserva(),
                r.getCliente(),
                r.getServicio(),
                r.getCantidad(),
                r.getPrecio(),
                r.getSubtotal(),
                r.getTotal(),
                r.getFechaReserva(),
                r.getEstado()
        );
    }
}
