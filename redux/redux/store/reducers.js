import { GET_TRACK_BY_ARTIST,GET_VIDEOS_BY_ARTIST } from './actions';

const initialState =null;

export default (state=initialState,action)=>{
    switch (action.type) {
        case GET_TRACK_BY_ARTIST:
            return{
                ...state,
                allTracks: action.data
            }
        case GET_VIDEOS_BY_ARTIST:
            return{
                ...state,
                //allTracks: action.data
            }
        default:
            return state;
    }
}