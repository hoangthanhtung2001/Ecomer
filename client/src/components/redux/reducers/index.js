import {combineReducers} from'redux'
import auth from'./authReducer'
import token from'./authToken'
export default combineReducers({
    auth,
    token
})