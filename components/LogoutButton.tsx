"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/client";
import { Button } from "./ui/button";
import { toast } from "sonner";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Sign out from Firebase client
            await signOut(auth);

            // Clear server session cookie
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (response.ok) {
                toast.success("Logged out successfully");
                router.push("/sign-in");
                router.refresh(); // Force refresh to clear cached data
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout");
        }
    };

    return (
        <Button variant="outline" size="sm" onClick={handleLogout}>
            <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
            </svg>
            Logout
        </Button>
    );
};

export default LogoutButton;
