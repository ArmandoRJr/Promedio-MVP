# Sprint 2 

## Sprint Goal:

- Create a Trello Board to store progress for Jira Tickets as well as offering a more intuitive way to assign tasks to participants
- Add more features to the website such as viewing and editing details, adding/editing/deleting courses, marking goals for the course, and viewing details of each course.
- Apply the database basics for our main organizing structure for courses (semesters) and ensure its usage among our new features.
- Organize tasks for next sprint. 

---

## Meeting Dates:
- First stand-up (2022/10/15)
    - Completed Trello Board.
    - Finished required documents for Sprint 1.
    - Merged features from Sprint 1 to main branch.
    - Distributed Sprint 2 tasks.

- Second stand-up (2022/10/17)
    - Started the backend api for editing and viewing user details.
    - Finished frontend tickets for sprint 2.
    - Updated team on current progress.

- Third stand-up (2022/10/19)
    - Finished the backend api for editing and viewing user details.
    - Finalized tasks in relation to user stories and fixing bugs/miscellaneous tasks
    - Continued work on semesters and courses.
    - Updated team on current progress.

---

## Participants: 

Maaz Hashmi, Tegh Mehta, Preyansh Dutta, Gabriel Ethan Vainer, Armando Rojas, Alejandro Iglesias Llobet

---

## Completed User Stories:

**The user stories we chose to work on (and completed) are the following (with the breakdown and points assigned):**

- (PROM-5) As a user I should be able to view user details such as name or email or password.
    - Make sure it is clear to see and can be accessible conviniently to the user. 
    - **Points assigned: 10 SP**

- (PROM-6) As a user, I want to be able to create, edit, & delete courses to calculate my grade. 
    -  Make sure the backend is connected to the frontend.
    - **Points assigned = 10 SP**

- (PROM-7) As a user, I want to be able to organize my courses by semester so I can see only the courses I have currently. I would be able to create, edit, & delete semesters. 
    - Have it connected to the frontend and make sure this process is convinient to the user.
    - **Points assigned = 20 SP**

- (PROM-19) As a user, I am able to edit my user details. 
    - Make sure the backend is connected to the frontend. 
    **Points assigned: 10 SP**`

## Unfinished User Stories:
- (PROM-17) Users are able set a mark goal for a course.
    - Connect with frontend and backend and make sure they can edit this detail as many times as possible
    - **Points assigned = 15 SP**
    - Reason for not finishing task was because of the realization of this being heavily dependent on another task that was not considered for this sprint (PROM-15). It will be taken care of alongside said task.

- (PROM-18) As a user I should be able to view the details of my course.
    - Users can quickly log out through some button in the webpage.
    - **Points assigned = 10 SP**
    - Reason for not finishing this is because it is largely embedded into another task (PROM-6), so adding an extra task for it was an error in judgment. It will be handled by the next sprint.
    
---

**Team Capacity = 50h**

--- 

The table below displays who worked on which task during this sprint. 

| Ticket Number    | Description     | Assigned to:    |
| ------------- | ------------- | -------- |
| PROM-5 | The ability for a user to view user details. | Preyansh Dutta, Gabriel Vainer, Maaz Hashmi, Tegh Mehta
| PROM-6 | The ability for a user to add, edit, or delete courses. | Alejandro Iglesias Llobet, Preyansh Dutta, Armando Rojas, Maaz Hashmi, Tegh Mehta
| PROM-7 | A user can organize their courses by semester as well as control which semesters they currently have  | Armando Rojas, Alejandro Iglesias Llobet
| PROM-17 | Users can set a goal for their courses  | Armando Rojas, Maaz Hashmi, Alejandro Iglesias Llobet
| PROM-18 | Users can view the details of their courses  | Tegh Mehta, Maaz Hashmi
| PROM-19 | As a user, I am able to edit my user details. | Tegh Mehta, Maaz Hashmi

--- 
**Spikes Recorded:**
- Choosing between CSS frameworks caused some blockage in our progress.
- MongoDB was giving some trouble for trying to fetch info in a current runnning session.
- Figuring out the database schemas for storing users <-> semesters <-> courses was a hard endeavour. 
