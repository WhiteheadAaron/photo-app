export default async function Fetch(albumId) {
  const data = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  return data.json();
}
