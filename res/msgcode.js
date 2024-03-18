//For Error Msg
const errorRes = async (res, stcode, msg) => {
    return res.status(stcode).json({
        success: false,
        statuscode: 0,
        message: msg,
    });
};

//For Success Msg 
const successRes = async (res, stcode, msg, info) => {
    return res.status(stcode).json({
        success: true,
        statuscode: 1,
        message: msg,
        data: info,
    });
};

//For Export Module
module.exports = {
    errorRes,
    successRes,
};