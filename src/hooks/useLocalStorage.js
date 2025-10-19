export const useLocalStorage = () => {

    const setItem = (key, value) => {
        const stringifiedValue = JSON.stringify(value);
        localStorage.setItem(key, stringifiedValue)
    };

    const getItem = (key) => {
        return localStorage.getItem(key);
    };

    const removeItem = (key) => {
        localStorage.removeItem(key);
    };

    const clearStorage = () => {
        localStorage.clear();
        return true;
    };

    return {setItem, getItem, removeItem, clearStorage};

}