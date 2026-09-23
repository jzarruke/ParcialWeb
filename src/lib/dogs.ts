export async function fetchDogBreeds(): Promise<string[]> {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  return Object.keys(data.message);
}

export async function fetchDogImage(breed: string): Promise<string> {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  const data = await response.json();
  return data.message;
}
