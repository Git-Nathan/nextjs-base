export interface IUser {
  id: number;
  name: string;
  username: string;
  image_user: string;
  email: string;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
}

export interface INewUser {
  name: string;
  email: string;
  image_user: string;
}
