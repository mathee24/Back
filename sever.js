const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const session = require('express-session');





app.use(express.json());
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true 
}));

const sequelize = new Sequelize('database','username','password',{
    host:'localhost',
    dialect:'sqlite',
    storage: 'Bookinfo.sqlite'
});

const Books =sequelize.define('book',{
    bookid:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    typeid:{
        type: Sequelize.INTEGER,
        foreignkey: true
    }
});

const Users = sequelize.define('user',{
    userid:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

const Types = sequelize.define('type',{
    typeid:{
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    type:{
        type: Sequelize.STRING,
    }
});

const Reviews = sequelize.define('review',{
    revid:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    comment:{
        type: Sequelize.STRING
    },
    username:{
        type: Sequelize.STRING,

    },
    bookid:{
        type: Sequelize.INTEGER,
        foreignkey: true
    }
});

sequelize.sync();

app.get("/",(req,res)=>{
    res.render('nonelogin')
});
app.get("/index",(req,res)=>{
    res.render('index');
});

app.get("/login",(req,res)=>{
    res.render('login');
});
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const loginuser = await Users.findOne({ where: { username: username, password: password } });
        
        if (loginuser) {
            const { userid, username, email } = loginuser;
            
            req.session.email = email;
            req.session.userid = userid;
            req.session.username = username;
            
            res.send({ username: username, userid: userid, email: email });
            console.log("userid:", userid);
            console.log("username:", username);
            console.log("password:", password);
        } else {
            res.status(400).send('Invalid username or password');
            console.log("missing:", username);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Error');
        } else {
            console.log('Logout successful');
            res.send('logout');
        }
    });
});

app.get("/register", (req, res) => {
    res.render("register");
});
app.post("/register",  (req, res) => {
    Users.create(req.body).then(newUser => {

        res.send('Hello, world!');
    }).catch(error => {
            console.error(error);
            res.status(500).send('Error');
        });

})




app.get("/book",(req,res)=>{

    Books.findAll().then(books =>{
        console.log(books);
        res.json(books);
    }).catch(err=>{
        res.status(500).send(err);
    });
});

app.get("/type",(req,res)=>{

    Types.findAll()
    .then(types => {
        console.log(types);
        res.json(types);
    })
    .catch(err => {
        console.error(err); 
        res.status(500).send(err); 
    });

})

app.get("/review/:bookid",(req,res)=>{
    Reviews.findAll({where:{ bookid: req.params.bookid }}).then(comment =>{
        if(!comment){
            res.status(404).send('Book not found');
        }else{
            res.json(comment);
        }
    }).catch(err =>{
        res.status(500).send(err);  
    });
    
})


app.get("/comment/:bookid", async (req, res) => {

    Books.findByPk(req.params.bookid).then(book =>{
        if(!book){
            res.status(404).send('Book not found');
        }else{
            res.json(book);
        }
    }).catch(err =>{
        res.status(500).send(err);
    });
});

app.post("/comment/:bookid", (req, res) => {
    const { bookid } = req.params; 
    const { comment,username } = req.body; 
    console.log("//////////////////////////////////",username);
    
    Reviews.create({ bookid: bookid, comment: comment, username:username })
        .then(newComment => {
            
            res.send('Comment created successfully');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error creating comment');
        });
});

app.get("/profile/:userid", async (req, res) => {
    try {
        Users.findByPk(req.params.userid).then(userdata => {
            if (!userdata) {
                res.status(404).send('User not found');
                
            } else {
                res.json(userdata);
                console.log(userdata);
            }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Error fetching user profile');
    }
});
app.get('update/:userid',(req,res)=>{
    res.send('xxxxx');
})
app.put('/update/:userid',(req,res)=>{
    Users.findByPk(req.params.userid).then(user=>{
        if(!user){
            res.status(404).send('Book not found');
        }else{
            user.update(req.body).then(()=>{
                res.send(user);
            }).catch(err=>{
                res.status(500).send(err);
            });
        }
    }).catch(err =>{
        res.status(500).send(err);
    });
});

app.delete('/profile/:userid',(req,res)=>{

    Users.findByPk(req.params.userid).then(del =>{
        if(!del){
            res.status(404).send('cant delete');
        }else{
            del.destroy(req.body).then(()=>{
                res.send(del);
            }).catch(err =>{
                res.status(500).send(err);
            });
        }
    }).catch(err =>{
        res.status(500).send(err);
    });
    });



const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}`))

