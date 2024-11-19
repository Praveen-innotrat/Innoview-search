import * as Yup from "yup";

export const signUpSchema = Yup.object({
    fName : Yup.string().min(2, "*Must be 2 characters").max(25).required("*Please enter your First name"),
    lName : Yup.string().min(2, "*Must be 2 characters").max(25).required("Please enter your Last name"),
    email : Yup.string().email().required("Please enter your Email"),
    tel : Yup.number().min(10).required("Please Enter your number"),

});