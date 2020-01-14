export const convertNote = (note) => {
    const order = ['E', 'F', 'Fm', 'G', 'Gm', 'A', 'Am', 'B', 'C', 'Cm', 'D', 'Dm', 'E']

    note = note.trim()
    if(note.length === 1) {
        note = note.toUpperCase()
    } else if (note.length === 2) {
        note = note[0].toUpperCase() + note[1].toLowerCase()
    }

    if(order.includes(note)) {
        return note
    } else if (note.length === 2) {
        // Ab A# F# Fb E#
        if(note[1] === '#') {
            const nextNoteIndex = order.indexOf(note[0]) + 1
            return order[nextNoteIndex] 
        } else if(note[1] === 'b') {
            const prevNoteIndex = order.lastIndexOf(note[0]) - 1
            return order[prevNoteIndex]            
        } else {
            throw new Error(`Tried to convert an invalid note: ${note}`)
        }
    } else {
        throw new Error(`Tried to convert an invalid note: ${note}`)
    }
}

const convertTuning = (tuning) => {
    // Takes a tuning array
    // Returns a converted tuning array with octaves
    tuning = tuning.map((tune) => 
        convertNote(tune)
    )

    if(tuning.length !== 6) {
        throw new Error(`Invalid tuning array: ${tuning}`)
    }

    const notesOrder = ['E', 'F', 'Fm', 'G', 'Gm', 'A', 'Am', 'B', 'C', 'Cm', 'D', 'Dm',
    'E', 'F', 'Fm', 'G', 'Gm', 'A', 'Am', 'B', 'C', 'Cm', 'D', 'Dm',
    'E', 'F', 'Fm', 'G', 'Gm', 'A', 'Am', 'B', 'C', 'Cm', 'D', 'Dm',
    'E', 'F', 'Fm', 'G', 'Gm', 'A']
    
    let octaveIndex = 1
    let toFindIndex = 5
    let index = 0
    let newTuning = []
    
    for (let note of notesOrder) {
        if (note === tuning[toFindIndex]) {
            newTuning.push({
                tune: note,
                octave: octaveIndex
            })
            toFindIndex--
        }

        if(newTuning.length === 6) {
            break
        }

        index++
        if (index > 0 && index % 12 === 0) {
            octaveIndex++
        }
    }
    if(newTuning.length !== 6) {
        throw new Error('Failed to convert tuning array')
    }
    return newTuning.reverse()
}

export default convertTuning