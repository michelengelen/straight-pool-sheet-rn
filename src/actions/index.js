export const updatePlayer = (playerData) => {
    return {
        type: 'update_player',
        payload: playerData
    };
};