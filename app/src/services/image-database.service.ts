import { Octokit } from "octokit";

// TODO: Allow .jpeg and .jpg
export const ALLOWED_IMAGE_TYPES = ['.png'];
export const MAX_IMAGE_SIZE_MB = 1;

const OWNER = "nbrady";
const REPO = "test";
const IMAGE_PATH = `images`;

let octokit: Octokit;

export const initializeImageDB = (password: string) => {
  octokit = new Octokit({ auth: password });
};

// TODO: Retrieve all images at once

export const retrieveImage = async (id: number): Promise<string> => {
  return await octokit.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: `${IMAGE_PATH}/${id}.png`,
  }).then((result: any) => {
    return result.data.content;
  });
};

export const createImage = async (id: number, image: string) => {
  await octokit.rest.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    message: "Adding an image to the repository",
    path: `${IMAGE_PATH}/${id}.png`,
    content: image.replace("data:image/png;base64,", ""),
    committer: { name: "Internal User", email: "internal@gmail.com" },
    author: { name: "Internal User", email: "internal@gmail.com" },
  });
};

export const updateImage = async (id: number, image: string) => {
  return await octokit.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: `${IMAGE_PATH}/${id}.png`,
  }).then(async (result: any) => {
    return await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      message: "Updating an image in the repository",
      path: `${IMAGE_PATH}/${id}.png`,
      content: image.replace("data:image/png;base64,", ""),
      committer: { name: "Internal User", email: "internal@gmail.com" },
      author: { name: "Internal User", email: "internal@gmail.com" },
      sha: result.data.sha,
    });
  });
};

export const deleteImage = async (id: number) => {
  return await octokit.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: `${IMAGE_PATH}/${id}.png`,
  }).then(async (result: any) => {
    return await octokit.rest.repos.deleteFile({
      owner: OWNER,
      repo: REPO,
      message: "Deleting an image from the repository",
      path: `${IMAGE_PATH}/${id}.png`,
      committer: { name: "Internal User", email: "internal@gmail.com" },
      author: { name: "Internal User", email: "internal@gmail.com" },
      sha: result.data.sha,
    });
  });
};