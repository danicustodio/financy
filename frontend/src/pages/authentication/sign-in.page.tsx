import { Lock, Mail, UserRoundPlus } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { Link } from '@/components/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useSignInForm } from '@/hooks/forms/use-sign-in-form';

export function SignIn() {
	const navigate = useNavigate();
	const {
		form: {
			register,
			control,
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

				<div className="flex w-full flex-col gap-6 rounded-xl border border-financy-gray-200 bg-white p-4 md:p-8">
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
							{...register('email')}
						/>

						<Input
							id="password"
							label="Senha"
							type="password"
							placeholder="Digite sua senha"
							prefix={<Lock />}
							error={!!errors.password || !!formError}
							helper={errors.password?.message || (formError ?? undefined)}
							{...register('password')}
						/>

						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Controller
									name="rememberMe"
									control={control}
									render={({ field }) => (
										<Checkbox
											id="remember-me"
											checked={field.value}
											onCheckedChange={(checked) =>
												field.onChange(checked === true)
											}
										/>
									)}
								/>
								<label
									htmlFor="remember-me"
									className="text-financy-gray-700 text-sm"
								>
									Lembrar-me
								</label>
							</div>
							<Link href="#">Recuperar senha</Link>
						</div>

						<LabelButton
							type="submit"
							size="md"
							loading={isSubmitting}
							className="w-full"
						>
							Entrar
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
