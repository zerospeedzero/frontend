
'use client'
import React from 'react';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';

const VolunteerPortal = () => {
  return (
    <>
      <Header/>
      <div className='flex flex-row justify-start items-start'>
        <NavBar/>
        <div className='w-full min-h-[100vh] bg-gray-200  p-8 flex flex-col justify-start items-start'>
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
          Please click below link to see the design
          <a  className='text-p1 ' target="_blank" href="https://statics.teams.cdn.office.net/evergreen-assets/safelinks/1/atp-safelinks.html?url=https%3A%2F%2Fwww.figma.com%2Ffile%2FFIVhs5JTnQDlJRxmvPDGe5%2FP.L.A.Y%3Ftype%3Ddesign%26node-id%3D41%253A5%26mode%3Ddesign%26t%3DHidYX53qGSF2MDnD-1&locale=en-us&dest=https%3A%2F%2Fteams.microsoft.com%2Fapi%2Fmt%2Famer%2Fbeta%2Fatpsafelinks%2Fgeturlreputationsitev2%2F&pc=kYfYtEfb3xMPvQA0dHYDCgSWFSDCqgrAxoaRHHkyfy2qTI8BCAqmFRUXeUt1Gf2KnAB6StOTbOcQIVxarzKgBZONC6Ic1kJzGG4rk5kMYpHA9MIyjpPIPN5yBrCD8bH0yBDanfD1sASlFAK7kEHBgPjoHMAw2%252bvdu7X%252bVCC9E466JnEingDkEMvyN8ZL%252b1L%252b7KtQiaLrLIZat7S%252b9xwG%252fHoFQBjwMvXwzc39hKMz2IThHTQlsw8cw%252fwFHhNvlkjcEqv9ufJWovZkgmsreCCEdstPIEQtlz3U7mW3eS5kQJhHO8mbD1EMUBnf4Ui9UNlmfuma9nyL5KtcUUq6ZdIbdYZdztd%252fhqMLEDxKu4EiLJTEmc%252bi2GxtzQBmN%252fDneRssflUlQpsjnSCbTrDy5wvgwMVR5G3E%252bXmVX0NAqmhUdaT3TWByAGoiPjusIjuvfXMS6EqJtEHtGDIau%252fdMn%252f0gUlrP%252bhnVyKqMKCQJXjW1Nu8dszlXVeDpyahtYaUTfHbTvbZj9FZYA%252fowTS7QL9d97piI0mcBiRV3dPuFHr5MqGiWrxbq7VUYSWaka78a21cEsSTw%252frEGTl4jpoFhGyjLOfcTVcP39fIOcTms3Xe%252b7AR%252fhbX0MjrM1nvLvwATAsDTdYfUNDyp%252fIHkm4nhI5L%252busURk0oCbMr34KFIqPql3CgzhyslEoasyYiSzKym2zmi%252bfoIec%252fiC8Lrb%252fK47Adrd5O70Hneg4SKOKWxm76w7fpL4oQNO%252bKzzoFSXV8i8K3IvFN58eaefRvML54CF2%252b9pyFjiyKv6HOX8l33l%252fzreO%252baDIeLEj2LaffSxsz4PL6s5Bhj44Hjb1O6vSIHHsenjhwAJImTOR46qgnktO2XnbVt%252fqMRmYVfJuztJNcsUDgZNwOINNvuIzO7ZQsrrORWFuoyyzrkkPWfZc4du9ozKf18OXNPy1BRqUIVC6kztRYbshPbNaCqo%252bjE1f8NNKhGuKnf3pK%252bOsi37xE1URARujQE7fsEowzOsxBsyRYznRBlE06nrUlehw5Oww3nRN2qUU0QzUB8F3R9ttpvsIqwZowIge6f0YRNLl4at8yuIeibkhTfk7tr6S1%252b8Q4w%252foVvjHcD%252bqnVe4StcKzhfE6r%252f5XMzki0J9PTRXKIjnhQpxbrJ7x4R6p5EpUqu9cQhxpfte0TeS5DU052kWQDbBYgHsRreLjqzF1M%252fJr0thdywzDrQMPi6LPKic9VFh%252fCDvxeUAZh0%252f2KZ0kO3umvxTicPc0b%252fnLcSNW9qNhRhrNfiBhWC%252bPiNuwC6mecbBXX61UarX60zMaicwt9vsqULLcBiCtwkFIJfKyR3rG6UGnETwPGtdrgOm1eoGW6hKoo4ps%252fTqrdXHaiH%252b8YFKSXrcvw%252f%252fGEIg05LaaOXxrOznkGAgz2rXcpb9ftQOVZAwuY7LRsmQ%253d%253d%3B%20expires%3DWed%2C%2013%20Dec%202023%2001%3A25%3A25%20GMT%3B%20path%3D%2F&wau=https%3A%2F%2FCAN01.safelinks.protection.outlook.com%2FGetUrlReputation&si=1699292060513%3B1699292060513%3B19%3Ae0eb58a872e047229daa47edae92096a%40thread.v2&sd=%7BconvId%3A%2019%3Ae0eb58a872e047229daa47edae92096a%40thread.v2%2C%20messageId%3A%201699292060513%7D&ce=prod&cv=28%2F23110224705&ssid=b0b22d3a-60ad-57bc-e7d3-c3dd7c9335c6&ring=general&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyOC8yMzExMDIyNDcwNSIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ==&bg=%23f0f0f0&fg=%23242424&fg2=%239092c1"> Figma design</a>
        </div>
      </div>
        </div>
      </div>
    </>

  );
};

export default VolunteerPortal;
