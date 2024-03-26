const express = require('express');
const router = express.Router();

const Distributors = require('../model/distributors');

router.get('/get-list-distributor',async(req,res)=>{
    try {
        const data = await Distributors.find().sort({createdAt:-1});
        if(data.length>0){
            res.json({
                status:200,
                mess:"Thành công",
                data:data
            })
        }
        else{
            res.json({
                status:400,
                mess:"Thất bại",
                data:[]
            })
        }
    } catch (error) {
        res.json({
            status:404,
            mess:"Thất bại",
            data:data
        })
        console.log(error);

    }
})

router.get('/search-distributor',async(req,res)=>{
    try {
        const key = req.query.key;

        const data = await Distributors.find({name:{'$regex':key,"$options":"i"}}).sort({createdAt:-1})
        if(data.length>0){
            res.json({
                status:200,
                mess:"Thành công",
                data:data
            })
        }
        else{
            res.json({
                status:400,
                mess:"Thất bại",
                data:[]
            })
        }
    } catch (error) {
        res.json({
            status:404,
            mess:"Thất bại",
            data:data
        })
        console.log(error);

    }
})

router.delete('/delete-distributor-by-id/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Distributors.findByIdAndDelete(id);
        if(result.length>0){
            res.json({
                status:200,
                mess:"Xoá thành công",
                data:result
            })
        }
        else{
            res.json({
                status:400,
                mess:"Xoá Thất bại",
                data:[]
            })
        }
    } catch (error) {
        res.json({
            status:404,
            mess:"Thất bại",
            data:[]
        })
        console.log(error);
    }
})

router.put('/update-distributor-by-id/:id',async(req,res)=>{
    try {
        const {id} =req.params;
        const data = req.body;
        const result = await Distributors.findByIdAndUpdate(id,{name:data.name});
        if(result.length>0){
            res.json({
                status:200,
                mess:"Thêm thành công",
                data:result
            })
        }
        else{
            res.json({
                status:400,
                mess:"Thêm Thất bại",
                data:[]
            })
        }
    } catch (error) {
        res.json({
            status:404,
            mess:"Thất bại",
            data:[]
        })
        console.log(error);
    }
})

router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body; // lay du lieu tu body
        const newDistributors = new Distributors({
            name: data.name
        }); // tao mot doi tuong moi

        const result = await newDistributors.save(); // them vao database
        if (result) {
            // neu them thanh cong result !null thi tra ve du lieu
            res.json({
                "status": 200,
                "messenger": "Them thanh cong",
                "data": result
            })
        } else {
            // neu them khong thanh cong result == null thi tra ve du lieu rong []
            res.json({
                "status": 400,
                "messenger": "Them khong thanh cong",
                "data": []
            })
        }
    } catch (err) {
        console.log(err);
    }
});
module.exports=router;