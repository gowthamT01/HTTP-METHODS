export const createUserValidatioSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username is required"
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Username must be at least 3 characters"
    }
  },
  age:{
    notEmpty:{
        errorMessage:"Age Coud not be eempey"
    }
  }
}