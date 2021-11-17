// overwrite request interface to allow 'user_id'
declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
