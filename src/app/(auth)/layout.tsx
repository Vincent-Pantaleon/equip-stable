import Image from "next/image"

const logoUrl = "/urios_logo.png";
const iconUrl = "/equip_logo_1.png";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white text-black p-8 gap-4 rounded-xl w-auto flex flex-col shadow-lg screen-820:w-2/5 lg:flex-row">
                {/* Left/Info Section */}
                <div className="text-center lg:w-1/2 lg:text-left">
                    <div className="flex justify-center lg:justify-start divide-x-2 divide-black w-full">
                        <Image 
                            className="h-11 pr-3"
                            src={logoUrl}
                            alt="FSUU Logo"
                            width={55}
                            height={100}
                        />
                        <Image 
                            className="h-11 pl-3"
                            src={iconUrl}
                            alt="Equip icon"
                            width={120}
                            height={300}
                        />
                    </div>

                    <div className="mt-3">
                        <h1 className="text-4xl my-6">Sign in</h1>
                        <p className="text-lg">Father Saturnino Urios University <br/> AVR Equipment Booking System</p>
                    </div>
                </div>
                {/* Right/Form Section */}
                <div className="lg:w-1/2">
                    {children}
                </div>
            </div>
        </div>
    )
}