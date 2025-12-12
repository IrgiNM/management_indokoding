export type siteSettingType = {
    id?: number;
    category: string;
    key: string;
    value: string;
    updated_at?: string;
    created_at?: string;
}

export type siteSettingSendType = {
    category: string;
    key: string;
    value: string;
}