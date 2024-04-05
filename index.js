

const http = require('http');

const Car_Reg = [
    {Car_Reg_No: 1, Car_Chasis_No: 558484, Model:"Honda" , Manufacture_Year:2007, seat_Capacity:5, status:"availible" },
    {Car_Reg_No: 2, Car_Chasis_No: 559451, Model:"Toyta", Manufacture_Year:2015, seat_Capacity:5, status:"availible"},
    {Car_Reg_No: 3, Car_Chasis_No: 555888, Model:"Honda", Manufacture_Year:2008, seat_Capacity:6, status:"OnRent"},
]

const Customer_Reg = [
    {CustomerNo: 1,  Customer_Name:"Huzaifa" ,  Address:"Malir Cantt", Customertype:"Bargainer" },
    {CustomerNo: 2,  Customer_Name:"Ahmed", Address:"North Karachi", Customertype:"Walk-In"},
    {CustomerNo: 3,  Customer_Name:"Ali", Address:"Sadar", Customertype:"Regular"},
]

const server = http.createServer(function(req, res) {
    if(req.url === '/') {
        res.write("Hello World!");
        res.end();
    }

    if  (req.url === '/api/Car_Reg') {
        res.write(JSON.stringify(Car_Reg));
        res.end();
    }

    if (req.url === '/api/Customer_Reg') {
        res.write(JSON.stringify(Customer_Reg));
        res.end();
    }

})

server.listen(2500);
console.log('Listening on port 2500....')

