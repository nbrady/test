import axios from "axios";
import { ICard } from "../types/card";
import { Octokit } from "octokit";

const Gitrows = require("gitrows");

const USER = "nbrady";
const REPO = "test";
const BRANCH = "main";
const FILE_PATH = "data/cards.json";

const NON_API_PATH = `https://raw.githubusercontent.com/${USER}/${REPO}/${BRANCH}/${FILE_PATH}`;
const API_PATH = `https://api.github.com/repos/${USER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`

let gitrows: any;
let octokit: Octokit;

export const initialize = (password: string) => {
  gitrows = new Gitrows({
    ns: "github",
    owner: USER,
    repo: REPO,
    branch: BRANCH,
    path: FILE_PATH,
    user: USER,
    token: password,
    message: "Adding new card.",
    author: { name: "Internal User", email: "internal@gmail.com" },
  });

  octokit = new Octokit({
    auth: password,
    log: console,
  });
};

export const getCards = (): Promise<ICard[]> => {
  // USE API_PATH to avoid caching
  return axios.get(API_PATH).then((data: any) => {
    return JSON.parse(atob(data.data.content));
  });
};

export const getNextId = (): Promise<number> => {
  // Auto-increment the ID
  return getCards().then((cards: ICard[]) => {
    cards.sort((card1, card2) => {return card1.id > card2.id ? -1 : 1;});
    return cards[0].id + 1;;
  });
};

export const addCard = (card: ICard, image?: string): Promise<boolean> => {
  return getNextId().then((id) => {
    card.id = id;
    return gitrows.put(NON_API_PATH, card).then(async () => {
      if (image) {
        await addImage(id, image);
      }
    });
  });
};

export const addImage = async (id: number, image: string) => {

  await octokit.rest.users.getAuthenticated();

  await octokit.rest.repos.createOrUpdateFileContents({
    owner: USER,
    repo: REPO,
    message: "Adding an image to the repository",
    path: `images/${id}.png`,
    content: image.replace('data:image/png;base64,', ''),
    committer: { name: "Internal User", email: "internal@gmail.com" },
    author: { name: "Internal User", email: "internal@gmail.com" },
  });
}
