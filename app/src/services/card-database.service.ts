import { ICard } from "../types/card";
import { createImage, deleteImage, updateImage } from "./image-database.service";
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
  const sorted = [...cards].sort((card1, card2) => {return card1.id > card2.id ? -1 : 1;});

  if (sorted.length > 0) {
    return sorted[0].id + 1;;
  } else {
    return 0;
  }
};

export const retrieveCards = async (): Promise<ICard[]> => {
  return octokit.rest.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: `${DATA_PATH}`,
    }).then((result: any) => {
      return JSON.parse(Buffer.from(result.data.content, 'base64').toString());
    });
};

export const createCard = async (card: ICard, image?: string): Promise<boolean> => {
  return await octokit.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: `${DATA_PATH}`,
  }).then(async (result: any) => {
    let sha = result.data.sha;

    let cards = JSON.parse(Buffer.from(result.data.content, 'base64').toString());
    card.id = getNextId(cards);

    if (image) {
      try {
        console.log(image);
        createImage(card.id, image);
        card.hasImage = true;
      } catch (error) {
        card.hasImage = false;
        console.error(error);
      }

    } else {
      card.hasImage = false;
    }

    cards.push(card);

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      message: "Adding a card to the repository",
      path: `${DATA_PATH}`,
      content: Buffer.from(JSON.stringify(cards, null, 2)).toString('base64'), // pretty-print
      committer: { name: "Internal User", email: "internal@gmail.com" },
      author: { name: "Internal User", email: "internal@gmail.com" },
      sha: sha
    });

    return true;
  });
};

export const updateCard = async (card: ICard, image?: string): Promise<boolean> => {
  return await octokit.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: `${DATA_PATH}`,
  }).then(async (result: any) => {
    let sha = result.data.sha;

    let cards = JSON.parse(Buffer.from(result.data.content, 'base64').toString());
    let index = cards.findIndex((currentCard: ICard) => currentCard.id === card.id);

    if (image) {
      try {
        if (cards[index].hasImage) {
          updateImage(card.id, image);
        } else {
          createImage(card.id, image);
        }
        card.hasImage = true;
      } catch (error) {
        card.hasImage = false;
        console.error(error);
      }
    }

    cards[index] = card;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      message: "Update a card in the repository",
      path: `${DATA_PATH}`,
      content: Buffer.from(JSON.stringify(cards, null, 2)).toString('base64'), // pretty-print
      committer: { name: "Internal User", email: "internal@gmail.com" },
      author: { name: "Internal User", email: "internal@gmail.com" },
      sha: sha
    });

    return true;
  });
};

export const deleteCard = async (card: ICard): Promise<boolean> => {
  return await octokit.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: `${DATA_PATH}`,
  }).then(async (result: any) => {
    let sha = result.data.sha;

    let cards = JSON.parse(Buffer.from(result.data.content, 'base64').toString());
    cards = cards.filter((currentCard: ICard) => currentCard.id !== card.id);

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      message: "Delete a card from the repository",
      path: `${DATA_PATH}`,
      content: Buffer.from(JSON.stringify(cards, null, 2)).toString('base64'), // pretty-print
      committer: { name: "Internal User", email: "internal@gmail.com" },
      author: { name: "Internal User", email: "internal@gmail.com" },
      sha: sha
    });

    if (card.hasImage) {
      await deleteImage(card.id);
    }

    return true;
  });
};