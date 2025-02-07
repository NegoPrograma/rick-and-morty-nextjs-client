import { Character } from "@/types/Character";
import { Status } from "@/types/Status";
import Image from "next/image";
import { JSX, useState } from "react";


interface CardProps extends Character{
    charId: number;
}

export default function Card({charId, name, location, origin, status, image, type,species }: CardProps): JSX.Element {


    const [cardTextColor,setCardTextColor] = useState<string>("text-[#a2a8af]");

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

    /**
     * AI generated function to determine the best text color based on the background color, values are based on the W3C recommendations
     * for more information check: https://www.w3.org/TR/AERT/#color-contrast
     * 
     * @param backgroundColor 
     * @returns 
     */
    function setContrastTextColor(backgroundColor:string) {
        const rgbValues = backgroundColor.match(/\d+/g);
        if (!rgbValues || rgbValues.length !== 3) {
          return '#ffffff';
        }
      
        const [r, g, b] = rgbValues.map(Number);
      
        const rsrgb = r / 255;
        const gsrgb = g / 255;
        const bsrgb = b / 255;
      
        const rLinear = rsrgb <= 0.04045 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
        const gLinear = gsrgb <= 0.04045 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
        const bLinear = bsrgb <= 0.04045 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);
      
        const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
      
        return luminance <= 0.679 ? '#ffffff' : '#1a202c';
      }

    const setBackgroundColorBasedOnImage = () => {
        const imageElement = document.getElementById(`${charId}-image`) as HTMLImageElement;
        const dominantColor = getDominantColor(imageElement);
        document.getElementById(`${charId}-card`)?.setAttribute("style", `background-color: ${dominantColor}`);
        setCardTextColor(setContrastTextColor(dominantColor));
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
            id={`${charId}-card`}
            className={`group col-span-1 h-52 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col items-center justify-center cursor-default`}
            style={{color: cardTextColor}}
            >
            <div className="p-4">
                <h3 className="text-center text-xl font-bold  mx-auto">{name}</h3>
            </div>

            <Image

                width={96}
                height={96}

                src={image}
                alt={name}
                id={`${charId}-image`}
                onLoad={setBackgroundColorBasedOnImage}
                crossOrigin="anonymous"
                className="rounded-full mb-4 border-4 border-white mx-auto"
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

                <p className="text-sm  text-center">
                    <span className="font-semibold">Species:</span> {species}
                </p>
                {type &&
                <p className="text-sm  text-center">
                    <span className="font-semibold">Type:</span> {type}
                </p>}
            </div>


        </div>
    );
}