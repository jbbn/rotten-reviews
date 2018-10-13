const { Given, When, Then } = require('cucumber')
const expect = require('expect')
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

Given('that I get the library', function () {
  const { RottenReviews } = this
})

When('I try to get the page {string} of the audience reviews of the movie {string}', function (page, movie) {
  const { RottenReviews } = this
  return RottenReviews.getAudienceReviews(movieSlugs[movie], page)
    .then(reviews => this.result = reviews[0])
})

Then('I see a JSON with a valid result', function () {
  const got = Object.keys(this.result)
  const want = Object.keys(reviewSample)
  expect(got).toEqual(want)
})

Then('I see a JSON with the error message {string}', function (error_message) {
  const got = this.result.hasOwnProperty('error_message') ? this.result.error_message : ''
  const want = error_message
  expect(got).toEqual(want)
})
