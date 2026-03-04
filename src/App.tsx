import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { adresses, buildHierarchyFromAddresses, groupingByOrder, selectedTree, treeToFundsCenterNodes } from './hardcodedData'    

function App() {
  const [count, setCount] = useState(0)

  // Build hierarchy from addresses using groupingByOrder
  const builtHierarchy = buildHierarchyFromAddresses(adresses, groupingByOrder)

  const selectedFundsCenters = treeToFundsCenterNodes(selectedTree)

  console.log('builtHierarchy', builtHierarchy)
  // console.log('selectedFundsCenters', selectedFundsCenters)


  return (
    <>
    <div>hello</div>

    </>
  )
}

export default App
