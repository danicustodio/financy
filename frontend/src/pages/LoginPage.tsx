import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';

interface LoginFormData {
	email: string;
	password: string;
}

export function LoginPage() {
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>();

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login(data.email, data.password);
			navigate('/dashboard');
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-white">Welcome back</h1>
					<p className="mt-2 text-gray-400">Sign in to your account</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<Input
						label="Email"
						type="email"
						placeholder="Enter your email"
						error={errors.email?.message}
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						})}
					/>

					<Input
						label="Password"
						type="password"
						placeholder="Enter your password"
						error={errors.password?.message}
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Password must be at least 6 characters',
							},
						})}
					/>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
					>
						{isSubmitting ? 'Signing in...' : 'Sign in'}
					</button>
				</form>
			</div>
		</div>
	);
}
