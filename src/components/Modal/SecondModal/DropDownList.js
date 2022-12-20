import { useEffect, useState } from "react"

export const DropDownList = ({list,setValue,string}) => {
  console.log(list);
   
  return (
    <select onClick={e=>setValue(e.target.value)}>
        {list.map(collection=>string === "projects"? <option key={collection.projectname} value={collection.projectname}>{collection.projectname}</option>:string === "epics"?<option key={collection.epicname} value={collection.epicname}>{collection.epicname}</option>:string === "features"?<option key={collection.featurename} value={collection.featurename}>{collection.featurename}</option>:string === "pbis"?<option key={collection.pbiname} value={collection.pbiname}>{collection.pbiname}</option>:
        <></>)}
    </select>
  )
}
