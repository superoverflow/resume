'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Globe, Download, Moon, Sun } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function CV({ data }) {
  const { profile, skills, education, experience } = data;
  const cvRef = useRef(null);
  const [isDark, setIsDark] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const downloadPDF = async () => {
    if (!cvRef.current || isGenerating) return;
    setIsGenerating(true);
    
    try {
      const wrapper = cvRef.current;
      
      // 1. Save scroll position and scroll to top
      const originalScrollY = window.scrollY;
      window.scrollTo(0, 0);

      // 2. Temporarily remove dark mode from the document
      const wasDark = document.documentElement.classList.contains('dark');
      if (wasDark) {
        document.documentElement.classList.remove('dark');
      }
      
      // 3. Force desktop layout for PDF
      wrapper.classList.add('pdf-export-mode');
      
      // 4. Wait for browser to repaint (so the light mode fully applies)
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // 5. Capture canvas
      const canvas = await html2canvas(wrapper, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794 // Force A4 width evaluation
      });
      
      // 6. Restore screen layout immediately
      wrapper.classList.remove('pdf-export-mode');
      if (wasDark) {
        document.documentElement.classList.add('dark'); // Restore dark mode
      }
      window.scrollTo(0, originalScrollY);
      
      // 7. Compress to JPEG and export
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save('Cyrus_Tang_CV.pdf');
    } catch (error) {
      console.error('Error generating PDF', error);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <>
      <div className="controls">
        <button onClick={toggleTheme} className="btn" aria-label="Toggle theme">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          {isDark ? 'Light' : 'Dark'}
        </button>
        <button onClick={downloadPDF} className="btn" disabled={isGenerating}>
          <Download size={16} />
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      <div className="page-wrapper" ref={cvRef}>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="section section-header">
            <h1 className="name">{profile.name}</h1>
            <div className="title">{profile.title}</div>
            <div className="subtitle" style={{ marginBottom: 0 }}>{profile.subtitle}</div>
          </div>

          <div className="section section-contact">
            <ul className="contact-list">
              <li className="contact-item">
                <Mail className="contact-icon" /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li className="contact-item">
                <Phone className="contact-icon" /> <a href={`tel:${profile.phone.replace('(0)', '').replace(/[^0-9+]/g, '')}`}>{profile.phone}</a>
              </li>
              <li className="contact-item">
                <Linkedin className="contact-icon" /> <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">{profile.linkedin}</a>
              </li>
              <li className="contact-item">
                <Globe className="contact-icon" /> <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer">{profile.website}</a>
              </li>
            </ul>
          </div>

          <div className="section section-skills">
            <h2 className="section-title">SKILLS</h2>
            <ul className="skills-list">
              {skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>

          <div className="section section-education">
            <h2 className="section-title">EDUCATION</h2>
            
            <div className="edu-uni">
              Hong Kong University<br/>of Science and Technology
            </div>
            
            <div className="edu-date">{education.period}</div>
            
            {education.degrees.map((degree, i) => (
              <div key={i} className="edu-degree">{degree}</div>
            ))}
            
            <div className="edu-awards">Awards: {education.awards}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="section section-profile">
            <h2 className="section-title">PROFILE</h2>
            <div className="summary-text">{profile.summary}</div>
          </div>

          <div className="section section-experience">
            <h2 className="section-title">EXPERIENCE</h2>
            {experience.map((companyGroup, idx) => (
              <div key={idx} className="job-group">
                <div className="job-logo-col">
                  <div className="job-logo" style={{ backgroundColor: companyGroup.logoBg }}>
                    {companyGroup.logoInitial}
                  </div>
                </div>

                <div className="job-details-col">
                  <div className="company-name">{companyGroup.company}</div>

                  {companyGroup.roles.map((role, rIdx) => (
                    <div key={rIdx} className="role-entry">
                      <div className="role-header">
                        <span className="role-title">{role.title}</span>
                        <span className="role-separator">|</span>
                        <span className="role-period">{role.period}</span>
                      </div>

                      {role.bullets && role.bullets.length > 0 && (
                        <ul className="bullets">
                          {role.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
