import { useState } from 'react'; 

export function useExpandableList<T>(items: T[], maxItemsToShow: number = 5) { 
    const [showAll, setShowAll] = useState(false); 
    const handleToggleShowAll = () => setShowAll(!showAll); 
    const itemsToShow = showAll ? items : items.slice(0, maxItemsToShow); 
    const canShowMore = items.length > maxItemsToShow; 
    
    return { 
        itemsToShow, 
        showAll, 
        handleToggleShowAll, 
        canShowMore 
    } 
}