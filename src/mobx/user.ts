import { Api } from "@/api/configs";
import { IAuth } from "@/models/admin";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class UsersStore {
  userList = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setuserList(data: any) {
    this.userList = data;
  }

  setLoading(data: boolean) {
    this.loading = data;
  }

  async getAllUsers(auth: IAuth) {
    this.loading = true;

    const res = await Api.user.getAll(auth);

    if (res.code === 200) {
      this.userList = JSON.parse(JSON.stringify(res.data));
    } else {
      toast.error("Something went wrong");
    }

    this.loading = false;
  }
}

export const usersStoreIntance = new UsersStore();
