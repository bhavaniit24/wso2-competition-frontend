'use client';

import { logOut, navData, NavDataTypes } from '@/shared';
import Link from 'next/link';
import { useState } from 'react';

export function NavLinks() {
    const [navLinks, setNavLinks] = useState(navData);

    const onLogout = async () => {
        await logOut();
    };

    return (
        <nav className="flex">
            <ul className="flex flex-wrap gap-2 items-center">
                {navLinks.map((e: NavDataTypes, i: number) => (
                    <li key={i} className="m-1">
                        <Link
                            href={e.path}
                            className={`px-4 py-2 text-white active:bg-custom-200 rounded-md no-underline text-md ${
                                e.active ? 'bg-custom-500' : 'bg-custom-200'
                            }`}
                            onClick={() => {
                                setNavLinks(links =>
                                    links.map(link => {
                                        if (link.path === e.path) {
                                            return { ...link, active: true };
                                        } else {
                                            return { ...link, active: false };
                                        }
                                    })
                                );
                            }}
                        >
                            {e.name}
                        </Link>
                    </li>
                ))}
                <li className="m-1 cursor-pointer hover:text-blue-40" onClick={onLogout}>
                    <i className="ri-logout-box-r-line"></i>
                </li>
            </ul>
        </nav>
    );
}
