package login.login.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders") // <-- Cambia el nombre de la tabla
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username; // Cliente

    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items;

    private double total;
    private String estado; // pendiente, pagado, enviado, etc.

    public Order() {}

    public Order(String username, List<OrderItem> items, double total, String estado) {
        this.username = username;
        this.items = items;
        this.total = total;
        this.estado = estado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}