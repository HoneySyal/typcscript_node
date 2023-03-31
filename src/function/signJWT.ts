import jwt from 'jsonwebtoken';
import IUser from '../interface/userInterface';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {

  var timeSinceEpoch = new Date().getTime();
  var expirationTime = timeSinceEpoch + Number(3600) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
  const secretKey = 'qwertuihxnxhxhx';
  const issuer = 'coolIssuer';

  try {
    jwt.sign(
      {
        email: user.email
      },
      secretKey,
      {
        issuer: issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }

}

export default signJWT;