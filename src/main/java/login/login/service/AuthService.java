package login.login.service;

import login.login.model.User;
import login.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        return userRepository.findById(username)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }

    public boolean register(String username, String email, String nombre, String apellido, String telefono, String password) {
        if (userRepository.existsByUsername(username)) {
            return false;
        }
        User user = new User(username, email, nombre, apellido, telefono, password, "CLIENTE"); // Agrega el rol
        userRepository.save(user);
        return true;
    }
}