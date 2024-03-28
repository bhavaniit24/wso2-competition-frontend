export function Footer() {
    return (
        <footer>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-4">
                    <div className="text-center md:flex md:items-center md:justify-between">
                        {/* Left links */}
                        <div className="text-sm font-medium md:order-1 mb-2 md:mb-0">
                            <ul className="inline-flex flex-wrap text-sm font-medium">
                                <li className="after:content-['·'] last:after:hidden after:text-gray-400 after:px-2">
                                    <a
                                        rel="noopener"
                                        className="text-gray-500 hover:text-gray-500 hover:underline"
                                        target="_blank"
                                        href="https://www.linkedin.com/in/bhavan24/"
                                    >
                                        Contact Me
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Copyright */}
                        <div className="text-sm text-gray-500">@Bhavan | All rights reserved</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
