const mongoose = require('mongoose');

const uri ='mongodb+srv://khanhsnph43678:khanhsnph43678@cluster0.s2dwghm.mongodb.net/Lab5';

const connect = async ()=>{
    try {
        await mongoose.connect(uri);
        console.log('Kết nối thành công!');
    } catch (err ) {
        console.log('Kết nối thất bại!');
        console.log(err);
    }
}
module.exports={connect};