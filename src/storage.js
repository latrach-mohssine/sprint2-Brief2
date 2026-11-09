const playersKey = "ecard_players"
const activePlayerKey = "ecard_active_player"
const matchesKey = "ecard_matches"
export function getPlayers(){
    const players = localStorage.getItem(playersKey)
    if(players === null){
        return [];
    }
    return JSON.parse(players);
}
export function savePlayers(players){
    localStorage.setItem(playersKey, JSON.stringify(players))

}
export function getActivePlayerId(){
    return localStorage.getItem(activePlayerKey);
}
export function saveActivePlayerId(id){
    localStorage.setItem(activePlayerKey,id)

}
export function getMatches(){
    const matches = localStorage.getItem(matchesKey)
    if(matches === null){
        return []
        
    }
    return JSON.parse(matches)
}

export function saveMatches(matches){
    localStorage.setItem(matchesKey, JSON.stringify(matches));
}
