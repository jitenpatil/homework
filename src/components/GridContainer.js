
import { useDispatch } from "react-redux";
import { addCampaigns } from "../actions/index";
import React, { useEffect, useState } from 'react';
import QuickSearchToolbar from "./QuickSearchToolbar";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import ActiveStatus from "./ActiveStatus";


/*Grid functions*/
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: "name"
});
  
const usdPrice = {
    type: 'number',
    width: 230,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'font-tabular-nums',
};
  
function getStatus(params) {
    if( !compareDates(params.row.startDate) && compareDates(params.row.endDate) )
      return <ActiveStatus status='Active'/>;
    else
      return <ActiveStatus status='Inactive'/>;
}
  
const compareDates = (d) => {
    let date1 = new Date(d).getTime();
    let currentDate = new Date().getTime();
  
    if(date1 > currentDate)
      return true;
    if(date1 === currentDate)
      return true;
    if(date1 < currentDate)
      return false;
    
};

function getNamesFromIds(campaigns, users){
    let arr = campaigns.map((element)=>{
        let user = users.filter((ele)=>element.userId===ele.id);
        console.log(user[0]);
        if(user[0]){
          return {
            ...element,
          'username': user[0].name
          }
        }
        return {
          ...element,
          'username': 'Unknown User'
        }
    });
    return arr;
}

const GridContainer = () => {
    const dispatch = useDispatch();

    const [rows, setRows] = useState([]);
    const [campaigns, setCampaigns] = useState([
        {"id":1,"name":"Divavu","startDate":"9/19/2017","endDate":"3/9/2018","Budget":88377, "userId": 3},
        {"id":2,"name":"Jaxspan","startDate":"11/21/2017","endDate":"2/21/2023","Budget":608715, "userId": 6},
        {"id":3,"name":"Miboo","startDate":"11/1/2017","endDate":"6/20/2017","Budget":239507, "userId": 7},
        {"id":4,"name":"Trilith","startDate":"8/25/2017","endDate":"11/30/2017","Budget":179838, "userId": 1},
        {"id":5,"name":"Layo","startDate":"11/28/2017","endDate":"3/10/2018","Budget":837850, "userId": 9},
        {"id":6,"name":"Photojam","startDate":"7/25/2017","endDate":"6/23/2017","Budget":858131, "userId": 3},
        {"id":7,"name":"Blogtag","startDate":"6/27/2017","endDate":"1/15/2018","Budget":109078, "userId": 2},
        {"id":8,"name":"Rhyzio","startDate":"10/13/2017","endDate":"1/25/2018","Budget":272552, "userId": 4},
        {"id":9,"name":"Zoomcast","startDate":"9/6/2017","endDate":"11/10/2017","Budget":301919, "userId": 8},
        {"id":10,"name":"Realbridge","startDate":"3/5/2018","endDate":"10/2/2017","Budget":505602, "userId": 5}
    ]);

    

    const columns = [
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'username', headerName: 'User Name', width: 350 },
        { field: 'startDate', headerName: 'Start Date', width: 180},
        { field: 'endDate', headerName: 'End Date', width: 180 },
        { field: 'active', headerName: 'Active', renderCell:(params)=> getStatus(params) },
        { field: 'Budget', headerName: 'Budget', ...usdPrice },
    ];

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users").then(res=>{
            console.log(res);
            let allrows = getNamesFromIds(campaigns, res.data);
            
            console.log(allrows);
            setRows(allrows);
        })
    },[]);  

    /*Global Method for testing*/
    window.addValue = (value) => {
        dispatch(addCampaigns(value))
    }
  

    return <>
        <div>
            <div style={{ height: 420, width: '100%' }}>
                <DataGrid 
                    rows={rows} 
                    columns={columns}
                    components={{ Toolbar: QuickSearchToolbar }}
                />
            </div>
        </div>
    </>
}

export default GridContainer;