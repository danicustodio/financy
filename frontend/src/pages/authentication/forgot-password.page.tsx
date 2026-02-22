import { ArrowLeft, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { Link } from '@/components/link';
import { useForgotPasswordForm } from '@/hooks/forms/use-forgot-password-form';

export function ForgotPassword() {
	const navigate = useNavigate();
	const {
		form: {
			register,
			formState: { errors },
		},
		formError,
		isSuccess,
		isSubmitting,
		onSubmit,
	} = useForgotPasswordForm();

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-white p-4 md:p-8">
			<div className="flex w-full max-w-md flex-col items-center gap-10">
				<img src="/logo.svg" alt="Financy" className="h-8" />

				<div className="flex w-full flex-col gap-6 rounded-xl border border-financy-gray-200 bg-white p-4 md:p-8">
					<div className="flex flex-col items-center gap-2">
						<h1 className="font-bold text-financy-gray-800 text-xl">
							Recuperar senha
						</h1>
						<p className="text-center text-financy-gray-600 text-sm">
							Informe seu e-mail e enviaremos instruções para redefinir sua senha.
						</p>
					</div>

					{isSuccess ? (
						<div className="flex flex-col gap-4">
							<p className="rounded-md border border-financy-gray-200 bg-financy-gray-100 px-3 py-2 text-financy-gray-700 text-sm">
								Se existir uma conta com este e-mail, enviaremos instruções para redefinir sua senha.
							</p>
							<LabelButton className="w-full" onClick={() => navigate('/signin')}>
								Voltar para login
							</LabelButton>
						</div>
					) : (
						<form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
							<Input
								id="email"
								label="E-mail"
								type="email"
								placeholder="mail@exemplo.com"
								prefix={<Mail size={16} />}
								error={!!errors.email || !!formError}
								helper={errors.email?.message ?? formError ?? undefined}
								{...register('email')}
							/>

							<LabelButton type="submit" size="md" loading={isSubmitting} className="w-full">
								Enviar instruções
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
