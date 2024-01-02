import { Admin } from "../Admin";
import { Movie } from "../Movie";
import { User } from "../User";
import { AppFetch } from "./AppFetch";

export const appFetch = new AppFetch("http://42.119.154.58/api");

const admin = new Admin();
const movie = new Movie();
const user = new User();

export const Api = { admin, movie, user };
