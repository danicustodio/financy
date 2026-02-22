import { Search } from 'lucide-react';
import { Input } from '@/components/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/types/domain/category';
import { MonthPicker } from './month-picker.component';

interface TransactionsFilterBarProps {
	search: string;
	onSearchChange: (value: string) => void;
	type: string;
	onTypeChange: (value: string) => void;
	categoryId: string;
	onCategoryIdChange: (value: string) => void;
	period: string;
	onPeriodChange: (value: string) => void;
	categories: Category[];
}

export function TransactionsFilterBar({
	search,
	onSearchChange,
	type,
	onTypeChange,
	categoryId,
	onCategoryIdChange,
	period,
	onPeriodChange,
	categories,
}: TransactionsFilterBarProps) {
	return (
		<Card className="border-financy-gray-200 p-0 shadow-none">
			<CardContent className="flex gap-4 px-6 py-5">
				<Input
					type="text"
					id="search"
					label="Buscar"
					prefix={<Search />}
					value={search}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Buscar por descrição"
				/>

				<div className="flex flex-1 flex-col gap-2">
					<Label
						htmlFor="type"
						className="font-medium text-financy-gray-700 text-sm"
					>
						Tipo
					</Label>
					<Select value={type} onValueChange={onTypeChange}>
						<SelectTrigger className="w-full rounded-lg border-financy-gray-300 bg-financy-white px-3 py-5.75 text-base text-financy-gray-800 shadow-none">
							<SelectValue placeholder="Todos" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="income">Receita</SelectItem>
							<SelectItem value="expense">Despesa</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-1 flex-col gap-2">
					<Label
						htmlFor="category"
						className="font-medium text-financy-gray-700 text-sm"
					>
						Categoria
					</Label>
					<Select value={categoryId} onValueChange={onCategoryIdChange}>
						<SelectTrigger className="w-full rounded-lg border-financy-gray-300 bg-financy-white px-3 py-5.75 text-base text-financy-gray-800 shadow-none">
							<SelectValue placeholder="Todas" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todas</SelectItem>
							{categories.map((cat) => (
								<SelectItem key={cat.id} value={cat.id}>
									{cat.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-1 flex-col gap-2">
					<Label
						htmlFor="period"
						className="font-medium text-financy-gray-700 text-sm"
					>
						Período
					</Label>
					<MonthPicker period={period} onPeriodChange={onPeriodChange} />
				</div>
			</CardContent>
		</Card>
	);
}
