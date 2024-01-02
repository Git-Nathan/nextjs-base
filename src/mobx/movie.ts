import { Api } from "@/api/configs";
import { IAuth } from "@/models/admin";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class MoviesStore {
  movieList = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setMovieList(data: any) {
    this.movieList = data;
  }

  setLoading(data: boolean) {
    this.loading = data;
  }

  async getAllMovies(auth: IAuth) {
    this.loading = true;

    const res = await Api.movie.getAll(auth);

    if (res.code === 200) {
      this.movieList = JSON.parse(JSON.stringify(res.data));
    } else {
      toast.error("Something went wrong");
    }

    this.loading = false;
  }
}

export const movieStoreIntance = new MoviesStore();
