import { Mail } from 'lucide-react';
import { Input } from '@/components/ui';

function App() {
	return (
		<>
			<Input
				label="Default"
				placeholder="Enter your email"
				helper="We'll never share your email"
				prefix={<Mail size={16} />}
			/>
			<Input label="Password" type="password" error="Password is too short" />
			<Input label="disabled" disabled />
		</>
	);
}

export default App;
