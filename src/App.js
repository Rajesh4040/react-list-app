import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNavigation from "./layouts/SideNavigation";
import MainContent from "./layouts/MainContent";
import Lists from "./components/Lists";
import ListPage from "./pages/ListPage";
import { Modal, ModalButton, ModalTitle } from "./components/Modal";
// Get lists and tasks from localStorage
let localData = {
  lists: [],
  tasks: []
};
// If the JSON string isn't valid, we skip
try {
  const localLists = JSON.parse(localStorage.getItem("lists"));
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
  const localTheme = localStorage.getItem("theme");
  // Check that vars aren't null
  if (Array.isArray(localLists) && Array.isArray(localTasks)) {
    localData.lists = localLists;
    localData.tasks = localTasks;
  }
  if (localTheme) localData.theme = localTheme;
} catch {
  // If JSON string is invalid do nothing
}

const App=()=> {
  // Get lists and tasks from localStorage
  const [lists, setListsState] = React.useState(localData.lists);
  const [tasks, setTasksState] = React.useState(localData.tasks);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEdittingbyRoot, setIsEdittingbyRoot] = React.useState(false);
  
  // eslint-disable-next-line
  const[errMessage,setErrMessage]=React.useState('')

  const saveData=(lists_, tasks_)=> {
    localStorage.setItem("lists", JSON.stringify(lists_));
    localStorage.setItem("tasks", JSON.stringify(tasks_));
  }
	const toggleModalHandler=()=> {
		setIsModalOpen(!isModalOpen);
    window.location.reload(false);
	}
  const setLists=(lists_)=> {
    setListsState(lists_);
    saveData(lists_, tasks);
  }

  const setTasks=(tasks_)=> {
    setTasksState(tasks_);
    saveData(lists, tasks_);
  }

  const addList=(list)=> {
      setLists([...lists, list]);
  }

  const editList=(newList)=> {
    const tempLists = lists.slice();
    const index = tempLists.findIndex((list) => list.id === newList.id);
    Object.assign(tempLists[index], newList);
    setLists(tempLists);
  }

  const removeList=(id)=> {
    const tempLists = lists.slice();
    const index = tempLists.findIndex((list) => list.id === id);
    tempLists.splice(index, 1);
    setLists(tempLists);
  }

  const addTask=(_task)=> {
    if(tasks.map(task=>task.text).includes(Object.values(_task)[1]))
   {  
     setErrMessage(`${Object.values(_task)[1]}-already exists in Tasks Lists.`)
     setIsModalOpen(!isModalOpen);
   }
    else{
    setErrMessage('') 
    setTasks([...tasks, _task]); 
    }
  }

  const editTask=(newTask)=> {
    if(tasks.map(task=>task.text).includes(Object.values(newTask)[1]))
    {    
      setIsEdittingbyRoot(true)
      setErrMessage(`${Object.values(newTask)[1]}-already exists in Tasks Lists.`)
      setIsModalOpen(!isModalOpen);
    }
     else{
      setIsEdittingbyRoot(false)
       setErrMessage('') 
    const tempTasks = tasks.slice();
    const index = tempTasks.findIndex((task) => task.id === newTask.id);
    Object.assign(tempTasks[index], newTask);
    setTasks(tempTasks);
    
     }
    
  }

  const removeTask=(id)=> {
    const tempTasks = tasks.slice();
    const index = tempTasks.findIndex((task) => task.id === id);
    tempTasks.splice(index, 1);
    setTasks(tempTasks);
  }

  return (
    <div>
    <Router>
        <SideNavigation>
          <Lists data={lists} onAddList={addList} />
        </SideNavigation>
        <MainContent>
          <div className="flex flex-row mb-6">
          </div>
          <Switch>
            {lists.map((list) => (
              <Route key={list.id} path={"/" + list.id}>
                <ListPage
                  list={list}
                  tasks={tasks}
                  onAddTask={addTask}
                  onEditTask={editTask}
                  isEdittingbyRoot={isEdittingbyRoot}
                  onRemoveTask={removeTask}
                  onEditList={editList}
                  onRemoveList={removeList}
                />
              </Route>
            ))}         
          </Switch>
        </MainContent>   
    </Router>
    <Modal isOpen={isModalOpen} onModalExit={toggleModalHandler}>
	   <div className="text-red-500">
		  <ModalTitle>{errMessage}</ModalTitle>
		</div>
		<div className="flex flex-row justify-end">
			<ModalButton onClick={toggleModalHandler} isPrimary="true">Ok</ModalButton> 
		</div>
	</Modal>
</div>
  );
}
export default App;
