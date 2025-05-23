import bcrypt from "bcrypt";

const PEPPER = process.env.PEPPER;

export default async function hashPwd(password: string): Promise<string> {
    if(!PEPPER){
        throw new Error("PEPPER not set")
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password + PEPPER, saltRounds);
    return hash;
}

export async function checkPwd(password: string, hash: string): Promise<boolean> {
    if (!PEPPER) {
        throw new Error("PEPPER not set");
    }
    return await bcrypt.compare(password + PEPPER, hash);
}