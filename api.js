const express  = require('express');
const cors = require('cors');

const app = express();

app.listen(3000,()=>{
    console.log('running!');
})
app.use(cors());
// Parsing json so we can understand json req
app.use(express.json()) // We use app.use() middleware

/* 
'/' -> res  = this is working
'/signin' -> POST = success/fail
'/register' -> POST = return newly createduser object
'/profile/:userid' -> GET = return user //Note optional userid param
*/

// Index endpoint
app.get('/',(req,res)=>{
    console.log(":)");
    return res.status(200).json("Server is running")
})

// Log-in endpoint
app.post('/signin',(req,res)=>{
    console.log(req.body.toString());
    // Load hash from your password DB.
    /*
     bcrypt.compare("password", "$2a$10$N1fTm55IwPUTWasCVvaaSuQ9ya.e3ChN63b4UKm9F5CitSMExwRsS", function(err, res) {
         console.log("It is:"+res)
     });
     bcrypt.compare("notpassword", "$2a$10$N1fTm55IwPUTWasCVvaaSuQ9ya.e3ChN63b4UKm9F5CitSMExwRsS", function(err, res) {
         console.log("It is"+res);
     });  */
     let thisUser = null;
     database.users.forEach((user)=>{
         console.log(user);
         if(req.body.email === user.email && 
             req.body.password === user.password){
                 thisUser = res.json(user);
                 //Return is used to stop from sending multiple res
         }
     })
         if(thisUser!==null){
             return res.json(thisUser);
         }else{
             return res.status(400).json('Sorry, please try again');
         }
     });

// Register endpoint:
app.post('/register',(req,res)=>{
    const {password} = req.body.password; // Destructuring
    const user = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        entries: 0,
        joined: new Date()
    }
    try{
        bcrypt.hash(password, null, null, function(err, hash) {
            console.log(hash);
            database.users.push(user);
            console.log(database.users);
        });
    } catch(err){
        res.status(400).json("Error!");
    }
    res.json(database.users[database.users.length-1]);
//NOTE: ALWAYS need to send a res
})