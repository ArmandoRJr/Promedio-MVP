
# Promedio

## Motivation
As university students, we are always stressed over our grades, trying to compute what mark we would need on the assignments, midterm, finals in order to get the desired outcome (whether it's passing or getting a certain GPA). 

*Promedio* is an application built around this emotion and the problems that this emotion causes (i.e. computation problems). The application strives to solve this by providing an extensive tool that takes the brains out of the computational part of figuring out what mark a student would need for a particular GPA, and even allows students to get a graphical understanding of their past semester grades to figure out any trends that may be beneficial.

## Installation
- **Back-end:** Node.js [(Installation instructions available here)](https://nodejs.org/en/download/)
- **Front-end:** React
- **Database:** MongoDB

Verify you have a working version of Node.js using:
```sh
node -v
```
Install version 18.0.0 of Node for consistency:
```
sudo npm install -g n
sudo n 18.0.0
```

Install/update yarn using:
```sh
npm install --global yarn
```
Clone the repository by running:
```sh
git clone https://github.com/UTSCCSCC01/finalprojectf22-team-promedio.git
```
Travel to the main project folder and install all the dependencies using:
```sh
cd finalprojectf22-team-promedio/
cd Promedio
yarn setup
```
Add the .env file required for the project to the `Promedio` folder (not present in this repository, out of security).
Start the development backend server and the frontend website using:
```sh
yarn dev
```
(Or alternatively, run `yarn server` in one terminal, and `yarn client` on another.)

The backend server should start under port 5000, with the website under port 3000. The MongoDB database should be showcased as working under the server initialization terminal.

## Contribution
To contribute to this project, we will follow GitFlow and implement continuous integration continuous deployment: [Inspired by C01 Tutorial Notes] 
  1) The master branch stores the release history and the develop branch is used to integrate features.
  2) Feature branches are merged into develop.
  3) Test develop thoroughly and ensure it has all the features for a release.
  4) Create a pull request and make sure at least two people review it.
  5) Merge develop branch into master.
  6) Upon issues with features we will revert the feature branch in develop.
  7) Upon issues with releases we can revert the merge commit in master.

Branch naming convention: [FEAT/feature-number]
Ticketing and user stories will be done through JIRA and will follow the Kanban board to keep track of tickets.
