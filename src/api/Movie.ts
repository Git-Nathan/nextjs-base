import { IAuth } from "@/models/admin";
import { INewMovie } from "@/models/movie";
import { appFetch } from "./configs";

export class Movie {
  add(auth: IAuth, data: INewMovie) {
    return appFetch.get(
      `/add_movie?` + new URLSearchParams({ ...auth, ...data }),
    );
  }

  edit(id: string, auth: IAuth, data: INewMovie) {
    return appFetch.get(
      `/modify_movie?` + new URLSearchParams({ ...auth, ...data, id }),
    );
  }

  delete(id: string, auth: IAuth) {
    return appFetch.get(
      `/delete_movie?` + new URLSearchParams({ ...auth, movie_id: id }),
    );
  }

  getAll(auth: IAuth) {
    return appFetch.get(`/get_all_movie?` + new URLSearchParams({ ...auth }));
  }
}
