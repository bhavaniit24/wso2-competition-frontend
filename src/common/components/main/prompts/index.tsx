'use client';

import { CategoriesSelect, Loading, SavePromptModal } from '@/common';
import { ApiService, Prompt } from '@/shared';
import { Badge, ScrollArea, TextInput, Tooltip } from '@mantine/core';
import { useClipboard, useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { EditPromptModal } from './edit-prompt-modal';

interface IPromptBox {
    prompt: Prompt;
}

interface IPromptList {
    loading: boolean;
    prompts: Prompt[];
}

export const PromptBox = ({ prompt }: IPromptBox) => {
    const { copied, copy } = useClipboard({ timeout: 3000 });

    return (
        <div className="flex justify-between gap-2 m-1 py-2 px-3 bg-[#1B1C1D] rounded-sm">
            <div>
                <p className="font-mono p-1 break-words">{prompt?.text || ''}</p>
                {prompt?.categories.map((category, i) => (
                    <Badge
                        key={i}
                        className="!cursor-pointer m-1 !font-normal"
                        variant="light"
                        radius="sm"
                        color="green"
                    >
                        {category.name}
                    </Badge>
                ))}
            </div>

            <div className="flex flex-col">
                <button onClick={() => copy(prompt?.text)}>
                    <Tooltip label={copied ? 'Copied' : 'Copy'}>
                        <i className={copied ? 'ri-checkbox-circle-line' : 'ri-clipboard-line'}></i>
                    </Tooltip>
                </button>

                <EditPromptModal prompt={prompt} />
            </div>
        </div>
    );
};

const PromptList = ({ loading, prompts }: IPromptList) => {
    if (loading) {
        return <Loading />;
    }

    if (prompts.length <= 0) {
        return <div className="flex justify-center">No prompts found!</div>;
    }

    return (
        <>
            {prompts.map((prompt, i) => (
                <PromptBox key={i} prompt={prompt} />
            ))}
        </>
    );
};

export const PromptContent = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [debouncedQuery] = useDebouncedValue(query, 500);

    useEffect(() => {
        const fetchPrompts = async (query: string, category: string) => {
            try {
                setLoading(true);
                const prompts = await ApiService.getInstance().searchPrompts(category, query);
                setPrompts(prompts || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrompts(debouncedQuery, category);
    }, [debouncedQuery, category]);

    return (
        <div className="flex flex-col w-full h-full py-2">
            <div className="bg-custom-200 shadow sm:rounded-sm">
                <div className="px-4 py-5 border-b border-gray-400 sm:px-6">
                    <div className="flex gap-2 justify-between">
                        <SavePromptModal label="Create Prompt" />
                        <div className="flex flex-col sm:flex-row gap-2">
                            <CategoriesSelect onChange={e => setCategory(e.value)} />

                            <TextInput
                                leftSectionPointerEvents="none"
                                leftSection={<i className="ri-search-line"></i>}
                                value={query}
                                onChange={e => setQuery(e.target.value || '')}
                                placeholder="Search Prompts..."
                            />
                        </div>
                    </div>
                </div>
                <ScrollArea className="p-2 !h-[55vh]" type="always">
                    <PromptList loading={loading} prompts={prompts} />
                </ScrollArea>
            </div>
        </div>
    );
};
