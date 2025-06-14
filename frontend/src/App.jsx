// import { useState, useEffect } from 'react'
// import { getItems, getItem, createItem, updateItem, deleteItem} from "./api"
import './App.css'

function App() {

  // Pages

  return (
    <>
      <button onClick={makePost}>
        Create Post
      </button>
    </>
  )
}

export default App

// const [items, setItems] = useState()

//   function makePost() {
//     let postObject = {
//       title: "ZZZZ",
//       description: "XXX",
//       content: "YYYY",
//       author: "AAAA",
//       dateCreated: new Date()
//     }

//     createItem(postObject)
//   }

  // useEffect(() => {
  //   async function loadAllItems() {
  //     let data = await getItems()
  //     if (data) {
  //       setItems(data)
  //     }
  //   }

  //   loadAllItems()
  // }, [])