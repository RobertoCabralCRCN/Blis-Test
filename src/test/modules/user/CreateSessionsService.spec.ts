import "reflect-metadata";
import { container } from "tsyringe";
import { CreateSessionsService } from "../../../modules/user/services/CreateSessionsService";
import AppError from "../../../shared/errors/AppError";
import User from "../../../modules/user/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

// Mock do repositório de usuários
const mockUsersRepository = {
  findByEmail: jest.fn(),
};

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("CreateSessionsService", () => {
  let createSessionsService: CreateSessionsService;

  beforeEach(() => {
    // Reseta todos os mocks antes de cada teste
    jest.clearAllMocks();

    // Injeção manual do repositório mockado
    container.registerInstance("UsersRepository", mockUsersRepository);

    // Instancia o serviço
    createSessionsService = container.resolve(CreateSessionsService);
  });

  it("não deve autenticar se o usuário não for encontrado", async () => {
    const userData = {
      email: "john.doe@example.com",
      password: "password123",
    };

    // Mock que simula que o usuário não existe
    mockUsersRepository.findByEmail.mockResolvedValue(null);

    // Espera-se que o erro seja lançado
    await expect(createSessionsService.execute(userData)).rejects.toEqual(
      new AppError("Incorrect email/password!", 401)
    );
  });

  it("não deve autenticar se a senha estiver incorreta", async () => {
    const userData = {
      email: "john.doe@example.com",
      password: "password123",
    };

    // Mock que simula a existência de um usuário
    const user = new User();
    user.email = userData.email;
    user.password = "hashedPassword"; // Simulando uma senha criptografada
    mockUsersRepository.findByEmail.mockResolvedValue(user);

    // Mock que simula que a senha fornecida não é a correta
    (compare as jest.Mock).mockResolvedValue(false);

    // Espera-se que o erro seja lançado
    await expect(createSessionsService.execute(userData)).rejects.toEqual(
      new AppError("Incorrect email/password!", 401)
    );
  });

  it("deve autenticar um usuário e gerar um token JWT", async () => {
    const userData = {
      email: "john.doe@example.com",
      password: "password123",
    };

    // Mock que simula a existência de um usuário
    const user = new User();
    user.email = userData.email;
    user.password = "hashedPassword"; // Simulando uma senha criptografada
    mockUsersRepository.findByEmail.mockResolvedValue(user);

    // Mock que simula a comparação da senha
    (compare as jest.Mock).mockResolvedValue(true);

    // Mock que simula a geração de um token JWT
    const token = "jwt_token";
    (sign as jest.Mock).mockReturnValue(token);

    const result = await createSessionsService.execute(userData);

    // Verifica se o resultado contém o usuário e o token
    expect(result).toHaveProperty("user");
    expect(result).toHaveProperty("token");
    expect(result.token).toBe(token);
    expect(result.user.email).toBe(userData.email);
  });
});
