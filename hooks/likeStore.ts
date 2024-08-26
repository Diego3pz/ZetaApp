import { create } from 'zustand'

export const useActionInfoStore = create((set) => ({
    textInfo: {
        text: '',
        active: false
    },
    setTextInfo: (value: any) => set(() => ({
        textInfo: value
    }))
}))