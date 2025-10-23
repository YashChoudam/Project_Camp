import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is requrired")
        .isLowercase()
        .withMessage("Username must be in lowercase")
        .isLength({min:3})
        .withMessage("Username must be atleast 3 charecters"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password must not be empty"),
    body("fullname")
        .optional()
        .trim()
        .notEmpty()
  ];
};


const userLoginValidator = () =>{
    return [
        body("email")
            .optional()
            .isEmail()
            .withMessage("Email is invalid"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ]
}
export { userRegisterValidator , userLoginValidator};
