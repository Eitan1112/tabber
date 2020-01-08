import pasteTabsChangeTuningHelper from '../helpers/pasteTabsChangeTuning'

const settingsReducerDefaultState = {
    speed: 80,
    capo: 0,
    tuning: ['E','B','G','D','A','E'],
    name: undefined
}

export default (state = settingsReducerDefaultState, action) => {
    switch (action.type) {
        case 'PASTE_TABS':
            return pasteTabsChangeTuningHelper(state, action.tabs)
        case 'CHANGE_SPEED':
            return {
                ...state,
                speed: action.speed
            }
        case 'CHANGE_CAPO':
            return {
                ...state,
                capo: parseInt(action.capo)
            }
        case 'CHANGE_TUNING':
            return {
                ...state,
                tuning: action.tuning
            }

        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            }

        case 'LOAD_TABS':
            return action.settings
            
        default:
            return state
    }
}