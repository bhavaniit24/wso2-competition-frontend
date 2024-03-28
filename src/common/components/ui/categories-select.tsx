'use client';

import { useCategories } from '@/shared';
import { MultiSelect, Select } from '@mantine/core';
import React from 'react';
import { Loading } from './loading';
import { SaveCategoryModal } from './save-category-modal';

interface ICategoriesSelect {
    onChange: (category: any) => void;
    defaultValue?: any;
    showHeader?: boolean;
    multiple?: boolean;
}

const CategoriesSelect = ({ onChange, defaultValue, showHeader, multiple }: ICategoriesSelect) => {
    const { loading, categoriesSelectList } = useCategories();

    if (loading) return <Loading />;

    if (multiple) {
        return (
            <MultiSelect
                label={
                    showHeader ? (
                        <div className="flex items-center gap-1">
                            Categories <SaveCategoryModal onlyIcon label="Add Category" />
                        </div>
                    ) : (
                        <></>
                    )
                }
                placeholder="Select Categories"
                data={categoriesSelectList}
                hidePickedOptions
                searchable
                clearable
                onChange={e => onChange(e)}
                defaultValue={defaultValue}
            />
        );
    }

    return (
        <Select
            label={showHeader ? 'Category' : ''}
            placeholder="Select Category"
            data={categoriesSelectList}
            searchable
            clearable
            onChange={e => onChange(categoriesSelectList.find(cat => cat.value === e) || { label: '', value: '' })}
        />
    );
};

const MemoizedCategoriesSelect = React.memo(CategoriesSelect);

export { MemoizedCategoriesSelect as CategoriesSelect };
