import type { UserRole } from "@/types/api";

export function isFirmAdmin(role?: UserRole | null): boolean {
    return role === "admin" || role === "super_admin";
}

export function roleHome(role?: UserRole | null) : string {
    if(role === "super_admin") return "/platform";
    return "/workflows";
}

export function roleLabel(role?: UserRole | null): string | null {
    if(role === "super_admin") return "Site admin";
    if(role === "admin") return "Admin";
    return null;
}