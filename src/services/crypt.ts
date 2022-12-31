import crypto from 'crypto';

const iterations = 1000;
const keyLength = 64;
const digest = 'sha512';

export interface CryptData {
    salt: string;
    hash: string;
}

export function crypt(password: string): CryptData {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hash(password, salt);
    return { salt, hash: hashedPassword };
}

export function hash(password: string, salt: string): string {
    const hash = crypto
        .pbkdf2Sync(password, salt, iterations, keyLength, digest)
        .toString('hex');
    return hash;
}
