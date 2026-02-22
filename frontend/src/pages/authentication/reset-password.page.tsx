import { ArrowLeft, Lock } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { Link } from '@/components/link';
import { useResetPasswordForm } from '@/hooks/forms/use-reset-password-form';

export function ResetPassword() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const {
		form: {
			register,
			formState: { errors },
		},
		formError,
		isSubmitting,
		onSubmit,
	} = useResetPasswordForm(token);

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-white p-4 md:p-8">
			<div className="flex w-full max-w-md flex-col items-center gap-10">
				<img src="/logo.svg" alt="Financy" className="h-8" />

				<div className="flex w-full flex-col gap-6 rounded-xl border border-financy-gray-200 bg-white p-4 md:p-8">
					<div className="flex flex-col items-center gap-2">
						<h1 className="font-bold text-financy-gray-800 text-xl">
							Redefinir senha
						</h1>
						<p className="text-center text-financy-gray-600 text-sm">
							Escolha uma nova senha para acessar sua conta.
						</p>
					</div>

					{!token ? (
						<div className="flex flex-col gap-4">
							<p className="rounded-md border border-financy-gray-200 bg-financy-gray-100 px-3 py-2 text-financy-danger text-sm">
								Link inválido. Solicite uma nova recuperação de senha.
							</p>
							<LabelButton className="w-full" onClick={() => navigate('/forgot-password')}>
								Solicitar novo link
							</LabelButton>
						</div>
					) : (
						<form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
							<Input
								id="password"
								label="Nova senha"
								type="password"
								placeholder="Digite sua nova senha"
								prefix={<Lock size={16} />}
								error={!!errors.password}
								helper={errors.password?.message}
								{...register('password')}
							/>

							<Input
								id="confirm-password"
								label="Confirmar nova senha"
								type="password"
								placeholder="Confirme sua nova senha"
								prefix={<Lock size={16} />}
								error={!!errors.confirmPassword || !!formError}
								helper={errors.confirmPassword?.message ?? formError ?? undefined}
								{...register('confirmPassword')}
							/>

							<LabelButton type="submit" size="md" loading={isSubmitting} className="w-full">
								Redefinir senha
							</LabelButton>
						</form>
					)}

					<div className="flex justify-center">
						<Link href="/signin" className="gap-1">
							<ArrowLeft size={14} />
							Voltar para login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
