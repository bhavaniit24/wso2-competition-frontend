'use client';

import { CategoriesSelect, CustomIconButton } from '@/common';
import { ApiService, extractVariables } from '@/shared';
import { Button, Modal, ScrollArea, Select, Tabs, TextInput, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ISaveAppModal {
    label?: string;
}

interface ISubForm {
    role: string;
    content: string;
    type: string;
}

interface ISubFormProps {
    onRemove: () => void;
    onChange: (role: string, content: string) => void;
}

const SubForm = ({ onRemove, onChange }: ISubFormProps) => {
    const [role, setRole] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        onChange(role, content);
    }, [role, content, onChange]);

    return (
        <div className="flex flex-col border border-neutral-400 p-2 gap-2">
            <span className="flex float-right justify-end cursor-pointer">
                <i className="ri-close-circle-line" onClick={onRemove} />
            </span>

            <Select
                label="Role"
                placeholder="Enter Role"
                value={role}
                onChange={e => setRole(e || '')}
                data={['user', 'assistant', 'system']}
            />
            <Textarea
                autosize
                maxRows={7}
                className="w-full"
                label="Content"
                placeholder="Enter Content"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
        </div>
    );
};

export const SaveAppModal = ({ label = 'Save Prompt' }: ISaveAppModal) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('ri-app-store-line');
    const [categories, setCategories] = useState<string[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [subForms, setSubForms] = useState<ISubForm[]>([{ role: '', content: '', type: '' }]);

    const onSavePrompt = async () => {
        try {
            const messages = subForms.map(sub => ({
                role: sub.role,
                content: sub.content.trim(),
                type: sub.type,
                variables:
                    extractVariables(sub.content)?.map(text => ({
                        id: crypto.randomUUID(),
                        content: text.trim(),
                        type: 'text',
                    })) || [],
            }));

            const result = await ApiService.getInstance().createApp(
                name.trim(),
                description.trim(),
                icon.trim(),
                categories,
                messages
            );
            result?.id ? toast.success('App Created!') : toast.error('Cannot create app!');
        } catch (error) {
            toast.error('Cannot create app!');
        } finally {
            setCategories([]);
            setName('');
            setDescription('');
            setIcon('ri-app-store-line');
            setCategories([]);
            setSubForms([{ role: '', content: '', type: '' }]);
            close();
        }
    };

    const addSubForm = () => {
        setSubForms([...subForms, { role: '', content: '', type: '' }]);
    };

    const removeSubForm = (index: number) => {
        const newSubForms = [...subForms];
        newSubForms.splice(index, 1);
        setSubForms(newSubForms);
    };

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
                <div className="flex flex-col gap-2 h-[400px]">
                    <Tabs defaultValue="meta">
                        <Tabs.List grow justify="center">
                            <Tabs.Tab value="meta">Meta Details</Tabs.Tab>
                            <Tabs.Tab value="content">Content Details</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="meta" pt="xs">
                            <div className="flex flex-col gap-2">
                                <TextInput
                                    label="Name"
                                    placeholder="Provide App Name"
                                    value={name}
                                    onChange={e => {
                                        setName(e.target.value);
                                    }}
                                />
                                <Textarea
                                    autosize
                                    maxRows={7}
                                    label="Description"
                                    placeholder="Provide App Description"
                                    value={description}
                                    onChange={e => {
                                        setDescription(e.target.value);
                                    }}
                                />
                                <TextInput
                                    label="Icon"
                                    placeholder="Provide Icon"
                                    value={icon}
                                    onChange={e => {
                                        setIcon(e.target.value);
                                    }}
                                />
                                <CategoriesSelect showHeader multiple onChange={category => setCategories(category)} />
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="content" pt="xs">
                            <ScrollArea className="h-[300px]">
                                <div className="flex flex-col mx-2 gap-2 ">
                                    {subForms.map((subForm, index) => (
                                        <SubForm
                                            key={index}
                                            onRemove={() => removeSubForm(index)}
                                            onChange={(role: string, content: string) => {
                                                const newSubForms = [...subForms];
                                                newSubForms[index] = { role, content, type: 'text' };
                                                setSubForms(newSubForms);
                                            }}
                                        />
                                    ))}
                                    <div className="flex justify-end items-center gap-2">
                                        <p className="text-xs">{`Variables should be in curly braces { }`}</p>
                                        <CustomIconButton icon="ri-add-line" onClick={addSubForm} />
                                    </div>
                                </div>
                            </ScrollArea>
                        </Tabs.Panel>
                    </Tabs>
                    <div className="flex justify-end ">
                        <Button
                            className="!bg-custom-500"
                            onClick={onSavePrompt}
                            disabled={isEmpty(name) || isEmpty(description) || isEmpty(icon) || isEmpty(categories)}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>

            <CustomIconButton onClick={open} icon="ri-save-2-line" text={label} />
        </>
    );
};
