import React from 'react';

const Eligibile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Eligibility Criteria</h1>

      <p className="mb-4">
        The following criteria must be met for students to qualify for a refurbished laptop under the “Missing Middle” Device Distribution Initiative:
      </p>

      <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li>
          Must be currently registered for a <strong>Diploma</strong> or <strong>Advanced Diploma</strong> programme at TUT.
        </li>
        <li>
          Must be a <strong>South African citizen</strong>, in line with social investment guidelines.
        </li>
        <li>
          Should be part of the <strong>“Missing Middle”</strong> (not receiving NSFAS and not previously given digital devices).
        </li>
        <li>
          Must have an <strong>average academic performance of 60%</strong> or above.
        </li>
        <li>
          Selection will aim for <strong>equity across all campuses</strong> — no campus will be prioritized unfairly.
        </li>
        <li>
          The distribution will comply with national equity targets — with a minimum of <strong>80% allocated to African students</strong>, followed by Coloured and Indian students.
        </li>
        <li>
          Students from all fields will be considered fairly, including those in <strong>neglected non-STEM courses</strong>.
        </li>
        <li>
          <strong>First-year students</strong> (Diploma or Advanced Diploma) are strongly encouraged to apply.
        </li>
        <li>
          Eligibility must be <strong>verified by Financial Aid</strong> using student income records and existing databases.
        </li>
        <li>
          Faculties may nominate top-performing students based on these criteria.
        </li>
      </ul>

      <p className="italic text-sm text-gray-600 mt-4">
        Meeting these criteria does not guarantee a laptop — selection also depends on device availability and demand.
      </p>
    </div>
  );
};

export default Eligibile;
