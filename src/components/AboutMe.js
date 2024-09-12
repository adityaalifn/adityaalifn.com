import React from 'react';
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-blue-500 to-purple-500 overflow-y-auto">
      <motion.div 
        className="max-w-4xl w-full space-y-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">About Me</h2>
        
        <div className="space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg text-justify">
            I'm a <strong>Software Engineer</strong> with over <strong>5 years of experience</strong> specializing in the design, development, and maintenance of <strong>high-performance, scalable distributed systems</strong>. My expertise spans multiple programming languages and technologies.
          </p>
          
          <p className="text-base sm:text-lg text-justify">
            Throughout my career, I've had the opportunity to <strong>lead and contribute to critical projects</strong> that have significantly impacted business performance. These include developing sophisticated <strong>routing engines</strong>, implementing effective <strong>ad systems</strong>, and creating robust <strong>global search functionality</strong>. I'm particularly adept at <strong>optimizing system performance</strong> and <strong>troubleshooting complex issues</strong> across a wide range of technologies and platforms.
          </p>
          
          <p className="text-base sm:text-lg text-justify">
            My approach to software development is rooted in a commitment to writing <strong>clean, efficient, and well-tested code</strong>, always with a focus on <strong>maintainability and scalability</strong>. I'm well-versed in <strong>agile methodologies</strong> and have experience across the <strong>full software development lifecycle</strong>.
          </p>
          
          <p className="text-base sm:text-lg text-justify">
            As a <strong>strong collaborator</strong> with excellent <strong>communication skills</strong>, I thrive in environments where I can work effectively with <strong>cross-functional teams</strong> to drive engineering initiatives and achieve organizational goals. I'm passionate about <strong>staying current with emerging technologies</strong> and applying <strong>innovative solutions</strong> to challenging problems.
          </p>

          <p className="text-base sm:text-lg">
            <strong>Programming Languages:</strong> Go, Ruby, Java, Python, JavaScript<br/>
            <strong>Frameworks & Libraries:</strong> Rails, Sidekiq, Hystrix, gRPC, ReactJS<br/>
            <strong>Databases:</strong> PostgreSQL, Elasticsearch, Redis, Prometheus<br/>
            <strong>DevOps & Cloud:</strong> Chef, Docker, Kubernetes, Kafka, GCP, AWS, Gitlab CI<br/>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
