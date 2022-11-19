# Sprint 4

## Sprint Goal:

- Work on left-over development/user stories from Sprint 3.
- Add better views for calculations, summaries for courses by semester or subset of courses.
- Add metrics such as completion rate.
- Add functionality to add/edit and delete grades for particular courses.

---

## Meeting Dates:

- First stand-up (2022/11/07)
  - Decided on tasks to handle for sprint 4.
  - Prepared for last sprint's demo.

- Second stand-up (2022/11/10)
  - Finished grade input and calculations for any specific course.
  - Added frontend basis for remaining user stories in sprint.
  - Updated team on current progress. 

- Third stand-up (2022/11/14)
  - Finished calculations for any given subset of courses.
  - Finished all user stories for the project.
  - Started preparing documentation.
  - Updated team on current progress.

- Fourth stand-up (2022/11/17)
  - Organized GitHub repo and Trello board.
  - Updaed team on current progress for documentation.

---

## Participants:

Maaz Hashmi, Tegh Mehta, Preyansh Dutta, Gabriel Ethan Vainer, Armando Rojas, Alejandro Iglesias Llobet

---

## Completed User Stories:

**The user stories we chose to work on (and completed) are the following (with the breakdown and points assigned):**

- (PROM-15) As a user, I should be able to view the cumulative GPA for all courses, and also seasonal GPA for a specific semester.
  - Backend should run calculations for cGPA of all courses, and sGPA for any given semester.
  - Frontend should automatically display GPA for the above.
  - **Points assigned: 12 SP**

- (PROM-16) As a user, I should be able to view GPA for any subset of courses of my choosing.
  - Backend should run calculations for cGPA of any given subset of courses.
  - Frontend should automatically display GPA for the above.
  - **Points assigned = 10 SP**

- (PROM-14) As a user, I should be able to view my current average grade for a specific course.
  - Backend should run calculations for GPA of any specifc course, and return it with the rest of the course's info.
  - Frontend should automatically display GPA for the course inside of the course's route.
  - **Points assigned = 15 SP**

- (PROM-11) - As a user, I am able to view how much of a course I have completed.
  - Backend should take into account all the categories with inputs in completed Worth-Grade pairs, and return the sum of those as the completion of the course.
  - Frontend should display this in the page for the given course.
  - **Points assigned = 10 SP**

- (PROM-9) - As a user, I want to be able to add/edit/delete grades for a course.
  - Backend should handle the delivery, editing and deletion of categories: a category will have a title, the no. of entries for it, and a list of percentages in relation to the worth and grade for each entry.
  - Frontend should display this nicely using AG Grid to the user.
  - **Points assigned = 20 SP**

**Team Capacity = 67h**

---

The table below displays who worked on which task during this sprint.

| Ticket Number    | Description     | Assigned to:    |
| ------------- | ------------- | -------- |
| PROM-15 | As a user, I should be able to view the cumulative GPA for all courses, and also seasonal GPA for a specific semester. | Tegh Mehta, Gabriel Vainer |
| PROM-16 | As a user, I should be able to view GPA for any subset of courses of my choosing. | Tegh Mehta |
| PROM-14 | As a user, I should be able to view my current average grade for a specific course. | Armando Rojas |
| PROM-11 | As a user, I am able to view how much of a course I have completed. | Armando Rojas, Alejandro Iglesias Llobet, Preyansh Dutta |
| PROM-9 | As a user, I want to be able to add/edit/delete grades for a course. | Armando Rojas, Maaz Hashmi, Alejandro Iglesias Llobet, Tegh Mehta |

---

**Spikes Recorded:**

- Clearing up issues with tasks from the previous sprint complicated completion of the tasks in this sprint.
