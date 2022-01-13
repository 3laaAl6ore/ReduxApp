export const GET_TRACK_BY_ARTIST= 'GET_TRACK_BY_ARTIST';
export const GET_VIDEOS_BY_ARTIST= 'GET_TRACK_BY_ARTIST';

const baseUrl = 'https://itunes.apple.com/search';

export const getTracksByArtistDispatch=(data)=>{
    return dispatch =>{
        dispatch({type:GET_TRACK_BY_ARTIST,data});
    }
}

export const getTracksByArtist = (artist,entity)=>{
    
    return async dispatch=>{
        try {
            const response=await fetch(`${baseUrl}?term=${artist}&entity=${entity}`,{
                method: 'GET',
            });
            const data= await response.json();
            if(data){
                console.log(JSON.stringify(data))
                dispatch(getTracksByArtistDispatch(data));
            }
            else{
                let message= 'Something is wrong with the data . '
                console.log(message)
                throw new Error(message);
            }
        } catch (error) {
            let message= 'Something is wrong with the data . '
            console.log(message)
            throw new Error(message);
        }
    }

}


export const getVideosByArtistDispatch=(data)=>{
    return dispatch =>{
        dispatch({type:GET_VIDEOS_BY_ARTIST,data});
    }
}

export const getVideosByArtist = (artist)=>{

    return async dispatch=>{
        const response=await fetch(`${baseUrl}?term=${artist}&entity=musicVideo`,{
            method: 'get',
        });
        const data= await response.json();
        if(data){
            console.log(data);
            dispatch(getVideosByArtistDispatch(data));
        }
        else{
            let message= 'Something is wrong with the data . '
            throw new Error(message);
        }
    }

}