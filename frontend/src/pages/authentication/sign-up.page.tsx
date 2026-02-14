import { Lock, LogIn, Mail, UserRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { useAuthStore } from '@/stores/authStore';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

export function SignUp() {
	const navigate = useNavigate();
	const signup = useAuthStore((state) => state.signup);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>();

	const onSubmit = async (data: SignUpFormData) => {
		try {
			await signup(data.name, data.email, data.password);
			navigate('/dashboard');
		} catch (error) {
			console.error('Sign up failed:', error);
		}
	};

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-white p-4 md:p-8">
			<div className="flex w-full max-w-md flex-col items-center gap-10">
				<img src="/logo.svg" alt="Financy" className="h-8" />

				<div className="flex w-full flex-col gap-6 rounded-[12px] border border-financy-gray-200 bg-white p-4 md:p-8">
					<div className="flex flex-col items-center gap-2">
						<h1 className="font-bold text-financy-gray-800 text-xl">
							Criar conta
						</h1>
						<p className="text-financy-gray-600 text-sm">
							Comece a controlar suas finanças ainda hoje
						</p>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex w-full flex-col gap-4"
					>
						<Input
							id="name"
							label="Nome completo"
							type="text"
							placeholder="Seu nome completo"
							prefix={<UserRound size={16} />}
							error={!!errors.name}
							helper={errors.name?.message}
							{...register('name', {
								required: 'Nome é obrigatório',
								minLength: {
									value: 2,
									message: 'Nome deve ter no mínimo 2 caracteres',
								},
							})}
						/>

						<Input
							id="email"
							label="E-mail"
							type="email"
							placeholder="seu@exemplo.com"
							prefix={<Mail size={16} />}
							error={!!errors.email}
							helper={errors.email?.message}
							{...register('email', {
								required: 'E-mail é obrigatório',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'E-mail inválido',
								},
							})}
						/>

						<div className="flex flex-col gap-1">
							<Input
								id="password"
								label="Senha"
								type="password"
								placeholder="Digite sua senha"
								prefix={<Lock size={16} />}
								error={!!errors.password}
								helper={
									errors.password?.message ??
									'A senha deve ter pelo menos 8 caracteres'
								}
								{...register('password', {
									required: 'Senha é obrigatória',
									minLength: {
										value: 8,
										message: 'Senha deve ter no mínimo 8 caracteres',
									},
								})}
							/>
						</div>

						<LabelButton
							type="submit"
							size="md"
							disabled={isSubmitting}
							className="w-full"
						>
							{isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
						</LabelButton>
					</form>

					<div className="flex items-center gap-4">
						<div className="h-px flex-1 bg-financy-gray-300" />
						<span className="text-financy-gray-500 text-sm">ou</span>
						<div className="h-px flex-1 bg-financy-gray-300" />
					</div>

					<div className="flex flex-col items-center gap-4">
						<p className="text-financy-gray-600 text-sm">Já tem uma conta?</p>
						<LabelButton
							variant="outline"
							size="md"
							className="w-full"
							icon={<LogIn size={18} />}
							onClick={() => navigate('/signin')}
						>
							Fazer login
						</LabelButton>
					</div>
				</div>
			</div>
		</div>
	);
}
