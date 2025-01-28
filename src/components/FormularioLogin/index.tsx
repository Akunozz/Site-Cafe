import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Botao from "../BotaoFormulario";

type LoginFormInputs = {
  email: string;
  password: string;
};

type FormularioLoginProps = {
  onSubmit: SubmitHandler<LoginFormInputs>;
};

const FormularioLogin: React.FC<FormularioLoginProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar a senha

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="p-3"
    >
      {/* Campo de email */}
      <div className="mb-6">
        <label htmlFor="email" className="formulario-label">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "O email é obrigatório." })}
          placeholder="Digite seu email"
          className="formulario-campo"
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      {/* Campo de senha */}
      <div className="mb-6">
        <label htmlFor="password" className="formulario-label">Senha:</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"} // Alterna entre texto e senha
          {...register("password", { required: "A senha é obrigatória." })}
          placeholder="Digite sua senha"
          className="formulario-campo"
        />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      {/* Checkbox para mostrar/ocultar senha */}
      <div className="mb-6 flex items-center">
        <input
          id="show-password"
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword((prev) => !prev)} // Alterna o estado
          className="mr-2"
        />
        <label htmlFor="show-password" className="text-sm">Mostrar senha</label>
      </div>

      {/* Botão de login */}
      <Botao text="Login"></Botao>
    </form>
  );
};

export default FormularioLogin;