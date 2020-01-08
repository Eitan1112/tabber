const authReducerDefaultState = {}

export default (state = authReducerDefaultState, action) => {
    // console.log('Auth reducer', action)
    switch(action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            }
        case 'LOGOUT':
            return {}
        case 'LOAD_TABS_NAMES':
            return {
                ...state,
                songs: action.songs
            }
        default:
            return state
    }
}