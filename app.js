const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

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

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/api/Car_Reg', (req, res) => {
    console.log(`Page No = ${req.query.pgno} : Sort Order = ${req.query.sortorder}`)
    res.send(Car_Reg);
})

app.get('/api/Car_Reg/:Car_Reg_No', (req, res) => {
    const Car = Car_Reg.find(c => c.Car_Reg_No === parseInt(req.params.Car_Reg_No))
    if (!Car) return res.status(404).send("The Car with the given CarRegNo doesn't exists!");
    res.send(Car);
})


app.get('/api/Customer_Reg', (req, res) => {
    res.send(Customer_Reg);
})


app.post('/api/Car_Reg', (req, res) => {
    const {error} = validateCar(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const Car = {
        Car_Reg_No: Car_Reg.length + 1,
        Car_Chasis_No: req.body.Car_Chasis_No,
        Model: req.body.Model,
        Manufacture_Year: req.body.Manufacture_Year,
        seat_Capacity: req.body.seat_Capacity,
        status: req.body.status
    }
    Car_Reg.push(Car);
    res.send(Car_Reg);
})

app.put('/api/Car_Reg/:Car_Reg_No', (req, res) => {
    const Car = Car_Reg.find(c => c.Car_Reg_No === parseInt(req.params.Car_Reg_No))
    if (!Car) return res.status(404).send("The Car with the Input Car_Reg_No doesn't exists!");
    const {error} = validateCar(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    Car.name = req.body.name;
    Car.type = req.body.type;
    res.send(Car);
})

app.delete('/api/Car_Reg/:Car_Reg_No', (req, res) => {
    const Car = Car_Reg.find(c => c.Car_Reg_No === parseInt(req.params.Car_Reg_No))
    if (!Car) return res.status(404).send("The Car with the given Car_Reg_No doesn't exists!");

    const index = Car_Reg.indexOf(Car);
    Car_Reg.splice(index, 1);

    res.send(Car_Reg);
})

function validateCar (Car) {
    const schema = Joi.object({
        Car_Reg_No: Joi.number().required(),
        Car_Chasis_No: Joi.number().required(),
        Model: Joi.string().required()
    })
    return schema.validate(Car);
}


const port = process.env.PORT || 3000
app.listen(port, console.log(`Listening on PORT ${port}`));