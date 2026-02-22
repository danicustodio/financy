import { render, screen } from '@testing-library/react';
import { BriefcaseBusiness } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { IconTile } from './icon-tile.component';

describe('IconTile', () => {
	it('renders icon with base layout classes', () => {
		const { container } = render(
			<IconTile color="green" icon={BriefcaseBusiness} />,
		);

		const tile = container.firstElementChild;
		expect(tile).toHaveClass('h-10', 'w-10', 'rounded-sm');
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it.each([
		['green', 'bg-financy-green-light', 'text-financy-green-base'],
		['blue', 'bg-financy-blue-light', 'text-financy-blue-base'],
		['purple', 'bg-financy-purple-light', 'text-financy-purple-base'],
		['orange', 'bg-financy-orange-light', 'text-financy-orange-base'],
		['pink', 'bg-financy-pink-light', 'text-financy-pink-base'],
		['yellow', 'bg-financy-yellow-light', 'text-financy-yellow-base'],
		['red', 'bg-financy-red-light', 'text-financy-red-base'],
	] as const)('applies token classes for %s', (color, bgClass, textClass) => {
		const { container } = render(
			<IconTile color={color} icon={BriefcaseBusiness} />,
		);

		const tile = container.firstElementChild;
		expect(tile).toHaveClass(bgClass, textClass);
	});

	it('merges className and forwards attributes', () => {
		render(
			<IconTile
				color="blue"
				icon={BriefcaseBusiness}
				className="custom-tile"
				aria-label="Tile"
			/>,
		);

		const tile = screen.getByLabelText('Tile');
		expect(tile).toHaveClass('custom-tile');
	});
});
