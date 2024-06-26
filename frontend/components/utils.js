export const findRealParent = (firstVueParent) => {
    let found = false;
    while (firstVueParent && !found) {
        if (firstVueParent.leafletObject === undefined) {
            firstVueParent = firstVueParent.$parent;
        } else {
            found = true;
        }
    }
    return firstVueParent;
};