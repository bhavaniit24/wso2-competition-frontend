import { ActionIcon, Button, CopyButton, Tooltip, rem } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';

interface ICustomIconButton {
    icon: string;
    text?: string;
    loading?: boolean;
    onClick: () => void;
}

export function CustomIconButton({ icon, text, loading, onClick }: ICustomIconButton) {
    return (
        <Button className="!bg-custom-500" radius="sm" loading={loading} onClick={onClick}>
            <span className="font-normal">
                {text ? (
                    <>
                        <i className={`${icon} text-gray-300 mr-2`}></i>
                        {text}
                    </>
                ) : (
                    <i className={`${icon} text-gray-300`}></i>
                )}
            </span>
        </Button>
    );
}

export function CustomCopyButton({ content }: { content: string }) {
    return (
        <CopyButton value={content} timeout={2000}>
            {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied!' : 'Copy'} position="left">
                    <ActionIcon color="gray" variant="subtle" onClick={copy}>
                        {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
                    </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    );
}
