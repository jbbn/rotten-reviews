Feature: Get Rotten Tomatoes reviews of a movie
  In order to get the information more *machine friendly*
  As a User
  I should be able to scrape audience reviews from Rotten Tomatoes

  Scenario: Scrapping the audience reviews of an existing movie
    Given that I get the library
    When I try to get the page "1" of the audience reviews of the movie "Shutter Island"
    Then I see a JSON with a valid result

  Scenario: Trying to scrape the audience reviews of a non existent movie
    Given that I get the library
    When I try to get the page "1" of the audience reviews of the movie "Non Existent Movie Title ----"
    Then I see a JSON with the error message "Movie not found."
