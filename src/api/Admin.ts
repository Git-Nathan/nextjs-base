import { IAdmin } from "@/models/admin";
import { appFetch } from "./configs";

export class Admin {
  login(data: IAdmin) {
    return appFetch.get(`/admin_login?` + new URLSearchParams({ ...data }));
  }
}
