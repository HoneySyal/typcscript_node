"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const userFbRoute_1 = __importDefault(require("./routers/userFbRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
const dbUrl = 'mongodb+srv://admin:admin@cluster0.rs38upe.mongodb.net/studentDb?retryWrites=true&w=majority';
//routes
app.get('/check', (req, res) => {
    res.json({
        data: 'Checking route'
    });
});
app.use('/user', userRouter_1.default);
app.use('/fb/user', userFbRoute_1.default);
//db
mongoose_1.default
    .connect(dbUrl)
    .then((result) => {
    console.log('Db connected !!');
    //server
    app.listen(port, () => {
        console.log('Server is running http://localhost:' + port + '/');
    });
})
    .catch((error) => {
    console.error(error);
});
