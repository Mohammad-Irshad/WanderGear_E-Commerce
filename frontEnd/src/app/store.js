import {configureStore} from '@reduxjs/toolkit'
import  productsSlice  from '../pages/features/productsSlice'


export default configureStore({
    reducer : {
        products : productsSlice
    }
})
