'use client';

import { signIn } from '@/shared';
import { Box, Button, PasswordInput, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const [values, setValues] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { result } = await signIn(values.email, values.password);

            // if (Boolean(result)) {
            //     router.push('/');
            // }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Box w="50%" mx="auto">
                <TextInput
                    my={5}
                    label="Email"
                    placeholder="Email"
                    value={values.email}
                    onChange={e => setValues(values => ({ ...values, email: e.target.value }))}
                />
                <PasswordInput
                    my={5}
                    label="Password"
                    placeholder="Password"
                    value={values.password}
                    onChange={e => setValues(values => ({ ...values, password: e.target.value }))}
                />
                <Button
                    className="w-full"
                    bg="green"
                    variant="gradient"
                    my="sm"
                    loading={loading}
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </Box>
        </div>
    );
}
