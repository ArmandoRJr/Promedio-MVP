# Sprint 1 

## Sprint Goal:

- Learn any and all technologies related to the project, if necessary (HTML/CSS/JavaScript, React, MongoDB and any dependencies utilized throughout the sprint).
- Create a functionining website in which a user can sign up, log in/out, and see static pages such as the Welcome page.
- Lay down the database basics for our main organizing structure for courses (semesters) and provide a basic frontend attached to it.
- Create proper routing between current pages.
- Organize tasks for next sprint. 

---

## Meeting Dates:
- First stand-up (2022/09/27)
    - Distributed initial user stories to work on.
    - Finished basic backend/frontend/database setup.
    - Planned initial required technologies for project.

- Second stand-up (2022/09/29)
    - Cleaned up tasks in regards to user stories. 
    - Added issues to Jira. 
    - Finalized list of required technologies for project, mainly in relation to the database.
    - Updated team on current progress.

- Third stand-up (2022/10/03)
    - Attempted migration of Jira issues to proper board (inaccessible at the time).
    - Finalized most tasks in relation to user stories.
    - Updated team on current progress.

- Fourth stand-up (2022/10/05)
    - Organized emergency meeting for finishing required Sprint 1 documents.
    - Distributed documentation work amongst team members (sprint1.md, SR1.md, RPM.md, SystemDesignDocument.pdf).
    - Finished all tasks in relation to user stories.
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
| PROM-1-1 | Landing page should contain a basic introduction to the application as a whole, including purpose and functionality of the app. | Maaz Hashmi
| PROM-1-2 | Landing page should contain a navigation bar at the top of the screen, with quick access to the login page for returning users and access to the registration page for incoming first-time users. | Maaz Hashmi
| PROM-2-1 | The signup page should ask the user for their name, email, their current GPA and their password. | Preyansh Dutta, Gabriel Ethan Vainer
| PROM-2-2 | The signup page should interact with the backend, adding users to the MongoDB database. | Preyansh Dutta, Gabriel Ethan Vainer, Tegh Mehta
| PROM-3-1 | The login page should only require the email and password of the user to log them in. | Tegh Mehta
| PROM-3-2 | The login page should interact with the backend, retrieving user information as required. | Preyansh Dutta, Gabriel Ethan Vainer, Tegh Mehta
| PROM-4-1 | Users can quickly log out through some button in the webpage. | Tegh Mehta
| PROM-7-1 | Semesters should pair together courses (to be fully developed in a later sprint) so that the user can categorize them quickly. | Alejandro Iglesias Llobet, Armando Rojas
| PROM-7-1 | Some frontend feature, such as a sidebar or a list, will act as the user's main method of interacting with semesters. | Alejandro Iglesias Llobet

--- 
**Spikes Recorded:**
- Team had to use a specific version of Node.js until an error in our dependencies was found.
- Team had discrepancies between the use of Yarn vs. NPM.
- Decisions on which format to use for database (SQL w/PostgreSQL vs. NoSQL w/MongoDB) took away from development time.
- Team took time in syncronizing initial backend/frontend setup .env(iroment) requirements.
- Learning the required technologies was a lengthy process for some members.
- (Technical) issues with Jira resulted in lack of organization during the first half of the sprint.