export interface User {
  email: string;
  password: string;
  passwordConfirm: string | null;
  username: string | null;
  role: string | null;
  photo: string | null;
  _id: string;
}
