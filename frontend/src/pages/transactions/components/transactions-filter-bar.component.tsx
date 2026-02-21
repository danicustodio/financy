import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/types/domain/category';

const PORTUGUESE_MONTHS = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];

const PORTUGUESE_MONTHS_SHORT = [
	'Jan',
	'Fev',
	'Mar',
	'Abr',
	'Mai',
	'Jun',
	'Jul',
	'Ago',
	'Set',
	'Out',
	'Nov',
	'Dez',
];

function formatPeriodLabel(period: string): string {
	const [year, month] = period.split('-').map(Number);
	return `${PORTUGUESE_MONTHS[month - 1]} / ${year}`;
}

interface MonthPickerProps {
	period: string;
	onPeriodChange: (value: string) => void;
}

function MonthPicker({ period, onPeriodChange }: MonthPickerProps) {
	const [open, setOpen] = useState(false);
	const currentYear = new Date().getFullYear();
	const selectedYear = period !== 'all' ? Number(period.split('-')[0]) : null;
	const selectedMonth = period !== 'all' ? Number(period.split('-')[1]) : null;
	const [viewYear, setViewYear] = useState(selectedYear ?? currentYear);

	function handleSelect(monthIndex: number) {
		const mm = String(monthIndex + 1).padStart(2, '0');
		onPeriodChange(`${viewYear}-${mm}`);
		setOpen(false);
	}

	function handleClear() {
		onPeriodChange('all');
		setOpen(false);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					className="flex w-full items-center justify-between rounded-lg border border-financy-gray-300 bg-financy-white px-3 py-[0.6875rem] text-base text-financy-gray-800 shadow-none focus:outline-none focus:ring-1 focus:ring-financy-gray-400"
				>
					<span>{period === 'all' ? 'Todos' : formatPeriodLabel(period)}</span>
					<ChevronDown className="h-4 w-4 opacity-50" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-64 p-3" align="start">
				{/* Year navigation */}
				<div className="mb-3 flex items-center justify-between">
					<button
						type="button"
						onClick={() => setViewYear((y) => y - 1)}
						className="rounded p-1 hover:bg-financy-gray-100"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>
					<span className="font-medium text-sm">{viewYear}</span>
					<button
						type="button"
						onClick={() => setViewYear((y) => y + 1)}
						className="rounded p-1 hover:bg-financy-gray-100"
					>
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>

				{/* Month grid */}
				<div className="grid grid-cols-3 gap-1">
					{PORTUGUESE_MONTHS_SHORT.map((name, i) => {
						const monthNumber = i + 1;
						const isSelected =
							selectedMonth === monthNumber && selectedYear === viewYear;
						return (
							<button
								key={name}
								type="button"
								onClick={() => handleSelect(i)}
								className={`rounded px-2 py-1.5 text-sm transition-colors hover:bg-financy-gray-100 ${
									isSelected
										? 'bg-financy-green-base text-white hover:bg-financy-green-base'
										: ''
								}`}
							>
								{name}
							</button>
						);
					})}
				</div>

				{/* Clear option */}
				{period !== 'all' && (
					<>
						<div className="my-2 border-financy-gray-200 border-t" />
						<button
							type="button"
							onClick={handleClear}
							className="w-full rounded px-2 py-1.5 text-left text-financy-gray-600 text-sm hover:bg-financy-gray-100"
						>
							Todos os períodos
						</button>
					</>
				)}
			</PopoverContent>
		</Popover>
	);
}

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
