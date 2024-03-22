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
        const {id, name, email, mobile, bloodgroup, gender, bdate, height, password } = req.body;

        const updateData = {
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            bloodgroup: bloodgroup,
            gender: gender,
            bdate: bdate,
            height: height
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

const checkAvl = async (req, res) => {
    try {
        const { email , mobile ,id } = req.query;

        if(email && mobile){
            const user = await Student.find({email:email,mobile : mobile,isDelete:false})
            console.log(user);
            if (user) {
                res.json({ available: true });
            } else {
                res.json({ available: false });
            }
        }
        else if(email){
            const user = await Student.findOne({email : email,isDelete:false})
            if (user) {
                if(user._id.toString() == id){
                    res.json({ available: false });
                }else{
                    res.json({ available: true });
                }
            } else {
                res.json({ available: false });
            }
        }
        else if(mobile){
            const user = await Student.findOne({ mobile: mobile ,isDelete:false});
            if (user) {
                if(user._id.toString() == id){
                    res.json({ available: false });
                }else{
                    res.json({ available: true });
                }
            } else {
                res.json({ available: false });
            }
        }

       
    } catch (error) {
        console.error('Error checking email availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addStudent,displayStudent,updateStudent,removeStud,checkAvl
};