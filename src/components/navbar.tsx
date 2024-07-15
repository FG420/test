'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'

export function NavBarComponent() {

    const currentPath = usePathname();
    const linkClass = (path: string) => (
        path === currentPath ? 'border-b border-b-4 border-b-orange-600 rounded-sm' : ''
    );

    return (
        <div className="flex justify-center ">
            <ul className="flex justify-center">
                <div className={`p-4 ${linkClass('/')}`}>
                    <Link href={'/'}>Home</Link>
                </div>
                <div className={`p-4 ${linkClass('/page2')}`}>
                    <Link href={'/page2'}>Api 2</Link>
                </div>
                <div className={`p-4 ${linkClass('/page3')}`}>
                    <Link href={'/page3'}>Api 3</Link>
                </div>
                <div className={`p-4 ${linkClass('/page4')}`}>
                    <Link href={'/page4'}>Api 4</Link>
                </div>
                <div className={`p-4 ${linkClass('/page5')}`}>
                    <Link href={'/page5'}>Api 5</Link>
                </div>
            </ul>
        </div>
    )
}
