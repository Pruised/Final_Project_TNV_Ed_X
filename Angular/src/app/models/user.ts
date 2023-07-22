export interface User {
  userId: number;
  username: string;
  password: string;
  email: string;
  movies: number;
}

  export interface LoginDTO {   
  username: string;
  password: string;
}

export interface RegisterDTO {
  userId: number;
  username: string;
  password: string;
  email: string;
}
