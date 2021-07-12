const express = require("express");
const FriendList = require("./Model/FriendList");
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.get('/',(req,res)=>{
    res.json(FriendList)

})

    //getting friends  ids
    app.get('/:id',(req,res)=>{
        const {id} = req.params
        const FriendID = FriendList.find((get)=> get.id === Number(id))
        
        if(!FriendID){
            res.status(404).send("Cannot get yOUR iD")

        }
        return res.json(FriendID)

    })
        //creating
        app.post('/',(req,res)=>{
            let newFriends = req.body
            let friends = {

                id: newFriends.id,
                name: newFriends.name,
                Age: newFriends.Age,
                phone: newFriends.phone
            }

            FriendList.push(friends);
            res.json(FriendList)
        })

        


app.listen(5000,()=>{
    console.log('sever is running at this port...');
})