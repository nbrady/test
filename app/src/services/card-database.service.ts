import axios from "axios";
import { ICard } from "../types/card";

const Gitrows = require("gitrows");

const USER = "nbrady";
const REPO = "test";
const BRANCH = "database";
const FILE = "cards.json";

const NON_API_PATH = `https://raw.githubusercontent.com/${USER}/${REPO}/${BRANCH}/${FILE}`;
const API_PATH = `https://api.github.com/repos/${USER}/${REPO}/contents/${FILE}`

let gitrows: any;

export const initialize = (password: string) => {
  gitrows = new Gitrows({
    ns: "github",
    owner: USER,
    repo: REPO,
    branch: BRANCH,
    path: FILE,
    user: USER,
    token: password,
    message: "Adding new card.",
    author: { name: "Internal User", email: "internal@gmail.com" },
  });
};

export const getCards = (): Promise<ICard[]> => {
  // USE API_PATH to avoid caching
  return axios.get(API_PATH, {data : {branch: BRANCH}}).then((data: any) => {
    return JSON.parse(atob(data.data.content));
  });
};

export const addCard = (card: ICard): Promise<boolean> => {
  return gitrows.put(NON_API_PATH, card).then(() => {
    return true;
  });
};
