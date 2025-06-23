package login.login;

import org.springframework.boot.SpringApplication;

public class TestLoginApplication {

	public static void main(String[] args) {
		SpringApplication.from(LoginApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
