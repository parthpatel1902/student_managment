const Student = require('./../models/M_student');
const { successRes, errorRes } = require("../res/msgcode");

const addStudent = async(req, res) => {
    try{

        const { name, email, mobile, bloodgroup, gender, bdate, height, password } = req.body;

        let isEmailAvl = await Student.find({ email: email });

        var insert_data = {
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            bloodgroup: bloodgroup,
            gender: gender,
            bdate: bdate,
            height: height
        };

        const res_add = new Student(insert_data);

        res_add.save()
            .then((result) => {
                res.send(true)
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

const displayStudent = async(req,res)=>{
    try {

        const res_data = await Student.find({isDelete:false}).sort({_id:-1});
        res.send(res_data);

    } catch (error) {
        console.log("Error from the displayStudent  Function >>>>>", error.message);
        return catchRes(res,500,"Internal Server Error");
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id, name, email, password } = req.body;

        const updateData = {
            name:name,
            email:email,
            password:password
        }

        const res_update = await Student.findByIdAndUpdate(id, updateData);

        res.send({success:true});

    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const removeStud = async(req,res)=>{
    try {
        const res_update = await Student.findByIdAndUpdate(req.body.id, {isDelete:true});
        res.send({success:true});
    } catch (error) {
        
    }
}



module.exports = {
    addStudent,displayStudent,updateStudent,removeStud
};