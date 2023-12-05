
'use client'
import React from 'react';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';

const VolunteerPortal = () => {
  return (
    <>
      <Header/>
      <div className='flex flex-row justify-start items-center'>
        <NavBar/>
        <div className='w-full h-[100vh] bg-gray-200  p-8 flex flex-col justify-start items-start'>
        <div className="bg-gray-100 h-full p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            P.L.A.Y. Community Child Development Centre
          </h1>
          <h2 className="text-2xl font-bold mb-8">Web portal for volunteers</h2>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Team HASH:</h3>
            <ul className="list-disc pl-4">
              <li>George Cheng: Lead web development</li>
              <li>Hayden Kim: Visual identity design</li>
              <li>Laura Slobodcicov: UI/UX Design</li>
              <li>Lidia Barrera: UI/UX Design, copywriting</li>
              <li>Mingyue Li: Registration guidance design, leader, contact point</li>
            </ul>
          </div>

          {/* Section 1: Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction:</h2>
            <p>Team presentation.</p>
          </section>

          {/* Section 2: Client (Target Audience) */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Client (Target Audience):</h2>
            <p>
              Identifying and understanding the client, in this case, the PLAY
              institution. Defining the target audience, which includes parents and
              guardians of preschool-aged children.
            </p>
          </section>

          {/* Section 3: Description of the Project */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Description of the Project:</h2>
            <p>
              Outline the purpose and significance of the volunteer hour registration
              portal. Highlighting the benefits for both the institution and the
              volunteers. Emphasizing the impact on community engagement and support.
            </p>
          </section>

          {/* Section 4: Visual Identity (Incorporating Visual Guide, Instructions) */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              4. Visual Identity (Incorporating Visual Guide, Instructions):
            </h2>
            <p>
              Showcase the visual identity created by the graphic designer. Explain how
              the visual guide and instructions contribute to a cohesive and
              user-friendly design.
            </p>
          </section>

          {/* Section 5: Development of the Prototype */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              5. Development of the Prototype (Meetings and Updates, Help George’s Task,
              User-Friendly):
            </h2>
            <p>
              Discuss the development process, including meetings and updates. Highlight
              George's role as the lead programmer and how the team supported his tasks.
              Emphasize the focus on creating a user-friendly experience through UX
              design.
            </p>
          </section>

          {/* Section 6: Challenges and Expectations */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              6. Challenges and Expectations:
            </h2>
            <p>
              Address challenges faced during the project. Discuss how the team overcame
              obstacles and managed expectations. Highlight any lessons learned during
              the development process.
            </p>
          </section>

          {/* Section 7: Portal Demo */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Portal Demo:</h2>
            <p>
              Conduct a live or simulated demo of the volunteer hour registration portal.
              Walk through key features and functionalities. Encourage audience
              engagement and questions.
            </p>
          </section>
        </div>
      </div>
        </div>
      </div>
    </>

  );
};

export default VolunteerPortal;
