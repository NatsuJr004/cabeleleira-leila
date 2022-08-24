import bcrypt from 'bcrypt';

export async function createHash(password: string){
    try{
        const hashPass = await bcrypt.hash(password, 10);
        return ([true, hashPass]);
    }catch(err){
        return ([false, err]);
    }
}

export async function compareHash(informedPassword: string, originalPassoword: string) {
    try{
        const hashCompare = await bcrypt.compare(informedPassword, originalPassoword);
        return hashCompare;
    }catch(err){
        return err;
    }
}