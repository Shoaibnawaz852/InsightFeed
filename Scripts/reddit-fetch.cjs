const subredditCommunityMap = {
  artificial: 1,
  MachineLearning: 1,
  technology: 2,
  startups: 3,
  Entrepreneur: 3,
  programming: 4,
  webdev: 4,
  growthhacking: 5
}


require('dotenv').config({ path: './.env' })

const axios = require('axios')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const subreddits = [
  'artificial',
  'MachineLearning',
  'technology',
  'startups',
  'Entrepreneur',
  'programming',
  'webdev',
  'growthhacking'
]

async function fetchSubreddit(sub) {
  const url = `https://www.reddit.com/r/${sub}/top.json?limit=20&t=day`

  const response = await axios.get(url, {
    headers: { 'User-Agent': 'InsightFeedBot/1.0' }
  })

  return response.data.data.children
}

function filterPost(post) {
  const data = post.data

  if (data.over_18) return false
  if (data.ups < 50) return false
  if (!data.title) return false

  return true
}

async function savePost(post, subreddit) {
  const data = post.data

  const { error } = await supabase
    .from('posts')
    .upsert({
      title: data.title,
      content: data.selftext,
      tech_tag: subreddit,
      upvotes: data.ups,
      source: 'reddit',
      source_url: `https://reddit.com${data.permalink}`,
      community_id: subredditCommunityMap[subreddit] || 1,// you can map later
      user_id: null, // system posts
      created_at: new Date(data.created_utc * 1000),
      quality_score: Math.min(data.ups, 1000)
    }, {
      onConflict: ['source_url']
    })

  if (error) console.error(error)
}

async function run() {
  for (const sub of subreddits) {
    console.log(`Fetching r/${sub}`)

    const posts = await fetchSubreddit(sub)

    for (const post of posts) {
      if (filterPost(post)) {
        await savePost(post, sub)
      }
    }
  }

  console.log('Done fetching Reddit posts')
}

run()
