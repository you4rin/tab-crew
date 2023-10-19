import express, { Request, Response, NextFunction } from "express"
import { PrismaClient } from '@prisma/client'
import asyncHandler from 'express-async-handler'

const app = express();
const prisma = new PrismaClient();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.send('Something broke!')
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.get("/user/:id", asyncHandler(async (req, res) => {
  console.log(req.query);
  const data = await prisma.user.findUnique({
    where: {
      id: +req.params.id
    },
    select: {
      id:true,
      email: true,
      name: true
    }
  })
  res.send(data);
}))

app.post("/add", asyncHandler(async (req, res) => {
  const data = await prisma.user.create({
    data: {
      email: "you4rin@naver.com",
      name:"아티초크"
    }
  })
  console.log(data);
  res.send("완료")
}))

app.listen(3000, ()=>{console.log("Start App!!")})