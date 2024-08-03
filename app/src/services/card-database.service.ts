import { ICard } from "../types/card";

const Gitrows = require("gitrows");

const path = "https://raw.githubusercontent.com/nbrady/test/main/app/src/assets/cards.json";

let gitrows: any;

export const initialize = (password: string) => {
  gitrows = new Gitrows({
    ns: "github",
    owner: "nbrady",
    repo: "test",
    branch: "main",
    path: "cards.json",
    user: "nbrady",
    token: password,
    message: "Adding new card.",
    author: { name: "Internal User", email: "internal@gmail.com" },
  });
};

export const getCards = (): Promise<ICard[]> => {
  return gitrows.get(path).then((data: ICard[]) => {
    return data;
  })
};

export const addCard = (card: ICard): Promise<boolean> => {
  return gitrows.put(path, card).then(() => {
    return true;
  });
};
