import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = (userId: string) => {
    try {
        const twoFactorConfirmation = db.twoFactorConfirmation.findUnique({
            where: { userId }
        });
        return twoFactorConfirmation;
    } catch (err) { 
        return null;
    }
}