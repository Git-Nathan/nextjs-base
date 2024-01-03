import { IAuth } from "@/models/admin";
import { INewUser } from "@/models/user";
import { appFetch } from "./configs";

export class User {
  getAll(auth: IAuth) {
    return appFetch.get("/get_list_user?" + new URLSearchParams({ ...auth }));
  }

  edit(auth: IAuth, id: string, data: INewUser) {
    return appFetch.get(
      "/update_user_by_admin?" +
        new URLSearchParams({ ...auth, user_id: id, ...data }),
    );
  }
}
