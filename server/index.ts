import express, { Request, Response, NextFunction } from "express"
import { PrismaClient } from '@prisma/client'
import asyncHandler from 'express-async-handler'

const app = express();
const prisma = new PrismaClient();
const cards = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9",
               "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9",
               "y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9",
               "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9",
               "k1", "k2", "k3", "k4"];
               
function shuffle_cards() {
  cards.sort(() => Math.random() - 0.5);
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.send('Something broke!')
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  shuffle_cards();
  for (const card of cards) {
    console.log(card);
  }
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