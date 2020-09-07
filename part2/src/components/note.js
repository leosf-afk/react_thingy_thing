import React from 'react'

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}




 const App__ = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState("a new note...")
    const [showAll, setShowAll] = useState(true)

    const addNote = (event) =>{
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: newDate().ToISOString(),
            important: Math.random() < 0.5,
            id: notes.length+1,
        }

        setNotes(notes.concat(noteObject))
        setNewNotes('')
    }
    
    const handleNoteChange = (evente) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }
    
    const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important === true)

    return (

     <div>
       <h1>Notes</h1>
        <div>
            <button onClick={()=>setShowAll(!showAll)}>
                show {showAll ? 'importante' : 'all'}
            </button>
        </div>
       <ul>
         {notesToShow.map(note => <Note key={note.id} note={note} /> )}
         </ul>

         <form onSubmit={addNote} >
             <input onChange={handleNoteChange} value={newNote}/>
             <button type="submit">save</button>
         </form>
     </div>
   )
 }
 
export default Note
