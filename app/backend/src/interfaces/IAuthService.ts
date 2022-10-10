import ILogin from './ILogin';

export default interface IAuthService {
  login(payload: ILogin): string
  validate(token: string): Promise<string>
}
