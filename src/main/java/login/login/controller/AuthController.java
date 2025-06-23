package login.login.controller;

import login.login.model.User;
import login.login.repository.UserRepository;
import login.login.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        Optional<User> userOpt = userRepository.findById(username);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            Map<String, Object> resp = new HashMap<>();
            resp.put("success", true);
            resp.put("rol", user.getRol());
            resp.put("nombre", user.getNombre());
            return ResponseEntity.ok(resp);
        }
        return ResponseEntity.ok(Collections.singletonMap("success", false));
    }

    @PostMapping("/register")
    public boolean register(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam String telefono,
            @RequestParam String password
    ) {
        return authService.register(username, email, nombre, apellido, telefono, password);
    }
}
