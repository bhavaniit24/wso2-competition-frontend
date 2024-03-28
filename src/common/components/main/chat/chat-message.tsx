'use client';

import { CustomCopyButton } from '@/common';
import { Author, IChatMessage } from '@/shared';
import { CodeHighlight } from '@mantine/code-highlight';
import { Blockquote, Code } from '@mantine/core';
import { useState } from 'react';
import Markdown from 'react-markdown';
import '@mantine/code-highlight/styles.css';

interface ChatMessageProps {
    message: IChatMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
    const { author, content } = message;
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <Blockquote
            className="!p-4 !my-1"
            color={author === Author.AI ? 'teal' : 'blue'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-col gap-2 break-words max-w-[95%]">
                {isHovered && (
                    <div className="absolute top-0 right-0 p-5 border-none rounded-[4px] bg-N-400">
                        <CustomCopyButton content={content} />
                    </div>
                )}
                <Markdown
                    components={{
                        code(props) {
                            const { children, className, node, ...rest } = props;
                            const match = /language-(\w+)/.exec(className || '');
                            const isFullCode = Boolean(Number(children?.toString()?.split(' ')?.length) > 2);

                            if (match) {
                                return (
                                    <CodeHighlight
                                        code={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        copyLabel="Copy"
                                        copiedLabel="Copied!"
                                    />
                                );
                            } else if (isFullCode) {
                                return (
                                    <CodeHighlight
                                        code={String(children).replace(/\n$/, '')}
                                        language={className}
                                        copyLabel="Copy"
                                        copiedLabel="Copied!"
                                    />
                                );
                            } else {
                                return (
                                    <Code className={className} c="white">
                                        {children}
                                    </Code>
                                );
                            }
                        },
                    }}
                >
                    {content}
                </Markdown>
            </div>
        </Blockquote>
    );
};

export { ChatMessage };
