import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <>
      <header className="flex-jcc-aic header">
        <figure className="header__left">
          <img src="./img/header.png" alt="/" />
        </figure>
        <section className="header__right flex-column-jcc-aifs">
          <h1 className="header__title">WhatsTask</h1>
          <p className="header__summary">
            Group Task Manager Integrated With WhatsApp
          </p>
          <p className="header__desc">
            Create, assign tasks, set due dates and receive reminders all on
            WhatsApp, never miss a deadline again with this simple and
            convenient solution for team task management. Try it now for a more
            productive team.
          </p>
          <div className="header__links flex-jcc-ais">
            <a href="/login" className="header__link link--one">
              Login
            </a>
            <a href="/register" className="header__link link--two">
              Register
            </a>
          </div>
        </section>
      </header>
      <main className="main">
        <h2 className="main__title">Features of WhatsTask</h2>
        <section className="main__features">
          <div className="main__card">
            <figure className="main__card--img">
              <img src="./img/taskIcon.svg" alt="/" />
            </figure>
            <p className="main__card--desc">
              Create and assign tasks to team members
            </p>
          </div>
          <div className="main__card">
            <figure className="main__card--img">
              <img src="./img/taskIcon.svg" alt="/" />
            </figure>
            <p className="main__card--desc">
              Create and assign tasks to team members
            </p>
          </div>
          <div className="main__card">
            <figure className="main__card--img">
              <img src="./img/taskIcon.svg" alt="/" />
            </figure>
            <p className="main__card--desc">
              Create and assign tasks to team members
            </p>
          </div>
          <div className="main__card">
            <figure className="main__card--img">
              <img src="./img/taskIcon.svg" alt="/" />
            </figure>
            <p className="main__card--desc">
              Create and assign tasks to team members
            </p>
          </div>
          <div className="main__card">
            <figure className="main__card--img">
              <img src="./img/taskIcon.svg" alt="/" />
            </figure>
            <p className="main__card--desc">
              Create and assign tasks to team members
            </p>
          </div>
          <div className="main__card">
            <figure className="main__card--img">
              <img src="./img/taskIcon.svg" alt="/" />
            </figure>
            <p className="main__card--desc">
              Create and assign tasks to team members
            </p>
          </div>
          <div className="main__card">
            <figure className="main__card--img">
              <img src="./img/taskIcon.svg" alt="/" />
            </figure>
            <p className="main__card--desc">
              Create and assign tasks to team members
            </p>
          </div>
          <div className="main__card">
            <figure className="main__card--img">
              <img src="./img/taskIcon.svg" alt="/" />
            </figure>
            <p className="main__card--desc">
              Create and assign tasks to team members
            </p>
          </div>
        </section>
        <figure className="main__image">
          <img src="./img/feature.png" alt="/" />
        </figure>
      </main>
      <section className="video">
        <h2 className="video__title">Here's how it works</h2>
        <div className="video__main">
          <video width="320" height="240" controls autoPlay>
            <source src="./videos/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video__link">
          <a href="/register" className="link--two">
            Register Now
          </a>
        </div>
      </section>

      {/* <!--
  Features:

  Task creation: Allows users to create new tasks with a title, description, and due date.

  Task assignment: Allows users to assign tasks to team members.

  Task prioritization: Allows users to set the priority level of tasks.

  Task status tracking: Allows users to track the status of tasks (e.g. incomplete, in progress, completed).

  Task reminders: Sends reminders to users via WhatsApp before the due date of the task.

  Task attachments: Allows users to add attachments (e.g. images, documents, etc.) to tasks.

  Group task management: Allows users to create and manage tasks that are assigned to a group of people.

  Task history: Allows users to view a history of tasks that have been completed.

  Task search: Allows users to search for tasks by keyword, assignee, due date, or other criteria.

  User management: Allows users to create accounts, login, and manage their profile settings.

  WhatsApp integration: Allows users to receive and send messages about tasks via WhatsApp.

  Mobile support: Allows users to access the application from their mobile devices.

  Secure: Implement secure communication between front-end and back-end, and secure storage of the data.

  FREE ICONS HERE: https://iconmonstr.com/
 --> */}
    </>
  );
}
