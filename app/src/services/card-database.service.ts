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
}

export const getCards = () => {
  gitrows
    .get(path)
    .then((data: any) => {
      //handle (Array/Object)data
      console.log(data);
    })
    .catch(() => {
      //handle error, which has the format (Object){code:http_status_code,description='http_status_description'}
    });
};

export const addCard = (card: ICard) => {
  gitrows.put(path, card)
    .then(() => {
      //handle response, which has the format (Object){code:200,description='OK'}
    })
    .catch(() => {
      //handle error, which has the format (Object){code:http_status_code,description='http_status_description'}
    });
};
