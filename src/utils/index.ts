import * as jwt from 'jsonwebtoken';

const secretKey = 'jwt_secret';

export function generateToken(userId: string) {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
}
export function verifyToken(token) {
  try {
    const decodeJwt = jwt.verify(token, secretKey);
    return !!decodeJwt;
  } catch (error) {
    return false;
  }
}
