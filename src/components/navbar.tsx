import Link from "next/link";




export function NavBarComponent() {


    return (
        <div className="flex justify-center">
            <ul className="flex justify-center">
                <div className="p-4">
                    <Link href={'/'}>Api 1 - Home</Link>
                </div>
                <div className="p-4">
                    <Link href={'/page2'}>Api 2</Link>
                </div>
                <div className="p-4">
                    <Link href={'/page3'}>Api 3</Link>
                </div>
                <div className="p-4">
                    <Link href={'/page4'}>Api 4</Link>
                </div>
                <div className="p-4">
                    <Link href={'/page5'}>Api 5</Link>
                </div>
                <div className="p-4">
                    <Link href={'/page6'}>Api 6</Link>
                </div>
                <div className="p-4">
                    <Link href={'/page7'}>Api 7</Link>
                </div>
                <div className="p-4">
                    <Link href={'/page8'}>Api 8</Link>
                </div>
            </ul>
        </div>
    )
}