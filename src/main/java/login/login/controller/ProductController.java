package login.login.controller;

import login.login.model.Product;
import login.login.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAll(
            @RequestParam(required = false) String origen,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax,
            @RequestParam(required = false) String busqueda) {
        // Filtros básicos (puedes mejorar la lógica)
        if (origen != null)
            return productRepository.findByOrigen(origen);
        if (precioMin != null && precioMax != null)
            return productRepository.findByPrecioBetween(precioMin, precioMax);
        if (busqueda != null)
            return productRepository.findByNombreContainingIgnoreCase(busqueda);
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Product product) {
        if (product.getNombre() == null || product.getPrecio() == 0) {
            return ResponseEntity.badRequest().body("Nombre y precio son obligatorios");
        }
        return ResponseEntity.ok(productRepository.save(product));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}