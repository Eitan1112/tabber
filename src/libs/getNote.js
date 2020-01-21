export default (fret, capo, { tune, octave }) => {
    // Takes fret,  capo, tuning
    // returns note
    const order = ['E', 'F', 'Fm', 'G', 'Gm', 'A', 'Am', 'B', 'C', 'Cm', 'D', 'Dm']
    const startingIndex = order.indexOf(tune)
    const noteIndex = startingIndex + capo + fret
    if (noteIndex > order.length - 1) {
        const newOctave = octave + parseInt(noteIndex / order.length)
        return order[noteIndex % order.length] + newOctave
    }
    return order[noteIndex % order.length] + octave
}