export type Advice = {
  id: number;
  advice: string;
};

export async function fetchAdvice(): Promise<Advice> {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  return data.slip;
}
