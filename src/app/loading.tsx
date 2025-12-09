import Image from "next/image";

export default function MainLayoutLoading() {
    return (
        <div className="h-screen flex flex-col items-center justify-center animate-pulse">
            <Image 
                height={200}
                width={200}
                src={'/equip_logo_2.png'}
                alt="equip icon"
            />

            <p>Getting things ready for you!</p>
        </div>
    )
}