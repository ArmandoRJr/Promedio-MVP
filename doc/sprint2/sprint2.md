# Sprint 1 

## Sprint Goal:

- Create a Trello Board to store progress for Jira Tickets as well as offering a more intuitive way to assign tasks to participants
- Add more features to the website such as viewing and editing details, adding/editing/deleting courses, marking goals for the course, and viewing details of each course.
- Apply the database basics for our main organizing structure for courses (semesters) and ensure its usage among our new features.
- Organize tasks for next sprint. 

---

## Meeting Dates:
- First stand-up (2022/10/15)
    - Completed Trello Board
    - Finished required documents for Sprint 1
    - Merged features from Sprint 1 to main branch
    - Distributed Sprint 2 tasks

- Second stand-up (2022/10/17)
    - Started the backend api for editing and viewing user details
    - Finished frontend tickets for sprint 2 
    - Updated team on current progress.

- Third stand-up (2022/10/03)
    - Finished the backend api for editing and viewing user details
    - Finalized tasks in relation to user stories and fixing bugs/miscellaneous tasks
    - Updated team on current progress.

---

## Participants: 

Maaz Hashmi, Tegh Mehta, Preyansh Dutta, Gabriel Ethan Vainer, Armando Rojas, Alejandro Iglesias Llobet

---

## Completed User Stories:

**The user stories we chose to work on (and completed) are the following (with the breakdown and points assigned):**

- (PROM-1) As a user, I should have a landing page where I am welcomed and able to select Login or Signup.
    - Landing page should contain a basic introduction to the application as a whole, including purpose and functionality of the app.
    - Landing page should contain a navigation bar at the top of the screen, with quick access to the login page for returning users and access to the registration page for incoming first-time users.
    - **Points assigned: 5SP**

-  (PROM-2) As a user, I want to be able to signup for an account to save my data. 
    - The signup page should ask the user for their name, email, their current GPA and their password.
    - The signup page should interact with the backend, adding users to the MongoDB database.
    **Points assigned: 10SP**`

-  (PROM-3) As a user, I want to be able to login to my account to access my data. 
    - The login page should only require the email and password of the user to log them in. 
    - The login page should interact with the backend, retrieving user information as required.
    - **Points assigned = 5SP**

- (PROM-4) As a user I should be able to log out of my account if needed.
    - Users can quickly log out through some button in the webpage.
    - **Points assigned = 2SP**

- (PROM-7) As a user, I want to be able to organize my courses by semester so I can see only the courses I have currently. I would be able to create, edit, & delete semesters. 
    - Semesters should pair together courses (to be fully developed in a later sprint) so that the user can categorize them quickly.
    - Some frontend feature, such as a sidebar or a list, will act as the user's main method of interacting with semesters. 
    - **Points assigned = 10SP**
    
---

**Team Capacity = 50h**

--- 

The table below displays who worked on which task during this sprint. 

| Ticket Number    | Description     | Assigned to:    |
| ------------- | ------------- | -------- |
| PROM-28 (PROM-1-1) | Landing page should contain a basic introduction to the application as a whole, including purpose and functionality of the app. | Tegh Mehta, Maaz Hashmi
| PROM-29 (PROM-1-2) | Landing page should contain a navigation bar at the top of the screen, with quick access to the login page for returning users and access to the registration page for incoming first-time users. | Maaz Hashmi
| PROM-30 (PROM-2-1) | The signup page should ask the user for their name, email, their current GPA and their password. | Preyansh Dutta, Gabriel Ethan Vainer
| PROM-31 (PROM-2-2) | The signup page should interact with the backend, adding users to the MongoDB database. | Preyansh Dutta, Gabriel Ethan Vainer, Tegh Mehta
| PROM-32 (-PROM-3-1) | The login page should only require the email and password of the user to log them in. | Tegh Mehta
| PROM-33 (PROM-3-2) | The login page should interact with the backend, retrieving user information as required. | Preyansh Dutta, Gabriel Ethan Vainer, Tegh Mehta
| PROM-34 (PROM-4-1) | Users can quickly log out through some button in the webpage. | Tegh Mehta
| PROM-35 (PROM-7-1) | Semesters should pair together courses (to be fully developed in a later sprint) so that the user can categorize them quickly. | Alejandro Iglesias Llobet, Armando Rojas
| PROM-36 (PROM-7-2) | Some frontend feature, such as a sidebar or a list, will act as the user's main method of interacting with semesters. | Alejandro Iglesias Llobet

--- 
**Spikes Recorded:**
- Choosing between CSS frameworks caused some blockage in our progress
- MongoDB was giving some trouble for trying to fetch info in a current runnning session