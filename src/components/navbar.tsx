import Link from "next/link";




export function NavBarComponent() {


    return (
        <div className="flex">
            <ul className="flex justify-center">
                <div className="p-4">
                    <Link href={'/'}>Api 1 - Home</Link>
                </div>
                <div className="p-4">
                    <Link href={'/api2'}>Api 2</Link>
                </div>
                <div className="p-4">
                    <Link href={'/api3'}>Api 3</Link>
                </div>
                <div className="p-4">
                    <Link href={'/api4'}>Api 4</Link>
                </div>
                <div className="p-4">
                    <Link href={'/api5'}>Api 5</Link>
                </div>
                <div className="p-4">
                    <Link href={'/api6'}>Api 6</Link>
                </div>
                <div className="p-4">
                    <Link href={'/api7'}>Api 7</Link>
                </div>
                <div className="p-4">
                    <Link href={'/api8'}>Api 8</Link>
                </div>
            </ul>
        </div>
    )
}