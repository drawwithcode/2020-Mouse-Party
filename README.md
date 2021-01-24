
<!-- <p align="center">
<img src=""
 </p> -->

# Mouse Party

**Table of Contents**

1. [The Project](#the-project)<br>1a. [Context](#context)<br>1b.[Concept](#concept)<br>1c. [Overview](#overview) <br>&ensp;▪ [Architecture](#architecture)<br>&ensp;▪ [Functioning](#functioning)<br>&ensp;▪ [Visuals](#visuals)<br>&ensp;▪ [Sounds](#sounds)

3. [Design Challenges](#design-challenges)<br>2a. [Instructions](#instructions)<br>2b.  [Contextualize](#contextualize)<br>2c.  [Input](#input)<br>2d. [Solo Mode](#solo-mode)

4. [Coding Challenges](#coding-challenges)<br>3a. [Beatmap](#beatmap)<br>3b. [Cursors](#cursors)<br>3c. [Collision](#collision)<br>3d. [User Connection](#user-connection)

5. [Tools](#tools)

6. [References](#references)

7. [Credits](#credits)

## The Project
Mouse Party is a desktop game designed to celebrate New Year's Eve together. The COVID-19 pandemic made it impossible to have a house party to celebrate 2021 together with friends, Mouse Party wants to bring people together once again, dancing and making fireworks together, although being physically distant.

### Context
2020 has been the year of this big, scary pandemic that is still not over. In 2020 we had to give up gatherings in order to stop the spreading of this horrible virus. We wanted to have a virtual place where people could gather together once again to celebrate and we wanted to stress how collaboration brings good things.

### Concept
We weren’t sure whether we would have been able to celebrate New Year’s Eve together with our friends, so we thought we could design an interactive experience online which would recall two of the symbols of New Year’s Eve. We put fireworks and dances together and we got Mouse Party, a virtual place where you can create fireworks "dancing" with friends or strangers, following the rhythm of the music.
People can play with Mouse Party alone, but the full experience is designed to be enjoyed by multiple users - simple movements can become something intricate and beautiful thanks to collaboration among players.

### Overview
The site features two rooms with a music track each and its beatmap. Each user's cursor is then mirrored around the center point of the window, so that the final result is reminiscent of New Year’s Eve fireworks. The scope is to interact with other players and execute a choreography by following the beatmap and the rhythm with the focus on collaborative results. The game can be played from any screen with a pointing device (a mouse, a trackpad, a graphic tablet).  

* #### Architecture
The website is composed of a landing page, two interactive rooms and a solo mode room. In the landing page, an icon shows how many users are dancing in each room, three buttons allow to join the different rooms, an info button shows a tutorial and credits, and a watch button allows to see what's going on in a room.
The user is greeted by a welcome message with a short tutorial, that can be recalled clicking on the info button in the upper right corner. Credits are at the end of the tutorial.
When landing on the website, the user will be able to see what's happening in the «party room» but it will be darkened by an overlay. By clicking the watch button the user will be able to see what's happening without this «screen».
In each room the user will find the game and the home button.

* #### Functioning<br>
Interaction between users is mostly real-time. Players can join in different moments, and their inputs will be mirrored around a central point. Based on the number of users in the room, the angle of different inputs will increase or decrease (360°/no. of users).  The user's cursor and instructions they have to follow will always be on the 0° angle, while the other users are shown as translated by the angle. <br>The idea is to show how collaboration brings good things. When an user is alone in the room, they can still play, but a pop-up message will suggest inviting a few friends in order to make the experience more enjoyable.

* #### Visuals
We chose a neon noir visual feel: neon colors on a blue night background, inspired by fireworks. The player’s cursor is always shown in white while the other players get randomly assigned one out of 9 colors.

* #### Sounds

We added fireworks sound effects when clicking on the beatmap and when sliding down the sliders. We chose to use royalty free electronic music that felt fun to keep a beat to.


## Design Challenges

### Instructions
In order to make the songs we chose playable, we had to create something called a "beatmap", the actual instruction for the player containing info about timings, positions, and more. We used the Osu! beatmap editor to place elements like beats and sliders at just the right time at just the right place. We exported all the timings right from the Osu! file and added positions based on our own grid, and compiled it all in a JSON for our engine to run.

We coded circles on the beats and at the beginning and the end of the sliders. These circles shrink showing the user when to click and have a hint about the speed, the rhythm. We also added a visual feedback (the circle turning blue) if the timing was correct - according to the learning by doing approach. For spinners, we had to find out a good balance between clarity of usage and a minimalistic look, so we opted for a fixed "donut" and a shrinking dashed circle that tells when to start and stop holding the click.

### Contextualize
We decided to add an illustration for context. This illustration has fixed dimensions and according to the resolution on the screen, users will see it with different levels of zoom. It's also a fun easter egg when the user zooms out of the page!

### Input
We found an alternative to the left-click input (in order to make the gameplay suitable also for trackpads).	Holding the spacebar works just like clicking, and it can be a good option for trackpad users and those who want a more fluid movement.

### Solo Mode
What would happen if only a single player was online? 	Although we wanted Mouse Party to be a collaborative experience, we also wanted to give the people a chance to see what they could achieve with many players, therefore we created a "solo" room, where users can see the result with their cursor rotated 8 times.

## Coding Challenges

### Beatmap
We decided to have a single beatmap that didn't have to be rotated or moved. In order to make it possibile, we chose to keep the user in a fixed position, while rotating the cursors of other connected players.

We then had to make the choreography look uniform across different screen sizes. At first we tried with a system of a grid and mapping methods, but we realized collision wasn't working on scaled p5.play Sprites - which we used to create the sliders - therefore we couldn't make the beatmap responsive. We managed to work around the problem by confining the game to an iframe with fixed dimensions (800x800px) and in order to make it look nicer, we added an illustration for context.

<!--```  
javascript
```-->

### Cursors
We had to find a way to avoid showing in the "Room 1" iframe the cursor of the user who just landed on the main page. We hid the cursor, making a boolean variable that turns true when the user clicks on the button to join the room, and when this variable is true, the cursor turns visible. Moreover, when the variable is false, the rotation angle is calculated without counting the user's cursor, otherwise - when the variable is true - the rotation angle keeps into consideration the user's cursor too.

### Collision
p5.collide2D did not fit our needs since it only allowed us to have collisions on basic shapes only. We needed to follow the sliders shape (often a curve), so e ended up implementing collision using the overlapPixel function of p5.play, creating png files with the background color in the collision area.

We then implemented a system to show the user when the execution of the beatmap is correct. The sliders' sprites are made up by an animation made up of two different frames: the first one is the regular slider, the second one is colored with blue and the animation is called when the input and the timing is correct.

### User Connection
We had to manage user connection at different moments without letting the song start back from the beginning. We managed to make the song start on the first user, then the following users will inherit the ability to emit time from the first user who joined the room. This way, we managed to let the song continue even when the first user logs off.

We then had to solve a small bug we encountered: the user icons were flickering and do not respond correctly to log-ins and log-outs from the users. We solved it by sending the delete cursor message a second time, just instants after the first one.

 ## Tools
* P5.js
* P5.play
* Node.js
* Socket.io
* Express.js<br><br>
* Github
* Heroku<br><br>
* Osu!
* Adobe Illustrator


 ## References
 * StackOverflow.com
 * w3schools.com

## Credits
#### Music
&ensp;Room 1 + Solo Mode Room<br>
&ensp;&ensp;"Musik liegt in der Luft" by Phillip Gross [(CC BY-NC-SA 3.0)](https://creativecommons.org/licenses/by-nc-sa/3.0/)<br>
&ensp;&ensp;[freemusicarchive.org](https://freemusicarchive.org/home)<br>
&ensp;Room 2:<br>
&ensp;&ensp;"Fireworks" by Alexander Nakarada [(CC 0 1.0)](https://creativecommons.org/publicdomain/zero/1.0/deed.it)<br>
&ensp;&ensp;[https://freepd.com](https://freepd.com/electronic.php)
<br>
#### Sound Effects
[fesliyanstudios.com,](https://fesliyanstudios.com/)<br>
[audiomicro.com,](https://audiomicro.com/)<br>
[bigsoundbank.com,](https://bigsoundbank.com/)<br>
[freemusicarchive.org](https://freemusicarchive.org/home)<br>
<br>
<br>
Coded with ♥ by ASMR 🎤🦆 // Andrea Bellavita, Nicole Moreschi, Riccardo Rigamondi, Sharon Manfredi

**Creative Coding 2020/2021** (https://drawwithcode.github.io/)<br>
Politecnico di Milano - School of Design<br>
Faculty: Michele Mauri, Tommaso Elli, Andrea Benedetti
