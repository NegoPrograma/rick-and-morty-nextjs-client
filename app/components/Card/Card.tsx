import { Status } from "@/api-client/RickAndMortyClient";
import { JSX } from "react";

interface CardProps {
    name: string;
    location: string;
    origin: string;
    status: Status;
    image: string;
    type: string;
}

export default function Card({ name, location, origin, status, image, type }: CardProps): JSX.Element {

    function getDominantColor(imageElement: HTMLImageElement): string {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCounts = {} as Record<string, number>;
        let dominantColor = '';
        let maxCount = 0;

        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const rgb = `${r},${g},${b}`;

            colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;

            if (colorCounts[rgb] > maxCount) {
                maxCount = colorCounts[rgb];
                dominantColor = rgb;
            }
        }

        return `rgb(${dominantColor})`;
    }

    const setBackgroundColorBasedOnImage = () => {
        const imageElement = document.getElementById(`${name}-image`) as HTMLImageElement;
        document.getElementById(`${name}-card`)?.setAttribute("style", `background-color: ${getDominantColor(imageElement)}`);
    }

    const setHoverBackgroundImage = (charStatus: Status): string => {

        const colors = {
            [Status.Alive]: "bg-green-600",
            [Status.Dead]: "bg-red-600",
            [Status.Unknown]: "bg-gray-600",
        }
        
        return colors[charStatus];
    }

    return (
        <div
            id={`${name}-card`}
            className="group col-span-1 h-52 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 text-[#a2a8af] flex flex-col items-center justify-center cursor-default">
            {/* Front Content */}
            <div className="p-4">
                <h3 className="text-center text-xl font-bold  mx-auto">{name}</h3>
            </div>

            <img
                src={image}
                alt={name}
                id={`${name}-image`}
                onLoad={setBackgroundColorBasedOnImage}
                crossOrigin="anonymous"
                className="w-24 h-24 rounded-full mb-4 border-4 border-white mx-auto"
            />


            <div className={`absolute inset-0 ${setHoverBackgroundImage(status)} bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4`}>
                <p className="text-center">
                    <span className="font-semibold">Origin:</span> {origin}
                </p>
                <p className="text-center">
                    <span className="font-semibold">Status:</span> {status}
                </p>
                <p className="text-sm  text-center">
                    <span className="font-semibold">Last Seen:</span> {location}
                </p>
            </div>


        </div>
    );
}