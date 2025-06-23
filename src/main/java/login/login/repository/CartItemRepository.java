package login.login.repository;

import login.login.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUsername(String username);
    void deleteByUsername(String username);
}