import {  useState } from 'react'
import styles from './mainPage.module.css'
import { Link } from "react-router-dom"
import  Table  from "react-bootstrap/Table"



function MainPage() {
  
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("list")


    if (savedList)
     {return JSON.parse(savedList)
    } else{
      return []
    }
  })  
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const newTask ={
    id: Math.random(),
    Title: title,
    Description: description,
  }

  const addTask = (title, description) => {
  
  const newList = [...list, newTask]
    console.log(list)
    console.log(newTask)

  setTitle("")
  setDescription("")
  localStorage.setItem('list', JSON.stringify(newList))
  setList(newList)
  }
  
   
  const [currentTask, setCurrentTask] = useState({});
  const [isEditing, setIsEditing] = useState(false);


  
  
   //Delete///////////////////////////////////////////////

   function deleteItemFromStorage(id){
    let list = JSON.parse(localStorage.getItem('list'));
    setList(list.filter(newTask => newTask.id !== id))
    list.forEach(function(newTask,index){
      if(id === newTask.id){
        list.splice(index , 1)
      }
    })
    localStorage.setItem('list', JSON.stringify(list))
  }

  //Update////////////////////////////////////////////////

  function handleEdit(newTask) {
    setIsEditing(true);
    setCurrentTask({ ...newTask });
  }

  function handleEditInputChange(e, fieldName) {
    // eslint-disable-next-line eqeqeq
    if(fieldName == "Title"){
      currentTask.Title = e.target.value
    }else{
    currentTask.Description = e.target.value
    }
    setCurrentTask({...currentTask })
    console.log(currentTask)
  }

  function handleEditFormSubmit(e) {
    e.preventDefault()

    handleUpdateTask(currentTask.id, currentTask)
  }

  function handleUpdateTask(id, updatedTask) {
    const updatedItem = list.map((newTask) => {
      return newTask.id === id ? updatedTask : newTask
    });
    setIsEditing(false)
     setList(updatedItem)
     console.log(updatedItem)
      console.log(updatedTask)


  }

  function updatedItemStorage(updatedTask){
    let list = JSON.parse(localStorage.getItem('list'));
    
    list.forEach(function(Task , index){
      if(updatedTask.id === Task.id){
        list.splice(index , 1, updatedTask)
      }
      console.log(Task)
      

      console.log(updatedTask)


    })
    localStorage.setItem('list', JSON.stringify(list)) 
  }


  return (
      <>
      <h1>Home</h1>
      <div className={styles["project-form"]}>
      {isEditing ?(
        <><form onSubmit={handleEditFormSubmit}>
            <label htmlFor="Title">Title</label>
            <input name="Title" type="text" id="Title" title="Title" placeholder="Title" value={currentTask.Title || ""} onChange={(e) => handleEditInputChange(e,"Title")} />
            <label htmlFor="Description">Description</label>
            <textarea name="description" placeholder="Description" title='description' id="Description" cols="30" rows="3" value={currentTask.Description || ""} onChange={(e) => handleEditInputChange(e,"Description")}></textarea>
            <button onClick={updatedItemStorage(currentTask)} type="submit">Update</button>
          </form></>

      ) : (
      <><form action="submit">
              <label htmlFor="Title">Title</label>
              <input name="Title" type="text" id="Title" title="Title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <label htmlFor="Description">Description</label>
              <textarea name="description" placeholder="Description" title='description' id="Description" cols="30" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </form><button onClick={() => addTask(title, description)} type="submit">Add</button></>

      ) }
      </div>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
      
        {list.map((newTask, index) => (
          <tr key={index}>
            <td >{newTask.Title}</td>
            
            <td >{newTask.Description}</td>
              <td>
              <button onClick={() => deleteItemFromStorage(newTask.id)}  >X</button>
              <button onClick={() => handleEdit(newTask)} >Edit</button>
              <Link to={`/taskDetails/${newTask.id}`}><button>Details</button></Link>

            </td>

            

          </tr>
        ))}
      
      </tbody>
      </Table>
      </>
    )
  }

export { MainPage }
/*{list.map(title, description , time)} */
