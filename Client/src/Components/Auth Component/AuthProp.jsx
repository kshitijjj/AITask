export const emailInput=[
    {
        type:"text",
        name:"email",
        placeholder:"johndoe@gmail.com",
        validation:{ 
            required:"Email ID is required",
                pattern: {
                        value: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email address",
                    }
                },
        errorMessage:"Please enter valid email ID"
    }
]
