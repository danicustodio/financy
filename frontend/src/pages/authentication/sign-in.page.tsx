import { Lock, Mail, UserRoundPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { Link } from '@/components/link';
import { Checkbox } from '@/components/ui/checkbox';
import { signInFormRules } from '@/features/auth/sign-in/sign-in.schema';
import { useSignInForm } from '@/features/auth/sign-in/use-sign-in-form';

export function SignIn() {
	const navigate = useNavigate();
	const {
		form: {
			register,
			formState: { errors },
		},
		formError,
		isSubmitting,
		onSubmit,
	} = useSignInForm();

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-white p-4 md:p-8">
			<div className="flex w-full max-w-md flex-col items-center gap-10">
				<img src="/logo.svg" alt="Financy" className="h-8" />

				<div className="flex w-full flex-col gap-6 rounded-[12px] border border-financy-gray-200 bg-white p-4 md:p-8">
					<div className="flex flex-col items-center gap-2">
						<h1 className="font-bold text-financy-gray-800 text-xl">
							Fazer login
						</h1>
						<p className="text-financy-gray-600 text-sm">
							Entre na sua conta para continuar
						</p>
					</div>

					<form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
						<Input
							id="email"
							label="E-mail"
							type="email"
							placeholder="mail@exemplo.com"
							prefix={<Mail />}
							error={!!errors.email}
							helper={errors.email?.message}
							{...register('email', signInFormRules.email)}
						/>

						<Input
							id="password"
							label="Senha"
							type="password"
							placeholder="Digite sua senha"
							prefix={<Lock />}
							error={!!errors.password}
							helper={errors.password?.message}
							{...register('password', signInFormRules.password)}
						/>

						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Checkbox id="remember-me" name="remember-me" />
								<p className="text-financy-gray-700 text-sm">Lembrar-me</p>
							</div>
							<Link href="#">Recuperar senha</Link>
						</div>

						{formError && (
							<p className="rounded-md bg-red-50 px-3 py-2 text-center text-red-600 text-sm">
								{formError}
							</p>
						)}

						<LabelButton
							type="submit"
							size="md"
							disabled={isSubmitting}
							className="w-full"
						>
							{isSubmitting ? 'Entrando...' : 'Entrar'}
						</LabelButton>
					</form>

					<div className="flex items-center gap-4">
						<div className="h-px flex-1 bg-financy-gray-300" />
						<span className="text-financy-gray-500 text-sm">ou</span>
						<div className="h-px flex-1 bg-financy-gray-300" />
					</div>

					<div className="flex flex-col items-center gap-4">
						<p className="text-financy-gray-600 text-sm">
							Ainda não tem uma conta?
						</p>
						<LabelButton
							variant="outline"
							className="w-full"
							onClick={() => navigate('/signup')}
							icon={<UserRoundPlus size={18} />}
						>
							Criar conta
						</LabelButton>
					</div>
				</div>
			</div>
		</div>
	);
}
