import {z} from "zod";


export const threadValidation=z.object({
    thread:z.string().min(3,
        {message: 'Minimum 3 characters '}).nonempty(),
    accountId:z.string()
})
export const commentValidation=z.object({
    thread:z.string().min(3,
        {message: 'Minimum 3 characters '}).nonempty()

})