import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { adresses, buildHierarchyFromAddresses, groupingByOrder, selectedTree, treeToFundsCenterNodes } from './hardcodedData'    
import HierarchyTree from './HierarchyTree/HierarchyTree'

function App() {

  return (
    <>
    <HierarchyTree addresses={adresses} />

    </>
  )
}

export default App
