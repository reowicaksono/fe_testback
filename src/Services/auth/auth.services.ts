import { AuthRepositoriesImpl } from "@/Data/Repositories/auth.repositories.impl";
import { LoginUseCase, RegisterUseCase } from "@/Domain/UseCases/auth.use_case";

const authRepository = new AuthRepositoriesImpl();
export const loginUseCase = new LoginUseCase(authRepository);
export const registerUseCase = new RegisterUseCase(authRepository);