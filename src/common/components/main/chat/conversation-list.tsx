type IConversation = {
    name: string;
    active: boolean;
};

export const Conversation = ({ name, active }: IConversation) => {
    return (
        <a
            href="#"
            className="block hover:bg-slate-600 focus:outline-none focus:bg-slate-800 transition duration-150 ease-in-out"
        >
            <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="text-sm leading-5 font-medium text-white truncate">{name}</div>
                    {active && (
                        <div className="ml-2 flex-shrink-0 flex">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
};

export const ConversationList = () => {
    return (
        <div className="w-full h-full p-2 md:w-1/3">
            <div className="bg-gray-700 shadow overflow-hidden sm:rounded-sm">
                <ul>
                    {[1, 2, 3].map((_, i) => (
                        <li key={i}>
                            <Conversation name={`Conversation ${i + 1}`} active={i === 0} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
