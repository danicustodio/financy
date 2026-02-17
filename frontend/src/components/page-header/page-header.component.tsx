import type { ReactNode } from 'react';

interface PageHeaderProps {
	title: string;
	subtitle: string;
	action?: ReactNode;
}

export const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col gap-0.5">
				<h1 className="font-bold text-2xl text-financy-gray-800">{title}</h1>
				<p className="text-base text-financy-gray-600">{subtitle}</p>
			</div>
			{action}
		</div>
	);
};
