const initialData = {
    campaigns:[]
}
/*
const todoReducers = (state=initialData, action) => {
    switch(action.type) {
        case "ADD_TO_DO":
            const {id, data} = action.payload;

            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: id,
                        data: data
                    }
                ]
            };
            
        default: return state;
    }
}

export default todoReducers;
*/


const addCampaignsReducer = (state=initialData, action) => {
    switch(action.type){
        case "ADD_CAMPAIGN":
            const {id, data} = action.payload;

             return {
                ...state,
                campaigns: [
                    ...state.campaigns,
                    {
                        id: id,
                        data: data
                    }
                ]
            };
        default: return state;
    }
}