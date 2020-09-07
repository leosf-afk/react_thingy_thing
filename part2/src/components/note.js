import React from 'react'

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

export default Note

 const App__ = ({ notes }) => {
   return (
     <div>
       <h1>Notes</h1>
       <ul>
         {notes.map(note => <Note key={note.id} note={note} /> )}
         </ul>
     </div>
   )
 }
 