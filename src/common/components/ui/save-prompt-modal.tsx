'use client';

import { ApiService } from '@/shared';
import { Button, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { CategoriesSelect } from './categories-select';
import { CustomIconButton } from './icon-button';

interface ISavePromptModal {
    defaultText?: string;
    label?: string;
}

export function SavePromptModal({ defaultText = '', label = 'Save Prompt' }: ISavePromptModal) {
    const [text, setText] = useState(defaultText);
    const [categories, setCategories] = useState<string[]>([]);
    const [opened, { open, close }] = useDisclosure(false);

    const onSavePrompt = useCallback(async () => {
        try {
            const result = await ApiService.getInstance().createPrompt(text, categories);
            result?.id ? toast.success('Prompt Saved!') : toast.error('Cannot save prompt!');
        } catch (error) {
            toast.error('Cannot save prompt!');
        } finally {
            setCategories([]);
            setText('');
            close();
        }
    }, [text, categories, close]);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={<p className="!font-bold text-lg">{label}</p>}
                size="lg"
                className="!rounded-sm"
                centered
            >
                <div className="flex flex-col gap-2">
                    <Textarea
                        autosize
                        maxRows={7}
                        defaultValue={defaultText}
                        label="Prompt"
                        value={text}
                        onChange={e => setText(e.target.value || '')}
                        placeholder="Enter prompt"
                    />
                    <CategoriesSelect showHeader multiple onChange={category => setCategories(category)} />
                    <div className="flex justify-end ">
                        <Button
                            className="!bg-custom-500"
                            onClick={onSavePrompt}
                            disabled={isEmpty(text) || isEmpty(categories)}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>

            <CustomIconButton onClick={open} icon="ri-save-2-line" text={label} />
        </>
    );
}
