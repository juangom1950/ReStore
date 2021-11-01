import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../../models/basket";


interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (product: number, quantity: number) => void;
}

//Pameter "undefined" is going to be the default value
export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Oops - we do not seem to be insede the provider');
    }

    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        // Return if basket is null
        if (!basket) return;
        // This is going to create an new copy of the array and stored it inside items variable
        // When we are setting states inside the component, it isn't avaisable to mutate states,
        // that's why we need to create a new copy of the state and then replacing this existing state
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);

        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            // Here we are removing an item, mutating a copy of the items not the original items
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);

            // We are going to overwrite the prevState with this new state.
            setBasket(prevState => {
                // With ! we are saying that we are going to overwrite this state
                return {...prevState!, items}
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}