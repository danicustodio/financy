import { LogOut, Mail, User } from 'lucide-react';
import { Input } from '@/components/input';
import { LabelButton } from '@/components/label-button';
import { Navbar } from '@/components/navbar';

export function ProfilePage() {
	return (
		<div className="min-h-screen bg-financy-gray-100">
			<Navbar />

			<main className="flex justify-center p-12">
				{/* Profile Card Container */}
				<div className="w-[448px] bg-white border border-financy-gray-200 rounded-xl p-8 flex flex-col gap-8">
					{/* Header Section */}
					<div className="flex flex-col items-center gap-6">
						{/* Profile Avatar */}
						<div className="w-16 h-16 rounded-full bg-financy-gray-300 flex items-center justify-center">
							<span className="text-2xl font-medium text-financy-gray-800">
								CT
							</span>
						</div>

						{/* User Info */}
						<div className="flex flex-col items-center gap-0.5">
							<h1 className="text-xl font-semibold text-financy-gray-800">
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

						<LabelButton
							variant="outline"
							size="md"
							icon={<LogOut size={18} />}
						>
							Sair da conta
						</LabelButton>
					</div>
				</div>
			</main>
		</div>
	);
}
