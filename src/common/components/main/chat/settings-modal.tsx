import { CustomIconButton } from '@/common';
import { Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface ISettingsModal {}

export function SettingsModal({}: ISettingsModal) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Settings">
                <Select
                    defaultValue="gpt-3.5"
                    placeholder="Select Model"
                    data={[
                        { value: 'gpt-3.5', label: 'GPT-3.5' },
                        { value: 'gpt-4', label: 'GPT-4' },
                    ]}
                />
            </Modal>

            <CustomIconButton onClick={open} icon="ri-settings-4-line" />
        </>
    );
}
