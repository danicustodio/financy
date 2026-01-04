import { Lock, Mail, UserRoundPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input, LabelButton, Link } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';

interface SignInFormData {
	email: string;
	password: string;
	rememberMe: boolean;
}

export function SignInPage() {
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		defaultValues: {
			rememberMe: false,
		},
	});

	const onSubmit = async (data: SignInFormData) => {
		try {
			await login(data.email, data.password);
			navigate('/dashboard');
		} catch (error) {
			console.error('Sign in failed:', error);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-white p-4 md:p-8">
			<div className="w-full max-w-md flex flex-col items-center gap-10">
				<img src="/logo.svg" alt="Financy" className="h-8" />

				<div className="w-full bg-white rounded-[12px] p-4 md:p-8 flex flex-col gap-6 border border-financy-gray-200">
					<div className="flex flex-col items-center gap-2">
						<h1 className="text-financy-gray-800 text-xl font-bold">
							Fazer login
						</h1>
						<p className="text-financy-gray-600 text-sm">
							Entre na sua conta para continuar
						</p>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-4"
					>
						<Input
							id="email"
							label="E-mail"
							type="email"
							placeholder="seu@exemplo.com"
							prefix={<Mail />}
							error={errors.email?.message}
							{...register('email', {
								required: 'E-mail é obrigatório',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'E-mail inválido',
								},
							})}
						/>

						<Input
							id="password"
							label="Senha"
							type="password"
							placeholder="Digite sua senha"
							prefix={<Lock/>}
							error={errors.password?.message}
							{...register('password', {
								required: 'Senha é obrigatória',
								minLength: {
									value: 6,
									message: 'Senha deve ter no mínimo 6 caracteres',
								},
							})}
						/>

						<div className="flex items-center justify-between">
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									className="w-4 h-4 rounded border-financy-gray-300 focus:ring-financy-brand-base"
									{...register('rememberMe')}
								/>
								<span className="text-financy-gray-700 text-sm">
									Lembrar-me
								</span>
							</label>
							<Link href="#" variant="default">
								Recuperar senha
							</Link>
						</div>

						<LabelButton
							type="submit"
							variant="filled"
							size="md"
							disabled={isSubmitting}
							className="w-full"
						>
							{isSubmitting ? 'Entrando...' : 'Entrar'}
						</LabelButton>
					</form>

					<div className="flex items-center gap-4">
						<div className="flex-1 h-px bg-financy-gray-200" />
						<span className="text-financy-gray-400 text-sm">ou</span>
						<div className="flex-1 h-px bg-financy-gray-200" />
					</div>

					<div className="flex flex-col items-center gap-4">
						<p className="text-financy-gray-400 text-sm">
							Ainda não tem uma conta?
						</p>
						<LabelButton
							variant="outlined"
							size="md"
							className="w-full"
							onClick={() => navigate('/signup')}
						>
							<UserRoundPlus />
							Criar conta
						</LabelButton>
					</div>
				</div>
			</div>
		</div>
	);
}
