import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Props = {
    open: boolean;
    onClose: () => void;
    onRegisterOpen?: () => void;
};

const LoginModal: React.FC<Props> = ({ open, onClose, onRegisterOpen }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => emailRef.current?.focus(), 50);
        } else {
            setEmail('');
            setPassword('');
            setError(null);
            setShowPassword(false);
            setLoading(false);
        }
    }, [open]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        const ok = await login(email.trim(), password);
        setLoading(false);
        if (ok) {
            onClose();
        } else {
            setError('Email or password incorrect.');
        }
    };

    const onOverlayClick = (e: React.MouseEvent) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    return (
        <div ref={modalRef} onClick={onOverlayClick} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-labelledby="login-title" className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h3 id="login-title" className="text-xl font-semibold text-slate-900 dark:text-white">Sign in to your account</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Enter your credentials to continue shopping.</p>

                    <form onSubmit={submit} className="mt-4 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Email</label>
                            <input
                                ref={emailRef}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                autoComplete="username"
                                className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                aria-label="Email"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Password</label>
                            <div className="relative">
                                <input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    aria-label="Password"
                                />
                                <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-2 text-sm text-slate-500">
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input id="remember" type="checkbox" className="w-4 h-4" />
                                <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-300">Remember me</label>
                            </div>
                            <a className="text-sm text-blue-600 hover:underline" href="#">Forgot password?</a>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <span>Don't have an account? </span>
                                <button type="button" onClick={() => onRegisterOpen?.()} className="text-blue-600 hover:underline">Create one</button>
                            </div>
                            <div className="flex items-center gap-3">
                                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-700">Cancel</button>
                                <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-blue-600 text-white">
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                        By signing in you accept our <a href="#" className="text-blue-600">Terms</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
