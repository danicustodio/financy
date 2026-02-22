import { LogOut, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { Skeleton } from '@/components/ui/skeleton';
import { useProfileForm } from '@/hooks/forms/use-profile-form';
import { useMe } from '@/hooks/queries/use-me';
import { queryClient } from '@/lib/query-client';
import { useAuthStore } from '@/stores/authStore';

export function Profile() {
	const navigate = useNavigate();
	const { data: profile, isLoading } = useMe();
	const {
		form: {
			register,
			formState: { errors },
		},
		formError,
		isSubmitting,
		onSubmit,
	} = useProfileForm(profile);

	const initials = profile?.name
		? profile.name
				.split(' ')
				.map((part) => part[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		: 'CT';

	const email = profile?.email ?? '';

	const handleLogout = () => {
		useAuthStore.getState().logout();
		queryClient.clear();
		navigate('/signin');
	};

	return (
		<main className="m-auto flex max-w-7xl justify-center p-12">
			<div className="flex w-md flex-col gap-8 rounded-xl border border-financy-gray-200 bg-white p-8">
				<div className="flex flex-col items-center gap-6">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-financy-gray-300">
						<span className="font-medium text-2xl text-financy-gray-800">
							{initials}
						</span>
					</div>

					<div className="flex flex-col items-center gap-0.5">
						{isLoading ? (
							<Skeleton className="h-7 w-40" />
						) : (
							<h1 className="font-semibold text-financy-gray-800 text-xl">
								{profile?.name}
							</h1>
						)}
						{isLoading ? (
							<Skeleton className="h-6 w-48" />
						) : (
							<p className="text-base text-financy-gray-500">{email}</p>
						)}
					</div>
				</div>

				<div className="h-px w-full bg-financy-gray-200" />

				<form className="flex flex-col gap-8" onSubmit={onSubmit}>
					<div className="flex flex-col gap-4">
						<Input
							label="Nome completo"
							id="name"
							prefix={<User size={16} />}
							error={!!errors.name || !!formError}
							helper={errors.name?.message ?? formError ?? undefined}
							disabled={isLoading}
							value={register('name').name}
							{...register('name')}
						/>

						<Input
							label="E-mail"
							id="email"
							defaultValue={email}
							value={email}
							disabled
							prefix={<Mail size={16} />}
							helper="O e-mail não pode ser alterado"
						/>
					</div>

					<div className="flex flex-col gap-4">
						<LabelButton
							variant="default"
							size="md"
							type="submit"
							loading={isSubmitting}
							disabled={isLoading}
						>
							Salvar alterações
						</LabelButton>

						<LabelButton
							type="button"
							variant="outline"
							size="md"
							icon={<LogOut size={18} className="text-financy-danger" />}
							onClick={handleLogout}
						>
							Sair da conta
						</LabelButton>
					</div>
				</form>
			</div>
		</main>
	);
}
