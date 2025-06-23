package login.login.model;

import jakarta.persistence.*;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; // Usuario dueño del carrito
    private Long productId;
    private int cantidad;

    // Constructor vacío
    public CartItem() {}

    public CartItem(String username, Long productId, int cantidad) {
        this.username = username;
        this.productId = productId;
        this.cantidad = cantidad;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
}