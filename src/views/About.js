import React from 'react'
import cv from '../assets/CV_Sean Zhou_Software engineer.pdf'
import TopEurope from '../assets/TopEurope.jpeg'
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>About the website</h2>
      <p className={styles.paragraph}>
      The purpose of this site is to provide a platform for developers to share their full-stack development experience. Anyone can share their development experience with web development and no technology is limited. Be nice and have fun!
If you like the website, please go to GitHub to star the project, which would be very helpful for me to find a job.
        Check the source code of this website here <a href="https://github.com/xiaoShuZhou/StudyHubFrontend" target="_blank" rel="noopener noreferrer">Frontend</a>.
        <a href="https://github.com/xiaoShuZhou/StudyHubBackend" target="_blank" rel="noopener noreferrer">Backend</a>.
      </p>
      <h2 className={styles.title}>About Me</h2>
      <a href={cv} target="_blank" rel="noopener noreferrer">
        <button type="button" className={styles.button}>Check my CV</button>
      </a>
      <div className={styles.aboutMeContainer}>
        <p className={styles.paragraph}>
        I&apos;m currently pursuing my Master&apos;s degree in Computer Science at the University of Helsinki, and I have a keen interest in full-stack web development and mixed reality (MR) software development. For frontend development, I am good at React. For backend development, I&apos;m good at Node.js, Python (Django), and Java (Spring Boot). I&apos;m actively seeking opportunities in relevant fields, so if you&apos;re in need of a developer, don&apos;t hesitate to get in touch!
        </p>
        <div className={styles.imageContainer}>
          <img src={TopEurope} alt="On the top of Europe" />
          <p className={styles.center}>On the top of Europe</p>
        </div>
      </div>

    </div>
  )
}
export default About
