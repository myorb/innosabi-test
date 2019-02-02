# Developer challenge - Slider

## Visitor want to see the current projects on fullscreen
We want to present our interested visitors a short overview over all running projects on our Demo platform.

### Challenge
The projects should be displayed in a carousel or slider with a nice background image, its title and description.
The visitor should be able to navigate between all project slides. 
 
### JSON Data
An example response of our latest project api can be found in `/data/project.json` and should be used for this assignment.

### Design
There are no specific design that need to be implemented. Two sample slider tiles can be found in `/img/challenge_1-slide1.jpg`
and `/img/challenge_1-slide2.jpg`.

The solution should be responsive. 

### Environments
Staging: https://staging.demo.innosabi.com/
Production: https://demo.innosabi.com/

### Media files
You'll find two image hashes in the json data. In order to get the image file you use following url:
https://demo.[staging.]innosabi.com/api/v4/media/**HASH**/thumbnail/width/**WIDTH**/height/**HEIGHT**/strategy/crop 

### Plugins
You're free to use any js/css toolkit, framework, library or plugin available! It's not necessary to write an own slider. 
We recommend the latest [Bootstrap carousel](https://getbootstrap.com/docs/4.0/components/carousel/) or
 [Slick-slider](http://kenwheeler.github.io/slick/)