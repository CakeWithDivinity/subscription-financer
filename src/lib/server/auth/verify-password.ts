import bcrypt from 'bcrypt';

export async function verifyPassword(
	suppliedPassword: string,
	storedPassword: string
): Promise<boolean> {
	return bcrypt.compare(suppliedPassword, storedPassword);
}
