import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-hot-toast";

const Login = () => {
    const { handleLogin, handleGoogleLogin } = useContext(ShopContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleLogin(email, password);
            toast.dismiss();
            toast.success("Successfully logged in!");
            navigate("/");
        } catch (error) {
            toast.dismiss();
            toast.error(error.message || "Failed to log in");
        } finally {
            setLoading(false);
        }
    };

    const onGoogleSignIn = async () => {
        try {
            await handleGoogleLogin();
            toast.dismiss();
            toast.success("Successfully logged in with Google!");
            navigate("/");
        } catch (error) {
            toast.dismiss();
            toast.error(error.message || "Google sign-in failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 uppercase tracking-widest mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 font-medium">Please enter your details to sign in</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <FaEnvelope />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-sm focus:ring-black focus:border-black transition-all bg-gray-50 outline-none"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                                Password
                            </label>
                            <a href="#" className="text-sm font-semibold text-primary hover:text-black transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <FaLock />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-sm focus:ring-black focus:border-black transition-all bg-gray-50 outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 font-medium tracking-wide">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={onGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm"
                        >
                            <FaGoogle className="text-red-500 text-lg" />
                            Sign in with Google
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-600 font-medium">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-bold text-black hover:text-primary transition-colors underline object-underline-offset-4">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
