import express from 'express'
const app: express.Express = express()
const port = 3000

import { userRouter } from './routes/user'
import { articleRouter } from './routes/article'
import { favoriteRouter } from './routes/favorite'
import { reviewRouter } from './routes/review'
import { reviewVoteRouter } from './routes/review_vote'
import { badgeRouter } from './routes/badge'
import { badgeFlameRouter } from './routes/badge_flame'
import { badgeTextRouter } from './routes/badge_text'

app.use('/users', userRouter)
app.use('/articles', articleRouter)
app.use('/favorites', favoriteRouter)
app.use('/reviews', reviewRouter)
app.use('/review_votes', reviewVoteRouter)
app.use('/badges', badgeRouter)
app.use('/badge_flames', badgeFlameRouter)
app.use('/badge_texts', badgeTextRouter)

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
