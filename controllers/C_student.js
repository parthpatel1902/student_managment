const Student = require('./../models/M_student');
const { catchRes, successRes, errorRes } = require("../res/msgcode");

const addStudent = async(req, res) => {
    try{

        const { name, email, password } = req.body;

        let isEmailAvl = await Student.find({ email: email });
    
        if (!name) {
            return errorRes(res, 201, "Name is required");
        } if (!email) {
            return errorRes(res, 201, "Email is required");
        } if (!password) {
            return errorRes(res, 201, "Password is required");
        } 

        if (/\s/.test(name)) {
            return errorRes(res, 201, "The name must not contain space");
        } if (!/^[a-zA-Z]+$/.test(name)) {
            return errorRes(res, 201, "Only characters are allowed in the name");
        } if (name.length < 3) {
            return errorRes(res, 201, "Name must contain at least 3 characters");
        } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return errorRes(res, 201, "Email is not Valid");
        }
        if (isEmailAvl.length > 0) {
            return errorRes(res, 201, "Email is  already available");
        }
        if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}/.test(password)) {
            return errorRes(res, 201, "At least 8 characters long and Contains a mix of letters and digits");
        }

        var insert_data = {
            name: name,
            email: email,
            password: password,
        };

        const res_add = new Student(insert_data);

        res_add.save()
            .then((result) => {
                return successRes(res, 200, "Student Register Sucessfully.", res_add);
            })
            .catch((error) => {
                console.log("Error from addStudent function >>>>> ", error.message);
                return errorRes(res, 200, "Some Internal Error");
        });
    }catch(e){  
        console.log(e);
        return catchRes(res,201,"Some Internal Error");  
    } 
}

module.exports = {
    addStudent
};