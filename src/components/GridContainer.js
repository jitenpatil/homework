
import { useDispatch, useSelector } from "react-redux";
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
  
const compareDates = (date) => {
    let inputdate = new Date(date).getTime();
    let currentDate = new Date().getTime();
  
    if(inputdate > currentDate)
      return true;
    if(inputdate === currentDate)
      return true;
    if(inputdate < currentDate)
      return false;
    
};

function getNamesFromIds(campaigns, users){
    let arr = campaigns.map((campaign_elem)=>{

        let user = users.filter((user_elem) => campaign_elem.userId===user_elem.id);

        if(user[0]){
          return {
            ...campaign_elem,
          'username': user[0].name
          }
        }

        return {
          ...campaign_elem,
          'username': 'Unknown User'
        }

    });
    return arr;
}

const GridContainer = ({filterdates}) => {
    const dispatch = useDispatch();
    const campaigns = useSelector((state)=>state.addCampaignsReducer.campaigns);

    const [rows, setRows] = useState([]);

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users").then(res=>{
            
            let allrows = getNamesFromIds(campaigns, res.data);
            setRows(allrows);

        })
    },[campaigns]);  

    /*Global Method for testing*/
    window.AddCampaigns = (value) => {
        if(Array.isArray(value)){
            dispatch(addCampaigns(value));
        }
        else
            return "Please add object array";
    }
    
    const columns = [
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'username', headerName: 'User Name', width: 350 },
        { field: 'startDate', headerName: 'Start Date', width: 180},
        { field: 'endDate', headerName: 'End Date', width: 180 },
        { field: 'active', headerName: 'Active', renderCell:(params)=> getStatus(params) },
        { field: 'Budget', headerName: 'Budget', ...usdPrice },
    ];

    return <>
        <div>
            <div style={{ height: 520, width: '100%' }}>
                <DataGrid 
                    rows={rows} 
                    columns={columns}
                    /*components={{ Toolbar: QuickSearchToolbar }}*/
                />
            </div>
        </div>
    </>
}

export default GridContainer;