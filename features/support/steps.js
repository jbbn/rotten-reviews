const { Given, When, Then } = require('cucumber')
const expect = require('expect')
const nock = require('nock')

const baseURL = 'https://www.rottentomatoes.com'

const movieSlugs = {
  'Shutter Island': '1198124-shutter_island'
}

const reviewSample =
  {
    "reviewer": "Daniel M",
    "date": "October 12, 2018",
    "stars": 4,
    "review": "Very cool plot twist at the end, enjoyable movie."
  }

const scope = nock(baseURL)
  .persist()
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  .get(`/m/1198124-shutter_island/reviews/`)
  .query({
    page: 1,
    type: 'user'
  })
  .reply(200,
    `<html>
      <span class="pageInfo">Page 1 of 2</span>
      <div class="review_table">
        <div class="row review_table_row">
          <a class="bold unstyled articleLink">Daniel M</a>
          <span class="fr small subtle">October 12, 2018</span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <div class="user_review">Very cool plot twist at the end, enjoyable movie.</div>
        </div>
        <div class="row review_table_row">
          <a class="bold unstyled articleLink">Ines P</a>
          <span class="fr small subtle">October 1, 2018</span>
          <span>
            <span class="glyphicon glyphicon-star"></span>
            <span class="glyphicon glyphicon-star"></span>
            ½
          </span>
          <div class="user_review">Uncomfortable length and unrewarding end.</div>
        </div>
      </div>
    </html>`)

const scope2 = nock(baseURL)
  .persist()
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  .get(`/m/1198124-shutter_island/reviews/`)
  .query({
    page: 2,
    type: 'user'
  })
  .reply(200,
    `<html>
      <span class="pageInfo">Page 1 of 2</span>
      <div class="review_table">
        <div class="row review_table_row">
          <a class="bold unstyled articleLink">Daniel M</a>
          <span class="fr small subtle">October 12, 2018</span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <div class="user_review">Very cool plot twist at the end, enjoyable movie.</div>
        </div>
        <div class="row review_table_row">
          <a class="bold unstyled articleLink">Ines P</a>
          <span class="fr small subtle">October 1, 2018</span>
          <span>
            <span class="glyphicon glyphicon-star"></span>
            <span class="glyphicon glyphicon-star"></span>
            ½
          </span>
          <div class="user_review">Uncomfortable length and unrewarding end.</div>
        </div>
      </div>
    </html>`)

Given('that I get the library', function () {
  // nothing to do here
})

When('I try to get the page {string} of the audience reviews of the movie {string}', function (page, movie) {
  const { RottenReviews } = this
  return RottenReviews.getAudienceReviews(movieSlugs[movie], page)
    .then(reviews => this.result = reviews[0])
})

Then('I see a JSON with a valid result', function () {
  scope.done()
  scope2.done()
  const got = Object.keys(this.result)
  const want = Object.keys(reviewSample)
  expect(got).toEqual(want)
})

Then('I see a JSON with the error message {string}', function (error_message) {
  const got = this.result.hasOwnProperty('error_message') ? this.result.error_message : ''
  const want = error_message
  expect(got).toEqual(want)
})
