
export const addCampaigns = (data) => {
    return {
        type: "ADD_CAMPAIGNS",
        payload: {
            id: new Date().getTime().toString(),
            data: data
        }
    }
}
//

