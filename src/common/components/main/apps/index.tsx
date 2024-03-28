'use client';

import { CategoriesSelect, Loading } from '@/common';
import { ApiService, IApp } from '@/shared';
import { Badge, ScrollArea, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { SaveAppModal } from './save-app-modal';
import { UseAppModal } from './use-app-modal';

interface IAppBox {
    app: IApp;
}

interface IAppsList {
    loading: boolean;
    apps: IApp[];
}

export const AppBox = ({ app }: IAppBox) => {
    return (
        <div className="flex justify-between items-center gap-2 m-1 py-2 px-3 bg-[#1B1C1D] rounded-sm">
            <div>
                <p className="p-1 break-words">
                    <i className={`mr-2 ${app?.icon}`}></i>
                    {app?.name || ''}
                </p>
                <p className="text-xs font-mono px-1 break-words text-gray-600">{app?.description || ''}</p>
                {app?.categories.map((category, i) => (
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
                <UseAppModal app={app} />

                {/* <button>
                    <Tooltip label={'Edit'}>
                        <i className="ri-edit-line"></i>
                    </Tooltip>
                </button> */}
            </div>
        </div>
    );
};

const AppsList = ({ loading, apps }: IAppsList) => {
    if (loading) {
        return <Loading />;
    }

    if (apps.length <= 0) {
        return <div className="flex justify-center">No apps found!</div>;
    }

    return (
        <>
            {apps.map((app, i) => (
                <AppBox key={i} app={app} />
            ))}
        </>
    );
};

export const AppsContent = () => {
    const [apps, setApps] = useState<IApp[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [debouncedQuery] = useDebouncedValue(query, 500);

    useEffect(() => {
        const fetchPrompts = async (query: string, category: string) => {
            try {
                setLoading(true);
                const apps = await ApiService.getInstance().searchApps(category, query);
                setApps(apps || []);
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
                        <SaveAppModal label="Create App" />
                        <div className="flex flex-col sm:flex-row gap-2">
                            <CategoriesSelect onChange={e => setCategory(e.value)} />

                            <TextInput
                                leftSectionPointerEvents="none"
                                leftSection={<i className="ri-search-line"></i>}
                                value={query}
                                onChange={e => setQuery(e.target.value || '')}
                                placeholder="Search Apps..."
                            />
                        </div>
                    </div>
                </div>
                <ScrollArea className="p-2 !h-[55vh]" type="always">
                    <AppsList loading={loading} apps={apps} />
                </ScrollArea>
            </div>
        </div>
    );
};
