package login.login.controller;

import login.login.model.CartItem;
import login.login.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @GetMapping("/{username}")
    public List<CartItem> getCart(@PathVariable String username) {
        return cartItemRepository.findByUsername(username);
    }

    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartItem item) {
        return cartItemRepository.save(item);
    }

    @DeleteMapping("/clear/{username}")
    public void clearCart(@PathVariable String username) {
        cartItemRepository.deleteByUsername(username);
    }
}