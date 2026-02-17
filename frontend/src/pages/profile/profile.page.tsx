import { LogOut, Mail, User } from 'lucide-react';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';

export function Profile() {
	return (
		<main className="m-auto flex max-w-7xl justify-center p-12">
			{/* Profile Card Container */}
			<div className="flex w-[448px] flex-col gap-8 rounded-xl border border-financy-gray-200 bg-white p-8">
				{/* Header Section */}
				<div className="flex flex-col items-center gap-6">
					{/* Profile Avatar */}
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-financy-gray-300">
						<span className="font-medium text-2xl text-financy-gray-800">
							CT
						</span>
					</div>

					{/* User Info */}
					<div className="flex flex-col items-center gap-0.5">
						<h1 className="font-semibold text-financy-gray-800 text-xl">
							Conta teste
						</h1>
						<p className="text-base text-financy-gray-500">conta@teste.com</p>
					</div>
				</div>

				{/* Horizontal Divider */}
				<div className="h-px w-full bg-financy-gray-200" />

				{/* Inputs Section */}
				<div className="flex flex-col gap-4">
					<Input
						label="Nome completo"
						id="name"
						defaultValue="Conta teste"
						prefix={<User size={16} />}
					/>

					<Input
						label="E-mail"
						id="email"
						defaultValue="conta@teste.com"
						disabled
						prefix={<Mail size={16} />}
						helper="O e-mail não pode ser alterado"
					/>
				</div>

				{/* Actions Section */}
				<div className="flex flex-col gap-4">
					<LabelButton variant="default" size="md">
						Salvar alterações
					</LabelButton>

					<LabelButton variant="outline" size="md" icon={<LogOut size={18} />}>
						Sair da conta
					</LabelButton>
				</div>
			</div>
		</main>
	);
}
