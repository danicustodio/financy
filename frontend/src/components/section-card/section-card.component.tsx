import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionCardProps {
	title: string;
	linkTo: string;
	linkLabel: string;
	children: ReactNode;
	footer?: ReactNode;
	className?: string;
	contentClassName?: string;
}

export const SectionCard = ({
	title,
	linkTo,
	linkLabel,
	children,
	footer,
	className,
	contentClassName,
}: SectionCardProps) => {
	return (
		<Card
			className={cn(
				'gap-0 overflow-hidden border-financy-gray-200 bg-white p-0 shadow-none',
				className,
			)}
		>
			<CardHeader className="border-financy-gray-200 border-b px-6 py-5">
				<CardTitle className="font-medium text-financy-gray-500 text-xs uppercase tracking-wider">
					{title}
				</CardTitle>
				<CardAction>
					<Link
						to={linkTo}
						className="flex items-center gap-1 text-financy-brand-base text-sm"
					>
						{linkLabel}
						<ChevronRight className="h-5 w-5" />
					</Link>
				</CardAction>
			</CardHeader>

			<CardContent className={cn('p-0', contentClassName)}>
				{children}
			</CardContent>

			{footer && (
				<CardFooter className="justify-center px-6 py-5">{footer}</CardFooter>
			)}
		</Card>
	);
};
