import {create }from "zustand"
interface SheetStore{
    isOpen: boolean
    open: ()=> void,
    close: ()=> void
}

const useSheetStore = create<SheetStore>(set=>({
    isOpen: false,
    open: ()=>set({isOpen: true}),
    close: ()=>set({isOpen: false})
}))

export default useSheetStore;