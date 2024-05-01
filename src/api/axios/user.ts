import {IResponse} from '@/interface/response'
import {IUser} from '@/interface/user'
import {AxiosResponse} from 'axios'
import {axiosIntance} from '.'

export class UserApi {
  getList(page: number): Promise<AxiosResponse<IResponse<IUser[]>>> {
    return axiosIntance.get(`/users?page=${page}`)
  }

  delete(id: string): Promise<AxiosResponse<IResponse<undefined>>> {
    return axiosIntance.delete(`/users/${id}`)
  }

  update(
    id: string,
    data: IUser,
  ): Promise<AxiosResponse<IResponse<undefined>>> {
    return axiosIntance.patch(`/users/${id}`, data)
  }
}
