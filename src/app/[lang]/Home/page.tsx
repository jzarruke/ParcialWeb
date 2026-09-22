'use client';
import {useState, useEffect} from "react";
import Image from "next/image";

function fetchDogBreeds() {
    return fetch("https://dog.ceo/api/breeds/list/all")
        .then((response) => response.json())
        .then((data) => Object.keys(data.message));
}

function fetchDogImage(breed: string) {
  return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((response) => response.json())
    .then((data) => data.message);
}

export default function HomePage() {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [dogImages, setDogImages] = useState<string[]>([]);

  useEffect(() => {
    fetchDogBreeds().then((data) => setBreeds(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Listado de razas</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {breeds.map((breed) => {
                fetchDogImage(breed).then((imageUrl) => {
                    console.log(`Fetched image for breed ${breed}: ${imageUrl}`);
                    setDogImages((prevImages) => [...prevImages, imageUrl]);
                })
                dogImages.forEach((imageUrl, index) => {
                    console.log(`Dog image at index ${index}: ${imageUrl}`);
                });
                return (
                <div key={breed} className="bg-white text-black p-4 rounded-lg shadow-md">
                    
                    <p className="capitalize">{breed}</p>
                </div>
            )})}
        </div>
    </div>
  );
}