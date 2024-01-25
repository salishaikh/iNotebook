import React ,{useContext , useEffect , useRef , useState} from 'react'
import noteContex from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContex);
    const {notes, getNotes, editNote } = context;
   let history = useNavigate();
   
   useEffect(() => {
    //   if(localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined'){
    //     getNotes(localStorage.getItem('token'));
    //   }
    // }, [localStorage.getItem('token')]);
  //  or 
  if (localStorage.getItem('token')) {
    getNotes(localStorage.getItem('token'))
  }else{
    history("/login")
  }} ,[])
  
    const ref = useRef(null);
    const refclose = useRef(null);

    const [note, setnote] = useState({id : "" , etitle:  "" ,edescription: "", etag : "" } );

    const updateNote = (currentnote)=>{
      ref.current.click();
      setnote({id :currentnote._id ,etitle: currentnote.title ,edescription: currentnote.description ,etag: currentnote.tag })
    
      }
  
const handleclick =(e)=>{
  console.log('updateing');
  editNote(note.id , note.etitle , note.edescription, note.etag)
  refclose.current.click();
  props.showAlert("Updated successfully" , " success")
  // addNote(note.title ,note.description, note.tag);
}
const onchange = (e)=>{
setnote({...note , [e.target.name] : e.target.value})
}

  return ( 
    <> 
    <AddNote showAlert = {props.showAlert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
      </button>
{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"              aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onchange}  />

  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name='edescription'  value={note.edescription} onChange={onchange} />
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="etag" name='etag'  value={note.etag}  onChange={onchange}/>
  </div>
 
</form>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
      </div>
    </div>
  </div>
</div>



    <div className='row my-3' >
      <h2>Your notes</h2>
      <div className="container">
        {notes.length === 0 && "looks like you'r reach out of notes" }
      </div>
    
    {notes.map((note, i)=>{
    return <Noteitem showAlert = {props.showAlert} key = {i} updateNote={updateNote} note  = { note }/>;
    })}
    </div>
    </>
  )
}

export default Notes
