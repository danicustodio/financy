import { AlertTriangle } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import type { ErrorBoundaryScope } from '@/lib/error-reporting';
import { cn } from '@/lib/utils';

interface ErrorFallbackProps extends ComponentProps<'section'> {
	errorId?: string;
	scope?: ErrorBoundaryScope;
}

export function ErrorFallback({
	className,
	errorId,
	scope,
	...props
}: ErrorFallbackProps) {
	const isAppScope = scope === 'app';

	if (isAppScope) {
		return (
			<section
				role="alert"
				className={cn(
					'flex min-h-screen flex-col items-center justify-center gap-4 p-8',
					className,
				)}
				{...props}
			>
				<AlertTriangle className="size-10 text-financy-gray-400" />
				<div className="text-center">
					<h2 className="font-semibold text-2xl text-financy-gray-800">
						Algo deu errado.
					</h2>
					<p className="mt-2 text-financy-gray-600">
						Recarregue a página para tentar novamente.
					</p>
				</div>
				<Button onClick={() => window.location.reload()}>
					Tentar novamente
				</Button>
				{errorId ? (
					<p className="font-mono text-financy-gray-300 text-xs">
						Código: {errorId}
					</p>
				) : null}
			</section>
		);
	}

	return (
		<section
			role="alert"
			className={cn(
				'rounded-xl border border-financy-gray-200 bg-white p-6',
				className,
			)}
			{...props}
		>
			<div className="flex items-start gap-3">
				<AlertTriangle className="mt-0.5 size-5 shrink-0 text-financy-gray-400" />
				<div className="flex-1">
					<h2 className="font-semibold text-financy-gray-800 text-xl">
						Algo deu errado.
					</h2>
					<p className="mt-2 text-financy-gray-600 text-sm">
						Recarregue a página para tentar novamente.
					</p>
					<Button
						className="mt-4"
						size="sm"
						onClick={() => window.location.reload()}
					>
						Tentar novamente
					</Button>
					{errorId ? (
						<p className="mt-4 font-mono text-financy-gray-300 text-xs">
							Código: {errorId}
						</p>
					) : null}
				</div>
			</div>
		</section>
	);
}
