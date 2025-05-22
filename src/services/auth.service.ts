import bcrypt from "bcrypt";
import { AuthPayload, LoginDTO, RegisterDTO } from "src/dtos/auth.dto.js";
import { UserRepository } from "src/repositories/user.repository.js";
import { jwtService } from "./jwt.service.js";

export class AuthService {
  private userRepo = new UserRepository();

  async register(data: RegisterDTO) {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Este e-mail já está cadastrado.");
    }

    const user = await this.userRepo.createUser({ ...data, role: "user" });
    return user;
  }

  async login(data: LoginDTO) {
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) {
      throw new Error("E-mail não registrado.");
    }

    const isSame = await bcrypt.compare(
      data.password,
      user.password.toString()
    );
    if (!isSame) {
      throw new Error("Senha incorreta.");
    }

    const payload: AuthPayload = {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    };

    const token = jwtService.signPayload(payload, "7d");
    return { user, token };
  }
}
