import "reflect-metadata"; // Adicionando o polyfill necessário para o tsyringe
import { container } from "tsyringe";
import { CreateUsersService } from "../../../modules/user/services/CreateUsersService";
import User from "../../../modules/user/entities/User";
import AppError from "../../../shared/errors/AppError";

// Mock do repositório de usuários
const mockUsersRepository = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

describe("CreateUsersService", () => {
  let createUsersService: CreateUsersService;

  beforeEach(() => {
    // Reseta todos os mocks antes de cada teste
    jest.clearAllMocks();

    // Injeção manual do repositório mockado
    container.registerInstance("UsersRepository", mockUsersRepository);

    // Instancia o serviço
    createUsersService = container.resolve(CreateUsersService);
  });

  it("deve criar um usuário com sucesso", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      birthdate: "1990-01-01",
      avatar: "avatar.png",
    };

    const createdUser = new User();
    Object.assign(createdUser, userData, {
      id: "12345",
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Mock da resposta de criação de usuário
    mockUsersRepository.findByEmail.mockResolvedValue(null); // Nenhum usuário existente com esse email
    mockUsersRepository.create.mockResolvedValue(createdUser);

    const result = await createUsersService.execute(userData);

    // Verifica se o usuário foi criado corretamente
    expect(result).toHaveProperty("id");
    expect(result.name).toBe("John Doe");
    expect(result.email).toBe("john.doe@example.com");
  });

  it("não deve criar um usuário com email já existente", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      birthdate: "1990-01-01",
      avatar: "avatar.png",
    };

    // Mock que simula a existência de um usuário com o mesmo email
    mockUsersRepository.findByEmail.mockResolvedValueOnce(new User());

    // Espera-se que o erro seja lançado
    await expect(createUsersService.execute(userData)).rejects.toEqual(
      new AppError("Email address already in use!", 400)
    );
  });

  it("deve lançar erro ao falhar na criação do usuário", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      birthdate: "1990-01-01",
      avatar: "avatar.png",
    };

    mockUsersRepository.findByEmail.mockResolvedValue(null); // Nenhum usuário com esse email

    // Mock da falha na criação do usuário
    mockUsersRepository.create.mockResolvedValue(null);

    await expect(createUsersService.execute(userData)).rejects.toEqual(
      new AppError("Error creating user", 500)
    );
  });
});
