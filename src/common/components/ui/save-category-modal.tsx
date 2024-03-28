'use client';

import { CustomIconButton } from '@/common';
import { ApiService } from '@/shared';
import { ActionIcon, Button, Modal, Textarea, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface ISaveCategoryModal {
    onlyIcon?: boolean;
    label?: string;
}

export function SaveCategoryModal({ onlyIcon = false, label = 'Save Category' }: ISaveCategoryModal) {
    const [text, setText] = useState('');
    const [opened, { open, close }] = useDisclosure(false);

    const onSaveCategory = useCallback(async () => {
        try {
            const result = await ApiService.getInstance().createCategory(text);
            result?.id ? toast.success('Category Saved!') : toast.error('Cannot save category!');
        } catch (error) {
            toast.error('Cannot save category!');
        } finally {
            setText('');
            close();
        }
    }, [text, close]);

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
                        label="Category"
                        value={text}
                        onChange={e => setText(e.target.value || '')}
                        placeholder="Enter Category"
                    />
                    <div className="flex justify-end ">
                        <Button className="!bg-custom-500" onClick={onSaveCategory} disabled={isEmpty(text)}>
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>

            {onlyIcon ? (
                <div>
                    <Tooltip label={label}>
                        <ActionIcon color="gray" variant="subtle" onClick={open}>
                            <IconDeviceFloppy width={20} />
                        </ActionIcon>
                    </Tooltip>
                </div>
            ) : (
                <CustomIconButton onClick={open} icon="ri-save-2-line" text={label} />
            )}
        </>
    );
}
