import { RegisterModel } from '../db/models/user'

export type RegisterPropsWithRoles = RegisterModel & {
  roleIds?: number[]
}

// token信息类型
export interface UserTokenInfo {
  id: number;
  username: string;
}
