/* eslint-disable eqeqeq */
import { useState } from "react";
import {  useParams } from "react-router-dom";


function TaskDetails(){
  const { taskId } =useParams()
  const [description, setDescription] = useState("")
  const [hours, setHours] = useState("")

  const [list] = useState(() => {
    const savedList = localStorage.getItem("list")
    if (savedList)
     {return JSON.parse(savedList)
    } else{
      return []
    }
  })
  
  

  const [data, setData] =  useState(() => {
    const savedData = localStorage.getItem("data")

    if(savedData)
    {return JSON.parse(savedData)} else{
      return []
    }
  })

  

  const newPeriod ={
    id: Math.random(),
    taskId: taskId,
    Time: hours,
    Description: description
  }
  
  const addTime = (hours , description ) => {


    const newData = [...data, newPeriod]
    console.log(data)
    console.log(newPeriod)

    setHours("")
    setDescription("")
    localStorage.setItem('data', JSON.stringify(newData))
    setData(newData)
  }
  const task = list.filter(function(newTask){
    return newTask.id == taskId
  })

  const correctData = data.filter(function(newPeriod){
    return newPeriod.taskId == taskId
  })

  // eslint-disable-next-line no-cond-assign
  let totalAmount
  if(correctData.length > 0){
    let  sum = a => a.reduce((x, y) => x + y);
     totalAmount = sum(correctData.map(x => Number(x.Time)))
    
  }else{
    totalAmount = 0
  }
    //Delete

  function deleteItemFromStorage(id){
    let data = JSON.parse(localStorage.getItem('data'));
    setData(data.filter(newPeriod => newPeriod.id !== id))
    data.forEach(function(newPeriod,index){
      if(id === newPeriod.id){
        data.splice(index , 1)
      }
    })
    localStorage.setItem('data', JSON.stringify(data))
  }
 


  
  

  return(
    <><h1>Details</h1><div>
      {task.map((newTask) => (
        
        <div key={newTask.id}>
        <h1 >{newTask.Title}</h1>
        <h2 >{newTask.Description}</h2>
        <h3>Total time:{totalAmount}  hours </h3>
        </div>
      ))}
      
      <form action="submit">
              <label htmlFor="Title">Time</label>
              <input name="Time" type="number" id="Time" title="Time" placeholder="Time" value={hours} onChange={(e) => setHours(e.target.value)} />
              <label htmlFor="Description">Description</label>
              <textarea name="description" placeholder="Description" title='description' id="Description" cols="30" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </form><button onClick={() => addTime(hours, description)} type="submit">Add</button>
            <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Description</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
      
        {correctData.map((newPeriod) => (
          <tr key={newPeriod.id}>
            <td >{newPeriod.Time}</td>
            
            <td >{newPeriod.Description}</td>
              <td>
              { <button onClick={() => deleteItemFromStorage(newPeriod.id)} /* onChange={handleEditInputChange}*/>X</button> }
              </td>
          </tr>))}
        </tbody>
        </table>
    </div>

    </>
    )
}
export { TaskDetails }
