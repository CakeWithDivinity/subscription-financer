import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string): Promise<{ hash: string; salt: string }> {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(plainPassword, salt);

	return { hash, salt };
}
