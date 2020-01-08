import database from '../firebase/firebase'

const SaveMessage = (isSaved) => ({
    type: 'SAVE',
    isSaved
})

export const saveTabs = (state) => {
    const savedObject = JSON.parse(JSON.stringify({
        rows: state.rows,
        settings: state.settings,
        dictionary: state.dictionary
    })) // The JSON parse and stirngify is to elimenate undefined values, firebase doesnt allow them

    return !state.settings.tabsID ?
        (dispatch) => {
            database.ref(`/users/${state.auth.uid}/tabs`).push(savedObject).then(() => {
                dispatch(SaveMessage(true))
            }).catch((e) => {
                dispatch(SaveMessage(false))
            })
        }
        :
        (dispatch) => {
            database.ref(`/users/${state.auth.uid}/tabs/${state.settings.tabsID}`).set(savedObject).then(() => {
                dispatch(SaveMessage(true))
            }).catch((e) => {
                dispatch(SaveMessage(false))
            })
        }

}

const loadTabsNames = (songs) => ({
    type: 'LOAD_TABS_NAMES',
    songs
})

export const startloadTabsNames = (uid) => {
    return (dispatch) => {
        database.ref(`/users/${uid}/tabs`).once('value').then((snapshot) => {
            const data = snapshot.val()
            if (data === null) {
                dispatch(loadTabsNames([]))
            }
            const list = Object.keys(data).map((id) => ({
                id: id,
                name: data[id].settings.name
            }))
            dispatch(loadTabsNames(list))
        }
        ).catch((e) => {
            console.log('Error loading tabs names.' + e)
        })
    }
}

const loadTabs = (tabsID, state) => ({
    type: 'LOAD_TABS',
    rows: state.rows,
    settings: {
        ...state.settings,
        tabsID
    },
    dictionary: state.dictionary
})

export const startLoadTabs = (uid, tabsID) => {
    return (dispatch) => {
        database.ref(`/users/${uid}/tabs/${tabsID}`).once('value').then((snapshot) => {
            dispatch(loadTabs(tabsID, snapshot.val()))
        })
    }
}

export const removeTabs = (uid, tabsID) => {
    return (dispatch) => {
        database.ref(`/users/${uid}/tabs/${tabsID}`).remove()
    }
}