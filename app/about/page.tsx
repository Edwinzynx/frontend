'use client';

import React from 'react';
import Link from 'next/link';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundGlow}></div>
      
      <div className={styles.contentWrapper}>
        
        {/* Navigation */}
        <nav className={styles.navBar}>
          <Link href="/" className={styles.backLink}>
            <span>←</span> Back to Login
          </Link>
        </nav>

        {/* Hero Section */}
        <header className={styles.hero}>
          <h1 className={styles.title}>SmartPresence</h1>
          <p className={styles.subtitle}>
            A state-of-the-art attendance management system powered by Computer Vision, 
            designed to automate classroom attendance with a premium &quot;Dark Azure&quot; experience.
          </p>
        </header>

        {/* Features Section */}
        <section className={styles.section} style={{ animationDelay: '0.1s' }}>
          <h2 className={styles.sectionTitle}>
            <span>✨</span> Key Features
          </h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📸</div>
              <h3 className={styles.featureTitle}>Automated Attendance</h3>
              <p className={styles.featureDesc}>
                Mark attendance seamlessly by uploading a classroom photo. Our advanced CV model detects and recognizes students instantly.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔐</div>
              <h3 className={styles.featureTitle}>Face ID Registration</h3>
              <p className={styles.featureDesc}>
                Students can securely register their face data via selfies, generating robust embeddings stored in our cross-platform database.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3 className={styles.featureTitle}>Interactive Dashboards</h3>
              <p className={styles.featureDesc}>
                Dedicated views for Faculty to manage classes and reports, and for Students to track personal attendance and performance metrics.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎨</div>
              <h3 className={styles.featureTitle}>Premium UI/UX</h3>
              <p className={styles.featureDesc}>
                Built with a sleek, responsive &quot;Dark Azure&quot; theme featuring smooth animations, glassmorphism, and intuitive navigation.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className={styles.section} style={{ animationDelay: '0.2s' }}>
          <h2 className={styles.sectionTitle}>
            <span>🛠️</span> Technology Stack
          </h2>
          <p className={styles.setupText}>
            SmartPresence leverages a modern, decoupled architecture ensuring high performance, scalability, and maintainability.
          </p>
          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <span className={styles.techIcon}>⚛️</span>
              <span className={styles.techName}>Next.js 16 (App Router)</span>
            </div>
            <div className={styles.techItem}>
              <span className={styles.techIcon}>🎨</span>
              <span className={styles.techName}>Vanilla CSS Variables</span>
            </div>
            <div className={styles.techItem}>
              <span className={styles.techIcon}>🛡️</span>
              <span className={styles.techName}>NextAuth.js</span>
            </div>
            <div className={styles.techItem}>
              <span className={styles.techIcon}>🗄️</span>
              <span className={styles.techName}>Prisma ORM</span>
            </div>
            <div className={styles.techItem}>
              <span className={styles.techIcon}>🐍</span>
              <span className={styles.techName}>FastAPI (Python)</span>
            </div>
            <div className={styles.techItem}>
              <span className={styles.techIcon}>👁️</span>
              <span className={styles.techName}>OpenCV &amp; YuNet</span>
            </div>
            <div className={styles.techItem}>
              <span className={styles.techIcon}>🐘</span>
              <span className={styles.techName}>PostgreSQL (Neon.tech)</span>
            </div>
            <div className={styles.techItem}>
              <span className={styles.techIcon}>🐳</span>
              <span className={styles.techName}>Docker</span>
            </div>
          </div>
        </section>

        {/* Setup & Configuration Section */}
        <section className={styles.section} style={{ animationDelay: '0.3s' }}>
          <h2 className={styles.sectionTitle}>
            <span>⚙️</span> Setup &amp; Configuration
          </h2>
          <p className={styles.setupText}>
            Deploying SmartPresence requires configuring specific environment variables for both the frontend and backend services.
          </p>
          
          <div className={styles.codeBlock}>
            <span className={styles.codeComment}># Backend (.env)</span><br/>
            <span className={styles.codeVar}>DATABASE_URL</span>=<span className={styles.codeVal}>&quot;postgresql://user:pass@ep-restless-bird-1234.neon.tech/neondb&quot;</span><br/>
            <br/>
            <span className={styles.codeComment}># Frontend (.env)</span><br/>
            <span className={styles.codeVar}>DATABASE_URL</span>=<span className={styles.codeVal}>&quot;postgresql://user:pass@ep-restless-bird-1234.neon.tech/neondb&quot;</span><br/>
            <span className={styles.codeVar}>NEXTAUTH_SECRET</span>=<span className={styles.codeVal}>&quot;your-super-secret-string-here&quot;</span><br/>
            <span className={styles.codeVar}>NEXT_PUBLIC_CV_BACKEND_URL</span>=<span className={styles.codeVal}>&quot;https://smartpresence-cv.onrender.com&quot;</span><br/>
          </div>
        </section>
        
        {/* Deployment Section */}
        <section className={styles.section} style={{ animationDelay: '0.4s', marginBottom: '4rem' }}>
          <h2 className={styles.sectionTitle}>
            <span>🚀</span> Deployment Architecture
          </h2>
          <p className={styles.setupText}>
            The system is designed for cloud-native deployment. The Next.js frontend is deployed edge-first on <strong>Vercel</strong> for optimal latency. 
            The computationally intensive Computer Vision backend runs in a containerized environment on <strong>Render</strong>. 
            All relational and embedding data is securely persisted in a serverless <strong>Neon.tech</strong> PostgreSQL database.
          </p>
        </section>

      </div>
    </div>
  );
}
