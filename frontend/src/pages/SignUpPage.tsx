import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

export function SignUpPage() {
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
		<div className="min-h-screen flex items-center justify-center bg-financy-gray-800 p-4">
			<div className="w-full max-w-[400px] flex flex-col items-center gap-10">
				{/* Logo */}
				<div className="flex items-center gap-2">
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-financy-green-500"
					>
						<path
							d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4a10 10 0 110 20 10 10 0 010-20zm-2 4v8h4v-8h-4zm0 10v2h4v-2h-4z"
							fill="currentColor"
						/>
					</svg>
					<span className="text-financy-green-500 text-2xl font-bold tracking-tight uppercase">
						Financy
					</span>
				</div>

				{/* White Card */}
				<div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
					{/* Header */}
					<div className="flex flex-col items-center gap-2">
						<h1 className="text-financy-gray-800 text-xl font-bold">
							Criar conta
						</h1>
						<p className="text-financy-gray-400 text-sm">
							Comece a controlar suas finanças ainda hoje
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-4"
					>
						<Input
							id="name"
							label="Nome completo"
							type="text"
							placeholder="Seu nome completo"
							prefix={
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 18a6 6 0 1112 0H4z"
										fill="currentColor"
									/>
								</svg>
							}
							error={errors.name?.message}
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
							prefix={
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm7 6.5L4 6v9h12V6l-6 4.5z"
										fill="currentColor"
									/>
								</svg>
							}
							error={errors.email?.message}
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
								prefix={
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M10 2a4 4 0 00-4 4v2H5a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8z"
											fill="currentColor"
										/>
									</svg>
								}
								error={errors.password?.message}
								{...register('password', {
									required: 'Senha é obrigatória',
									minLength: {
										value: 6,
										message: 'Senha deve ter no mínimo 6 caracteres',
									},
								})}
							/>
							<span className="text-financy-gray-400 text-xs">
								A senha deve ter pelo menos 6 caracteres
							</span>
						</div>

						<LabelButton
							type="submit"
							variant="filled"
							size="md"
							disabled={isSubmitting}
							className="w-full"
						>
							{isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
						</LabelButton>
					</form>

					{/* Divider */}
					<div className="flex items-center gap-4">
						<div className="flex-1 h-px bg-financy-gray-200" />
						<span className="text-financy-gray-400 text-sm">ou</span>
						<div className="flex-1 h-px bg-financy-gray-200" />
					</div>

					{/* Sign in section */}
					<div className="flex flex-col items-center gap-4">
						<p className="text-financy-gray-400 text-sm">Já tem uma conta?</p>
						<LabelButton
							variant="outlined"
							size="md"
							className="w-full"
							onClick={() => navigate('/signin')}
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="mr-2"
							>
								<path
									d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 4v3h3v2h-3v3H9v-3H6V9h3V6h2z"
									fill="currentColor"
								/>
							</svg>
							Fazer login
						</LabelButton>
					</div>
				</div>
			</div>
		</div>
	);
}
