'use client';

import { CategoriesSelect } from '@/common';
import { ApiService, Prompt } from '@/shared';
import { Button, Modal, Textarea, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface IEditPromptModal {
    prompt: Prompt;
    label?: string;
}

export function EditPromptModal({ prompt, label = 'Edit Prompt' }: IEditPromptModal) {
    const [text, setText] = useState(prompt?.text || '');
    const [categories, setCategories] = useState<string[]>(prompt?.categories.map(cat => cat.id) || []);
    const [opened, { open, close }] = useDisclosure(false);

    const onEditPrompt = useCallback(async () => {
        try {
            const result = await ApiService.getInstance().updatePrompt(prompt.id, text, categories);
            result?.id ? toast.success('Prompt Edited!') : toast.error('Cannot edit prompt!');
        } catch (error) {
            toast.error('Cannot edit prompt!');
        } finally {
            setCategories([]);
            setText('');
            close();
        }
    }, [prompt, text, categories, close]);

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
                        label="Prompt"
                        value={text}
                        onChange={e => setText(e.target.value || '')}
                        placeholder="Enter prompt"
                    />
                    <CategoriesSelect
                        showHeader
                        multiple
                        defaultValue={categories}
                        onChange={category => setCategories(category)}
                    />
                    <div className="flex justify-end ">
                        <Button
                            className="!bg-custom-500"
                            onClick={onEditPrompt}
                            disabled={isEmpty(text) || isEmpty(categories)}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </Modal>

            <button onClick={open}>
                <Tooltip label={'Edit'}>
                    <i className="ri-edit-line"></i>
                </Tooltip>
            </button>
        </>
    );
}
