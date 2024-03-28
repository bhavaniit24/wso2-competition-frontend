'use client';

import { CustomIconButton, SavePromptModal } from '@/common';
import { ApiService, Author, IChatMessage, useAppContext } from '@/shared';
import { Blockquote, Kbd, Loader, ScrollArea, Textarea } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { isEmpty } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatMessage } from './chat-message';
import { SettingsModal } from './settings-modal';

export const ChatContent = () => {
    const viewport = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useSessionStorage<IChatMessage[]>({ key: 'chatbot-history', defaultValue: [] });
    const { isMobile } = useAppContext();

    const [text, setText] = useState('');
    const [model, setModel] = useState('');
    const [generating, setGenerating] = useState(false);

    const scrollToBottom = () => {
        viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [generating]);

    const sendResponse = useCallback(
        async (userMessage: string) => {
            const sanitizedMessage = userMessage.trim();

            if (isEmpty(sanitizedMessage)) return;

            setMessages(messages => [
                ...messages,
                {
                    id: crypto.randomUUID(),
                    author: Author.USER,
                    content: sanitizedMessage,
                },
            ]);

            try {
                setGenerating(true);
                const message = { content: userMessage, model };
                const response = await ApiService.getInstance().chat(message);

                setMessages(messages => [
                    ...messages,
                    {
                        id: crypto.randomUUID(),
                        author: Author.AI,
                        content: response,
                    },
                ]);
            } catch (error) {
                console.error(error);
            } finally {
                setGenerating(false);
                scrollToBottom();
            }
        },
        [model, setMessages]
    );

    const sendMessage = () => {
        sendResponse(text.trim());
        setText('');
    };

    return (
        <div className="flex flex-col w-full h-full py-2">
            <div className="bg-custom-200 shadow sm:rounded-sm">
                <div className="px-4 py-5 border-b border-gray-400 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-white">Welcome to Bhavan AI</h3>
                </div>
                <ScrollArea.Autosize viewportRef={viewport} h={300} type="hover" className="m-2">
                    {messages?.map((message, i) => (
                        <ChatMessage key={i} message={message} />
                    ))}
                    {generating && (
                        <Blockquote className="!p-4 my-1" color="teal">
                            <Loader color="teal" type="dots" />
                        </Blockquote>
                    )}
                </ScrollArea.Autosize>
            </div>
            <div className="bg-custom-200 shadow sm:rounded-sm mt-4">
                <div className="flex w-full p-2 gap-2 items-center">
                    <Textarea
                        value={text}
                        autosize
                        maxRows={7}
                        onChange={e => setText(e.target.value)}
                        radius="sm"
                        w="100%"
                        placeholder="Ask your question..."
                        onKeyDown={e => {
                            if (e.ctrlKey && e.key === 'Enter') {
                                sendMessage();
                            }
                        }}
                    />
                    <CustomIconButton
                        icon="ri-send-plane-fill"
                        onClick={() => {
                            sendMessage();
                        }}
                    />
                </div>
                {!isMobile && text && (
                    <p className="!text-xs px-3 text-neutral-500">
                        <Kbd className="!text-[10px]">Ctrl</Kbd> + <Kbd className="!text-[10px]">Enter</Kbd> to send
                    </p>
                )}
                <div className="flex flex-wrap m-2 gap-2 items-center">
                    <CustomIconButton
                        icon="ri-delete-bin-line"
                        onClick={() => {
                            setMessages([]);
                        }}
                    />
                    <SettingsModal />
                    <SavePromptModal defaultText={text} />
                    <CustomIconButton
                        onClick={() => {
                            window.open(`https://www.google.com/search?q=${encodeURIComponent(text)}`, '_blank');
                        }}
                        icon="ri-google-fill"
                        text="Ask Google"
                    />
                </div>
            </div>
        </div>
    );
};
