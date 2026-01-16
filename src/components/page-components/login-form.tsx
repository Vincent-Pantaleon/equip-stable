'use client'

import { useState, useEffect } from "react";
import { Input } from "@/components/input";
import Button from "@/components/button";
import Link from "next/link";
import HandleLogin from "@/utils/handlers/login-handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        const result = await HandleLogin(formData);

        if (result.status) {
            router.push('/recents'); // change as needed
            toast.success(result.message);
        } else {
            setError(result.message || "There was a login error");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null)
            }, 10000) // 3 seconds

            return () => clearTimeout(timer)
        }
    }, [error])

    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-4 mt-3 lg:mt-0 lg:p-3 lg:grow"
        >
            <Input 
                id="email"
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
            />

            <Input
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
            />

            <div className="flex justify-start items-center gap-2 px-1 w-full">
                <input 
                    type="checkbox" 
                    id="showPassword"
                    name="showPassword"
                    onChange={() => setShowPassword(prev => !prev)}    
                    className="scale-150 cursor-pointer"
                />
                <label htmlFor="showPassword">Show Password</label>
            </div>

            {error && (
                <p className="text-red-500 text-sm w-full px-1 text-center">
                    {error}
                </p>
            )}

            <Button 
                label={isLoading ? 'Logging in...' : 'Login'}
                type="submit"
                disabled={isLoading}
                className="w-full"
            />

            <Link href="/forgot" className="text-blue-700 hover:text-blue-400 text-center">
                Forgot your password?
            </Link>
        </form>
    );
}
