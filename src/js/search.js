import { async } from "regenerator-runtime";

export const searchReps = async (value) => {
  let prom = await fetch(`https://api.github.com/search/repositories?per_page=5&q=${value}`);
  let json = await prom.json();
  return json;
}