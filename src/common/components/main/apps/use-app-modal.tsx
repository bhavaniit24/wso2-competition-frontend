'use client';

import { CustomIconButton } from '@/common';
import { ApiService, Author, IApp, UseApp, UseVariable } from '@/shared';
import { Modal, Textarea, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { capitalize } from 'lodash';
import { useState } from 'react';
import { ChatMessage } from '../chat/chat-message';

interface IUseAppModal {
    app: IApp;
}

export function UseAppModal({ app }: IUseAppModal) {
    const variables = app.messages.map(item => item.variables).flatMap(arr => arr);

    const [opened, { open, close }] = useDisclosure(false);
    const [variableContents, setVariableContents] = useState<UseVariable[]>([]);
    const [response, setResponse] = useState('');
    const [generating, setGenerating] = useState<boolean>(false);

    const onGetResults = async () => {
        const useApp: UseApp = {
            app_id: app.id,
            variables: variableContents.map(variable => ({
                ...variable,
                content: variable.content.replaceAll('{', '{{').replaceAll('}', '}}'),
            })),
        };

        try {
            setGenerating(true);
            const response = await ApiService.getInstance().useApp(useApp);
            setResponse(response);
            setGenerating(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                size="lg"
                className="!rounded-sm"
                centered
                title={
                    <p className="!font-bold text-lg">
                        <i className={`mr-2 ${app?.icon}`}></i>
                        {app?.name || ''}
                    </p>
                }
            >
                <div className="flex flex-col gap-2">
                    <div>
                        {variables.map(({ id, content }, i) => (
                            <Textarea
                                key={i}
                                autosize
                                maxRows={7}
                                label={capitalize(content).replaceAll('_', ' ').replaceAll('-', ' ')}
                                required
                                onChange={e => {
                                    const text = e.target.value || '';
                                    const newVariableContents = [...variableContents];
                                    const index = newVariableContents.findIndex(v => v.id === id);
                                    if (index === -1) {
                                        newVariableContents.push({ id, content: text });
                                    } else {
                                        newVariableContents[index].content = text;
                                    }
                                    setVariableContents(newVariableContents);
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex justify-end my-2">
                        <CustomIconButton
                            onClick={onGetResults}
                            loading={generating}
                            icon="ri-arrow-right-line"
                            text="Get Result"
                        />
                    </div>

                    {response && <ChatMessage message={{ author: Author.AI, content: response }} />}
                </div>
            </Modal>

            <button onClick={open}>
                <Tooltip label={'Use APP'}>
                    <i className="ri-eject-line"></i>
                </Tooltip>
            </button>
        </>
    );
}
