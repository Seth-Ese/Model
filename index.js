const express = require("express");
let FriendList = require("./Model/FriendList");
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

                id: FriendList.length + 1,
                name: newFriends.name,
                Age: newFriends.Age,
                phone: newFriends.phone
            }

            FriendList.push(friends);
            res.json(FriendList)
        })

      // Updating
      
      app.put('/:id', (req,res)=>{
          const {id} = req.params
          const body = req.body

          const newUpdates = FriendList.find((list)=> list.id === Number(id))
          const index = FriendList.indexOf(newUpdates)

        if(!newUpdates){
            res.status(404).send("Cannot be Updated")
        }
        const updated = {...newUpdates, ...body}
        FriendList[index]= updated
        res.status(200).send(updated)
      })
        // Delete
      app.delete('/:id',(req,res)=>{
          const {id} = req.params

          const deleteFriend = FriendList.filter((friend)=> friend.id != Number(id))

          if(!deleteFriend){
              res.status(404).send('Friend not found')
          }
          FriendList = deleteFriend
          res.send(FriendList)
      })
    

app.listen(5000,()=>{
    console.log('sever is running at this port...');
})