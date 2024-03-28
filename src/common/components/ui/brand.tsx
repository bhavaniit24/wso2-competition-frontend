import Image from 'next/image';
import Link from 'next/link';

export function Brand() {
    return (
        <Link className="block group" href="/" aria-label="Cruip">
            <div className="w-full m-1 max-w-[50px] max-h-[50px]">
                <Image src="/logo-w.svg" width={50} height={50} alt="logo" layout="responsive" />
            </div>
        </Link>
    );
}
