import { ICard } from "../types/card";
import { createImage } from "./image-database.service";
import { Octokit } from "octokit";

const OWNER = "nbrady";
const REPO = "test";
const DATA_PATH = "data/cards.json";

let octokit: Octokit;

export const initializeCardDB = (password: string) => {
  octokit = new Octokit({ auth: password });
};

export const getNextId = (cards: ICard[]): number => {
  // Auto-increment the ID
  cards.sort((card1, card2) => {return card1.id > card2.id ? -1 : 1;});
  return cards[0].id + 1;;
};

export const retrieveCards = async (): Promise<ICard[]> => {
  await octokit.rest.users.getAuthenticated();

  return octokit.rest.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: `${DATA_PATH}`,
    }).then((result: any) => {
      return JSON.parse(Buffer.from(result.data.content, 'base64').toString());
    });
};

export const createCard = async (card: ICard, image?: string): Promise<boolean> => {
  await octokit.rest.users.getAuthenticated();

  return await octokit.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: `${DATA_PATH}`,
  }).then(async (result: any) => {
    let sha = result.data.sha;

    let cards = JSON.parse(Buffer.from(result.data.content, 'base64').toString());
    card.id = getNextId(cards);
    cards.push(card);

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      message: "Adding a card to the repository",
      path: `${DATA_PATH}`,
      content: Buffer.from(JSON.stringify(cards)).toString('base64'),
      committer: { name: "Internal User", email: "internal@gmail.com" },
      author: { name: "Internal User", email: "internal@gmail.com" },
      sha: sha
    });

    if (image) {
      createImage(card.id, image);
    }

    return true;
  });
};
