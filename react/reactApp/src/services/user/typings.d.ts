declare namespace USERAPI {
  type LoginParams = {
    username?: string;
    password?: string;
  };

  type Role = {
    menus: any[];
  };

  type Data = {
    _id: string;
    username: string;
    password: string;
    create_time: number;
    _v: number;
    role: Role;
  };
  
  type LoginResult = {
    data: Data;
    status: number;
    token: string;
  };
}
