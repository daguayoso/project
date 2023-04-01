const express = require("express")
const router = express.Router();
const cors = require("cors")
const app = express();

const mysql = require('mysql');

router.use(express.json());
router.use(cors());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "kim",
    password: "1698",
    database:"data" 
    }
)

module.exports = db;

const Uquery = 'SELECT * FROM usercredentials';

  db.query(Uquery, (err, results, fields) => {
    if (err) {
        console.error('Error retrieving quotes from the database:', err);
  } else {
        console.log('Retrieved quotes from the database:', results);
  }
 
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    
})

const addUser = (Uquery, callback) => {
  const Usql = 'INSERT INTO usercredentials (username, password) VALUES(?, ?)';
  const Uvalues = [Uquery.username, Uquery.password];
  db.query(Usql, Uvalues, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result.insertId);
  });
  
}; 

/*const mockUser = {
  username:"kim",
  password:"1698",

};
*/

addUser(mockUser, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Quote added successfully with ID }`);
  }
  
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password]),
    (err, result) => {
        if(err){
            req.setEncoding({err: err});
        }else{
            if(result.length > 0){
                res.send(result);
            }else{
                res.send({message: 'WRONG USERNAME OR PASSWORD'});
            }
        }
    }
    db.end();
})
db.end();
app.listen(3001, () => {
    console.log('running backend server');
})
