import React ,{useContext , useState} from 'react';
import noteContex from '../context/notes/noteContext'




const AddNote = (props) => {
  const context = useContext(noteContex);

  const {addNote} = context;



const [note, setnote] = useState({title:  "" ,description: "", tag : "" } );

const handleclick =(e)=>{
  e.preventDefault();
  addNote(note.title ,note.description, note.tag, localStorage.getItem('token'));
  setnote({title:  "" ,description: "", tag : "" } );
  props.showAlert("Added successfully" , " success");
}
const onchange = (e)=>{
setnote({...note , [e.target.name] : e.target.value})
}

  return (
    <div>
    <h2>Add Note</h2>
   
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title'  value={note.title} aria-describedby="emailHelp" onChange={onchange}  />

  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange} />
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange} />
  </div>
 
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
</form>

{/* <Notes/> */}
    </div>
  );
}

export default AddNote;
