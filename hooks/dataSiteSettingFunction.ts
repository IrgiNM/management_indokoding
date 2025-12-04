import { siteSettingType } from '@/types/siteSettingType'
import React, { useEffect, useState } from 'react'
import { createSiteSetting, deleteSiteSetting, getAllSiteSettings, getSiteSettingByCategoryAndKey, getSiteSettingsByCategory, updateSiteSetting } from './api'

// ----------------------------------------------------
// GET ALL SITE SETTING DATA DAN ALL CATEGORY DATA SITE SETTING
// ----------------------------------------------------
export function dataSiteSettingFunction() {
    const [dataSettings, setDataSettings] = useState<siteSettingType[]>([])
    const [dataAllCategorySettings, setDataAllCategorySettings] = useState<string[]>([])

    // GET ALL DATA SETTING
    useEffect(()=>{
        const fetch = async() => {
            try{
                const res = await getAllSiteSettings();
                if(res.status === 200){
                    setDataSettings(res.data);
                }
            }catch{
                console.error('gagal fetch site settings');
            }
        }
        fetch();
    }, [])

    // FETCH DATA CATEGORY KE ARRAY
    useEffect(()=>{
        const dataCategories = dataSettings.map(item=>
            (item.category)
        )
        const setData = [...new Set(dataCategories)];
        setDataAllCategorySettings(setData);
    }, [dataSettings])

    useEffect(()=>{
        console.error('data setting: ', dataSettings);
        console.error('data all category settings: ', dataAllCategorySettings);
    }, [dataAllCategorySettings, dataSettings])

    return {dataSettings, dataAllCategorySettings}
}

// ----------------------------------------------------
// GET ALL SITE SETTING DATA PER CATEGORY
// ----------------------------------------------------
export const fetchDataSettingPerCategory = async(category: string) => {
    try{
        const res = await getSiteSettingsByCategory(category);
        if(res){
            return res.data;
        }else{
            return [];
        }
    }catch{
        console.error('gagal fetch site settings per category');
        return [];
    }
}

// ----------------------------------------------------
// GET FIRST SITE SETTING DATA BY CATEGORY AND KEY
// ----------------------------------------------------
export const fetchDataSettingByCategoryAndKey = async(category: string, key: string) => {
    try{
        const res = await getSiteSettingByCategoryAndKey(category, key);
        if(res){
            return res.data;
        }else{
            return [];
        }
    }catch{
        console.error('gagal fetch site settings per category and key');
        return [];
    }
}

// ----------------------------------------------------
// UPDATE DATA SETTING
// ----------------------------------------------------
export const updateSettingFunction = async(category: string, key: string, value: string) => {
    try{
        const res = await updateSiteSetting({category: category, key: key, value: value});
        if(res.status === 200){
            return true
        }else{
            return false
        }
    }catch{
        console.error('gagal update setting');
    }
}

// ----------------------------------------------------
// CREATE DATA SETTING
// ----------------------------------------------------
export const createSettingFunction = async(category: string, key: string, value: string) => {
    try{
        const res = await createSiteSetting({category: category, key: key, value: value});
        if(res.status === 200){
            return true
        }else{
            return false
        }
    }catch{
        console.error('gagal create setting');
    }
}
// ----------------------------------------------------
// DELETE DATA SETTING
// ----------------------------------------------------
export const deleteSettingFunction = async(category: string, key: string) => {
    try{
        const res = await deleteSiteSetting({category: category, key: key});
        if(res.status === 200){
            return true
        }else{
            return false
        }
    }catch{
        console.error('gagal delete setting');
    }
}