const extractVariables = (input: string): string[] => {
    const regex = /{([^}]+)}/g;
    const matches = input.match(regex);

    if (matches) {
        return matches.map(match => match.slice(1, -1));
    }

    return [];
};

export { extractVariables };
