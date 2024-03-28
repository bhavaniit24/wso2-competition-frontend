import { Brand, NavLinks } from '../components';

export function Header() {
    return (
        <header className="w-full z-30">
            <div className="px-4 sm:px-6">
                <div className="flex items-center justify-between py-4">
                    <div className="shrink-0 mr-4">
                        <Brand />
                    </div>
                    <NavLinks />
                </div>
            </div>
        </header>
    );
}
