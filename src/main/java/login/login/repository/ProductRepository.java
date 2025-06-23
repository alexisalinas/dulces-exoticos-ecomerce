package login.login.repository;

import login.login.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Filtros personalizados
    List<Product> findByOrigen(String origen);
    List<Product> findByPrecioBetween(double min, double max);
    List<Product> findByNombreContainingIgnoreCase(String nombre);
}