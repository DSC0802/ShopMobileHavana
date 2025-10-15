import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Props = { open: boolean; onClose: () => void };

const RegisterModal: React.FC<Props> = ({ open, onClose }) => {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const emailRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (open) setTimeout(() => emailRef.current?.focus(), 50);
        else { setEmail(''); setPassword(''); setName(''); setError(null); setLoading(false); }
    }, [open]);

    if (!open) return null;

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) { setError('Email and password required'); return; }
        setLoading(true);
        const ok = await register(email.trim(), password, name.trim() || undefined);
        setLoading(false);
        if (ok) onClose();
        else setError('A user with this email already exists');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Create an account</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Register to buy products and track orders.</p>

                <form onSubmit={submit} className="mt-4 space-y-3">
                    <input ref={emailRef} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-700" />
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name (optional)" className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-700" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-700" />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div className="flex items-center justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700">Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white">{loading ? '...' : 'Create account'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
