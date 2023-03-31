const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "david",
password: "1698",
database:"data" 
})

module.exports = db;

const addQuote = (quotes, callback) => {
    const sql = "INSERT INTO quotes (gallons, deliveryDate, address, price, totalAmountDue) VALUES (?, ?, ?, ?, ?)";
    const values = [quotes.gallons, quotes.deliveryDate, quotes.address, quotes.price, quotes.totalAmountDue];
    db.query(sql, values, (error, result) => {
      if (error) {
        return callback(error);
      }
      callback(null, result.insertId);
    });
    
  };
  
  const query = 'SELECT * FROM quotes';
  db.query(query, (err, results, fields) => {
    if (err) {
        console.error('Error retrieving quotes from the database:', err);
  } else {
        console.log('Retrieved quotes from the database:', results);
  }
 
});

  const mockQuote = {
    gallons: 100,
    deliveryDate: new Date(),
    address: '123 Main St, Houston, USA',
    price: 2.50,
    totalAmountDue: 250.00,
    ID:100

  };
  
  // call the addQuote function with the mock quote
  addQuote(mockQuote, (error, quoteId) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Quote added successfully with ID ${quoteId}`);
    }
    
  });
  const deleteMockQuote = (quoteId) => {
  
    // delete the mock quote with the specified ID
    const query = `DELETE FROM quotes WHERE id = ${quoteId}`;
    db.query(query, (err, results, fields) => {
      if (err) {
        console.error('Error deleting mock quote:', err);
      } else {
        console.log('Deleted mock quote:', results);
      }
    });
    
  };
  db.end();
  module.exports = {
    addQuote,
    
  };
 
