'use client';

import { ApiService, Category, SelectOption } from '@/shared';
import { useEffect, useState } from 'react';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const categoriesSelectList: SelectOption[] =
        categories?.map(category => ({ value: category.id, label: category.name })) || [];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const categories = await ApiService.getInstance().getAllCategories();
                setCategories(categories || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (categories?.length <= 0) {
            fetchCategories();
        }
    }, [categories]);

    return { loading, categoriesSelectList };
};
