'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../../shared/store/authStore';

const loginSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    const success = await login(data.email, data.password);
    if (success) {
      toast.success('Login realizado com sucesso!');
      reset();
      router.push('/dashboard');
    } else {
      toast.error(error || 'Falha na autenticação.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-normal mb-2 text-gray-300"
        >
          Usuário<span className="text-blue-500">*</span>
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className={`w-full px-4 py-3.5 bg-[#13111F] border ${
            errors.email ? 'border-red-500' : 'border-[#1E1C2E]'
          } rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Insira o seu e-mail, CPF ou passaporte"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-normal mb-2 text-gray-300"
        >
          Senha<span className="text-blue-500">*</span>
        </label>
        <div className="relative">
          <input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            className={`w-full px-4 py-3.5 bg-[#13111F] border ${
              errors.password ? 'border-red-500' : 'border-[#1E1C2E]'
            } rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            placeholder="Digite sua senha"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>
        )}
      </div>

      <div className="flex justify-between items-center text-sm">
        <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-500 bg-[#13111F] border-[#1E1C2E] rounded cursor-pointer"
          />
          Lembrar meu usuário
        </label>
        <a
          href="#"
          className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
        >
          Esqueci minha senha
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || loading}
        className="w-full py-3.5 rounded-lg font-medium text-white transition-all bg-[#3D7BF6] hover:bg-[#4A8BFF] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
      >
        {isSubmitting || loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Entrando...
          </div>
        ) : (
          'Entrar'
        )}
      </button>
    </form>
  );
}
