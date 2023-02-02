const initialData = {
    campaigns:[
        {"id":1,"name":"Divavu","startDate":"9/19/2017","endDate":"3/9/2018","Budget":88377, "userId": 3},
        {"id":2,"name":"Jaxspan","startDate":"11/21/2017","endDate":"2/21/2023","Budget":608715, "userId": 6},
        {"id":3,"name":"Miboo","startDate":"11/1/2017","endDate":"6/20/2017","Budget":239507, "userId": 7},
        {"id":4,"name":"Trilith","startDate":"8/25/2017","endDate":"11/30/2017","Budget":179838, "userId": 1}
    ]
}

const addCampaignsReducer = (state=initialData, action) => {
    switch(action.type){
        case "ADD_CAMPAIGN":
            const data = action.payload;

             return {
                campaigns: [
                    ...state.campaigns,
                    ...data
                ]
            };
        default: return state;
    }
}

export default addCampaignsReducer;