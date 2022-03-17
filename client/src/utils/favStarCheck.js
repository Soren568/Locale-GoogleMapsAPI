

export const checkInFavorites = (recAreaId, favorites) => {
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i]["recId"] === recAreaId) {
            return true
        }
    }
}
export const checkInStarred = (recAreaId, starred) => {
    for (let i = 0; i < starred.length; i++) {
        if (starred[i]["recId"] === recAreaId) {
            return true
        }
    }
}