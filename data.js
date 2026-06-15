// const msbteData = {
//   branches: [
//     {
//       id: "computer",
//       code: "CO",
//       name: "Computer Engineering",
//       icon: "code",
//       color: "var(--brand-computer)",
//       description: "Learn software development, database systems, networking, web tech, and operating systems.",
//       semesters: {
//         1: [
//           { code: "311303", name: "COMMUNICATION SKILLS (ENGLISH)", practicals: 12 },
//           { code: "311305", name: "BASIC SCIENCE (PHYSICS)", practicals: 12 },
//           { code: "311303", name: "BASIC SCIENCE (CHEMISTRY)", practicals: 12 }
//         ],
//         2: [
//           { code: "312301", name: "Applied Mathematics", practicals: 12 },
//           { code: "312302", name: "Programming in C", practicals: 12 },
//           { code: "312303", name: "Elements of Electrical Engg", practicals: 12 }
//         ],
//         3: [
//           { code: "313301", name: "Object Oriented Programming (C++)", practicals: 12 },
//           { code: "313302", name: "Data Structures using 'C'", practicals: 12 },
//           { code: "313303", name: "Database Management System", practicals: 12 },
//           { code: "313304", name: "Computer Graphics", practicals: 12 }
//         ],
//         4: [
//           { code: "314301", name: "Java Programming", practicals: 12 },
//           { code: "314302", name: "Software Engineering", practicals: 12 },
//           { code: "314303", name: "Microprocessors", practicals: 12 },
//           { code: "314304", name: "Data Communication & Computer Network", practicals: 12 }
//         ],
//         5: [
//           { code: "315301", name: "Operating Systems", practicals: 12 },
//           { code: "315302", name: "Client Side Scripting (JS)", practicals: 12 },
//           { code: "315303", name: "Advanced Java Programming", practicals: 12 },
//           { code: "315304", name: "Software Testing", practicals: 12 }
//         ],
//         6: [
//           { code: "316301", name: "Mobile Application Development", practicals: 12 },
//           { code: "316302", name: "Emerging Trends in CO", practicals: 12 },
//           { code: "316303", name: "Network & Information Security", practicals: 12 },
//           { code: "316304", name: "Management", practicals: 12 }
//         ]
//       }
//     },
//     {
//       id: "it",
//       code: "IF",
//       name: "Information Technology",
//       icon: "dns",
//       color: "var(--brand-it)",
//       description: "Focuses on internet tech, software systems, scripting, databases, and network administration.",
//       semesters: {
//         1: [
//           { code: "311305", name: "COMMUNICATION SKILLS (ENGLISH)", practicals: 12 },
//           { code: "311305", name: "BASIC SCIENCE (PHYSICS)", practicals: 12 },
//           { code: "311304", name: "Web Page Designing", practicals: 12 }
//         ],
//         2: [
//           { code: "312301", name: "Applied Mathematics", practicals: 12 },
//           { code: "312302", name: "Programming in C", practicals: 12 },
//           { code: "312304", name: "Digital Techniques", practicals: 12 }
//         ],
//         3: [
//           { code: "313301", name: "Object Oriented Programming (C++)", practicals: 12 },
//           { code: "313302", name: "Data Structures using 'C'", practicals: 12 },
//           { code: "313305", name: "DBMS and Administration", practicals: 12 },
//           { code: "313306", name: "Principles of Communication", practicals: 12 }
//         ],
//         4: [
//           { code: "314301", name: "Java Programming", practicals: 12 },
//           { code: "314302", name: "Software Engineering", practicals: 12 },
//           { code: "314304", name: "Data Communication & Computer Network", practicals: 12 },
//           { code: "314305", name: "GUI Application Development", practicals: 12 }
//         ],
//         5: [
//           { code: "315301", name: "Operating Systems", practicals: 12 },
//           { code: "315302", name: "Client Side Scripting (JS)", practicals: 12 },
//           { code: "315303", name: "Advanced Java Programming", practicals: 12 },
//           { code: "315305", name: "Wireless & Mobile Networks", practicals: 12 }
//         ],
//         6: [
//           { code: "316301", name: "Mobile Application Development", practicals: 12 },
//           { code: "316302", name: "Emerging Trends in IT", practicals: 12 },
//           { code: "316305", name: "Cryptography & Network Security", practicals: 12 },
//           { code: "316304", name: "Management", practicals: 12 }
//         ]
//       }
//     },
//     {
//       id: "civil",
//       code: "CE",
//       name: "Civil Engineering",
//       icon: "foundation",
//       color: "var(--brand-civil)",
//       description: "Understand surveying, concrete technology, highway engineering, and structural analysis.",
//       semesters: {
//         1: [
//           { code: "311305", name: "COMMUNICATION SKILLS (ENGLISH)", practicals: 12 },
//           { code: "311305", name: "BASIC SCIENCE (PHYSICS)", practicals: 12 },
//           { code: "311304", name: "Engineering Graphics", practicals: 12 }
//         ],
//         2: [
//           { code: "312301", name: "Applied Mathematics", practicals: 12 },
//           { code: "312302", name: "Applied Mechanics", practicals: 12 },
//           { code: "312303", name: "Construction Materials", practicals: 12 }
//         ],
//         3: [
//           { code: "313301", name: "Advanced Surveying", practicals: 12 },
//           { code: "313302", name: "Highway Engineering", practicals: 12 },
//           { code: "313303", name: "Mechanics of Structures", practicals: 12 },
//           { code: "313304", name: "Building Construction", practicals: 12 }
//         ],
//         4: [
//           { code: "314301", name: "Theory of Structures", practicals: 12 },
//           { code: "314302", name: "Geotechnical Engineering", practicals: 12 },
//           { code: "314303", name: "Hydraulics", practicals: 12 },
//           { code: "314304", name: "Computer Aided Drawing", practicals: 12 }
//         ],
//         5: [
//           { code: "315301", name: "Estimating and Costing", practicals: 12 },
//           { code: "315302", name: "Public Health Engineering", practicals: 12 },
//           { code: "315303", name: "Concrete Technology", practicals: 12 },
//           { code: "315304", name: "Design of Steel Structures", practicals: 12 }
//         ],
//         6: [
//           { code: "316301", name: "Design of RCC Structures", practicals: 12 },
//           { code: "316302", name: "Contracts and Accounts", practicals: 12 },
//           { code: "316303", name: "Construction Management", practicals: 12 },
//           { code: "316304", name: "Management", practicals: 12 }
//         ]
//       }
//     },
//     {
//       id: "mechanical",
//       code: "ME",
//       name: "Mechanical Engineering",
//       icon: "settings",
//       color: "var(--brand-mechanical)",
//       description: "Learn fluid mechanics, machine design, thermodynamics, automobile engineering, and manufacturing.",
//       semesters: {
//         1: [
//           { code: "311305", name: "COMMUNICATION SKILLS (ENGLISH)", practicals: 12 },
//           { code: "311305", name: "BASIC SCIENCE (PHYSICS)", practicals: 12 },
//           { code: "311304", name: "Engineering Graphics", practicals: 12 }
//         ],
//         2: [
//           { code: "312301", name: "Applied Mathematics", practicals: 12 },
//           { code: "312302", name: "Applied Mechanics", practicals: 12 },
//           { code: "312303", name: "Mechanical Engg Workshop", practicals: 12 }
//         ],
//         3: [
//           { code: "313301", name: "Strength of Materials", practicals: 12 },
//           { code: "313302", name: "Basic Mechanical Engg", practicals: 12 },
//           { code: "313303", name: "Thermal Engineering", practicals: 12 },
//           { code: "313304", name: "Mechanical Engg Measurements", practicals: 12 }
//         ],
//         4: [
//           { code: "314301", name: "Theory of Machines", practicals: 12 },
//           { code: "314302", name: "Fluid Mechanics & Machinery", practicals: 12 },
//           { code: "314303", name: "Manufacturing Processes", practicals: 12 },
//           { code: "314304", name: "Manufacturing Engineering Materials", practicals: 12 }
//         ],
//         5: [
//           { code: "315301", name: "Advanced Manufacturing Processes", practicals: 12 },
//           { code: "315302", name: "Power Engineering", practicals: 12 },
//           { code: "315303", name: "Elements of Machine Design", practicals: 12 },
//           { code: "315304", name: "Mechatronics", practicals: 12 }
//         ],
//         6: [
//           { code: "316301", name: "Industrial Engineering", practicals: 12 },
//           { code: "316302", name: "Automobile Engineering", practicals: 12 },
//           { code: "316303", name: "Refrigeration & Air Conditioning", practicals: 12 },
//           { code: "316304", name: "Management", practicals: 12 }
//         ]
//       }
//     },
//     {
//       id: "electrical",
//       code: "EE",
//       name: "Electrical Engineering",
//       icon: "bolt",
//       color: "var(--brand-electrical)",
//       description: "Learn power generation, electric circuits, transmission systems, electrical machines, and microcontrollers.",
//       semesters: {
//         1: [
//           { code: "311305", name: "COMMUNICATION SKILLS (ENGLISH)", practicals: 12 },
//           { code: "311305", name: "BASIC SCIENCE (PHYSICS)", practicals: 12 },
//           { code: "311305", name: "BASIC SCIENCE (CHEMISTRY)", practicals: 12 }
//         ],
//         2: [
//           { code: "312301", name: "Applied Mathematics", practicals: 12 },
//           { code: "312303", name: "Elements of Electrical Engg", practicals: 12 },
//           { code: "312304", name: "Fundamentals of Power Electronics", practicals: 12 }
//         ],
//         3: [
//           { code: "313301", name: "Electrical Circuits & Networks", practicals: 12 },
//           { code: "313302", name: "Electrical & Electronic Measurements", practicals: 12 },
//           { code: "313303", name: "Electrical Machines - I", practicals: 12 },
//           { code: "313304", name: "Electrical Power Generation", practicals: 12 }
//         ],
//         4: [
//           { code: "314301", name: "Electrical Machines - II", practicals: 12 },
//           { code: "314302", name: "Transmission & Distribution of Elec Power", practicals: 12 },
//           { code: "314303", name: "Applied Power Electronics", practicals: 12 },
//           { code: "314304", name: "Digital Electronics & Microcontroller Applications", practicals: 12 }
//         ],
//         5: [
//           { code: "315301", name: "Switchgear & Protection", practicals: 12 },
//           { code: "315302", name: "Energy Conservation & Audit", practicals: 12 },
//           { code: "315303", name: "Industrial AC Machines", practicals: 12 },
//           { code: "315304", name: "Utilization of Electrical Energy", practicals: 12 }
//         ],
//         6: [
//           { code: "316301", name: "Installation, Commissioning & Maintenance", practicals: 12 },
//           { code: "316302", name: "Electrical Drawing & CAD", practicals: 12 },
//           { code: "316303", name: "Emerging Trends in Electrical Engg", practicals: 12 },
//           { code: "316304", name: "Management", practicals: 12 }
//         ]
//       }
//     },
//     {
//       id: "etc",
//       code: "EJ",
//       name: "Electronics & Telecommunication",
//       icon: "router",
//       color: "var(--brand-etc)",
//       description: "Focuses on analog/digital circuits, microcontroller applications, signal systems, and telecommunication networks.",
//       semesters: {
//         1: [
//           { code: "311305", name: "COMMUNICATION SKILLS (ENGLISH)", practicals: 12 },
//           { code: "311305", name: "BASIC SCIENCE (PHYSICS)", practicals: 12 },
//           { code: "311305", name: "BASIC SCIENCE (CHEMISTRY)", practicals: 12 }
//         ],
//         2: [
//           { code: "312301", name: "Applied Mathematics", practicals: 12 },
//           { code: "312302", name: "Electronic Devices & Circuits", practicals: 12 },
//           { code: "312303", name: "Digital Techniques", practicals: 12 }
//         ],
//         3: [
//           { code: "313301", name: "Applied Electronics", practicals: 12 },
//           { code: "313302", name: "Electric Circuits & Networks", practicals: 12 },
//           { code: "313303", name: "Electronics Measurements & Instrumentation", practicals: 12 },
//           { code: "313304", name: "Principles of Electronic Communication", practicals: 12 }
//         ],
//         4: [
//           { code: "314301", name: "Linear Integrated Circuits", practicals: 12 },
//           { code: "314302", name: "Microcontroller & Applications", practicals: 12 },
//           { code: "314303", name: "Basic Feedback Control System", practicals: 12 },
//           { code: "314304", name: "Analog & Digital Communication", practicals: 12 }
//         ],
//         5: [
//           { code: "315301", name: "Microwave & Radar Engineering", practicals: 12 },
//           { code: "315302", name: "Computer Networks & Security", practicals: 12 },
//           { code: "315303", name: "Embedded Systems", practicals: 12 },
//           { code: "315304", name: "Mobile Communication", practicals: 12 }
//         ],
//         6: [
//           { code: "316301", name: "Computer Communication Networks", practicals: 12 },
//           { code: "316302", name: "Optical Fiber Communication", practicals: 12 },
//           { code: "316303", name: "Emerging Trends in Electronics", practicals: 12 },
//           { code: "316304", name: "Management", practicals: 12 }
//         ]
//       }
//     }
//   ],

const msbteData = {
  branches: [
    {
      id: "computer",
      code: "CO",
      name: "Computer Engineering",
      icon: "code",
      color: "var(--brand-computer)",
      description: "Learn software development, database systems, networking, web tech, and operating systems.",
      semesters: {
        1: [
          { code: "311301", name: "Fundamentals of ICT", practicals: 14 },
          { code: "311302", name: "Engineering Workshop Practice", practicals: 12 },
          { code: "311303", name: "Communication Skills (English)", practicals: 12 },
          { code: "311305", name: "Basic Science (Physics & Chemistry)", practicals: 16 }
        ],
        2: [
          { code: "312301", name: "Applied Science (Physics & Chemistry)", practicals: 16 },
          { code: "312302", name: "Programming in C", practicals: 14 },
          { code: "312303", name: "Elements of Electrical Engg", practicals: 12 },
          { code: "312304", name: "Web Page Designing", practicals: 14 }
        ],
        3: [
          { code: "313301", name: "Object Oriented Programming (C++)", practicals: 14 },
          { code: "313302", name: "Data Structures using 'C'", practicals: 14 },
          { code: "313303", name: "Database Management System", practicals: 12 },
          { code: "313304", name: "Computer Graphics", practicals: 12 }
        ],
        4: [
          { code: "314301", name: "Java Programming", practicals: 16 },
          { code: "314302", name: "Software Engineering", practicals: 12 },
          { code: "314303", name: "Microprocessors", practicals: 12 },
          { code: "314304", name: "Data Communication & Computer Network", practicals: 12 }
        ],
        5: [
          { code: "315301", name: "Operating Systems", practicals: 12 },
          { code: "315302", name: "Client Side Scripting (JS)", practicals: 14 },
          { code: "315303", name: "Advanced Java Programming", practicals: 14 },
          { code: "315304", name: "Software Testing", practicals: 12 }
        ],
        6: [
          { code: "316301", name: "Mobile Application Development", practicals: 14 },
          { code: "316302", name: "Emerging Trends in CO", practicals: 12 },
          { code: "316303", name: "Network & Information Security", practicals: 12 }
        ]
      }
    },
    {
      id: "it",
      code: "IF",
      name: "Information Technology",
      icon: "dns",
      color: "var(--brand-it)",
      description: "Focuses on internet tech, software systems, scripting, databases, and network administration.",
      semesters: {
        1: [
          { code: "311301", name: "Fundamentals of ICT", practicals: 14 },
          { code: "311303", name: "Communication Skills (English)", practicals: 12 },
          { code: "311305", name: "Basic Science (Physics & Chemistry)", practicals: 16 },
          { code: "311304", name: "Engineering Workshop Practice", practicals: 12 }
        ],
        2: [
          { code: "312301", name: "Applied Science (Physics & Chemistry)", practicals: 16 },
          { code: "312302", name: "Programming in C", practicals: 14 },
          { code: "312304", name: "Digital Techniques", practicals: 12 },
          { code: "312305", name: "Web Page Designing", practicals: 14 }
        ],
        3: [
          { code: "313301", name: "Object Oriented Programming (C++)", practicals: 14 },
          { code: "313302", name: "Data Structures using 'C'", practicals: 14 },
          { code: "313305", name: "DBMS and Administration", practicals: 12 },
          { code: "313306", name: "Principles of Communication", practicals: 12 }
        ],
        4: [
          { code: "314301", name: "Java Programming", practicals: 16 },
          { code: "314302", name: "Software Engineering", practicals: 12 },
          { code: "314304", name: "Data Communication & Computer Network", practicals: 12 },
          { code: "314305", name: "GUI Application Development", practicals: 14 }
        ],
        5: [
          { code: "315301", name: "Operating Systems", practicals: 12 },
          { code: "315302", name: "Client Side Scripting (JS)", practicals: 14 },
          { code: "315303", name: "Advanced Java Programming", practicals: 14 },
          { code: "315305", name: "Wireless & Mobile Networks", practicals: 12 }
        ],
        6: [
          { code: "316301", name: "Mobile Application Development", practicals: 14 },
          { code: "316302", name: "Emerging Trends in IT", practicals: 12 },
          { code: "316305", name: "Cryptography & Network Security", practicals: 12 }
        ]
      }
    },
    {
      id: "civil",
      code: "CE",
      name: "Civil Engineering",
      icon: "foundation",
      color: "var(--brand-civil)",
      description: "Understand surveying, concrete technology, highway engineering, and structural analysis.",
      semesters: {
        1: [
          { code: "311302", name: "Basic Surveying", practicals: 14 },
          { code: "311303", name: "Communication Skills (English)", practicals: 12 },
          { code: "311304", name: "Engineering Graphics", practicals: 12 },
          { code: "311305", name: "Basic Science (Physics & Chemistry)", practicals: 16 }
        ],
        2: [
          { code: "312301", name: "Applied Science (Physics & Chemistry)", practicals: 16 },
          { code: "312302", name: "Applied Mechanics", practicals: 14 },
          { code: "312303", name: "Construction Materials", practicals: 12 }
        ],
        3: [
          { code: "313301", name: "Advanced Surveying", practicals: 14 },
          { code: "313302", name: "Highway Engineering", practicals: 12 },
          { code: "313303", name: "Mechanics of Structures", practicals: 12 },
          { code: "313304", name: "Building Construction", practicals: 12 }
        ],
        4: [
          { code: "314301", name: "Theory of Structures", practicals: 12 },
          { code: "314302", name: "Geotechnical Engineering", practicals: 14 },
          { code: "314303", name: "Hydraulics", practicals: 14 },
          { code: "314304", name: "Computer Aided Drawing", practicals: 12 }
        ],
        5: [
          { code: "315301", name: "Estimating and Costing", practicals: 12 },
          { code: "315302", name: "Public Health Engineering", practicals: 12 },
          { code: "315303", name: "Concrete Technology", practicals: 14 },
          { code: "315304", name: "Design of Steel Structures", practicals: 12 }
        ],
        6: [
          { code: "316301", name: "Design of RCC Structures", practicals: 12 },
          { code: "316302", name: "Contracts and Accounts", practicals: 10 },
          { code: "316303", name: "Construction Management", practicals: 10 }
        ]
      }
    },
    {
      id: "mechanical",
      code: "ME",
      name: "Mechanical Engineering",
      icon: "settings",
      color: "var(--brand-mechanical)",
      description: "Learn fluid mechanics, machine design, thermodynamics, automobile engineering, and manufacturing.",
      semesters: {
        1: [
          { code: "311302", name: "Engineering Workshop Practice", practicals: 12 },
          { code: "311303", name: "Communication Skills (English)", practicals: 12 },
          { code: "311304", name: "Engineering Graphics", practicals: 12 },
          { code: "311305", name: "Basic Science (Physics & Chemistry)", practicals: 16 }
        ],
        2: [
          { code: "312301", name: "Applied Science (Physics & Chemistry)", practicals: 16 },
          { code: "312302", name: "Applied Mechanics", practicals: 14 },
          { code: "312303", name: "Mechanical Engg Workshop", practicals: 12 }
        ],
        3: [
          { code: "313301", name: "Strength of Materials", practicals: 12 },
          { code: "313302", name: "Basic Mechanical Engg", practicals: 14 },
          { code: "313303", name: "Thermal Engineering", practicals: 12 },
          { code: "313304", name: "Mechanical Engg Measurements", practicals: 14 }
        ],
        4: [
          { code: "314301", name: "Theory of Machines", practicals: 12 },
          { code: "314302", name: "Fluid Mechanics & Machinery", practicals: 14 },
          { code: "314303", name: "Manufacturing Processes", practicals: 12 },
          { code: "314304", name: "Computer Aided Drafting", practicals: 12 }
        ],
        5: [
          { code: "315301", name: "Advanced Manufacturing Processes", practicals: 12 },
          { code: "315302", name: "Power Engineering", practicals: 12 },
          { code: "315303", name: "Elements of Machine Design", practicals: 12 },
          { code: "315304", name: "Mechatronics", practicals: 14 }
        ],
        6: [
          { code: "316301", name: "Industrial Engineering", practicals: 12 },
          { code: "316302", name: "Automobile Engineering", practicals: 12 },
          { code: "316303", name: "Refrigeration & Air Conditioning", practicals: 12 }
        ]
      }
    },
    {
      id: "electrical",
      code: "EE",
      name: "Electrical Engineering",
      icon: "bolt",
      color: "var(--brand-electrical)",
      description: "Learn power generation, electric circuits, transmission systems, electrical machines, and microcontrollers.",
      semesters: {
        1: [
          { code: "311302", name: "Engineering Workshop Practice", practicals: 12 },
          { code: "311303", name: "Communication Skills (English)", practicals: 12 },
          { code: "311305", name: "Basic Science (Physics & Chemistry)", practicals: 16 }
        ],
        2: [
          { code: "312301", name: "Applied Science (Physics & Chemistry)", practicals: 16 },
          { code: "312303", name: "Elements of Electrical Engg", practicals: 14 },
          { code: "312304", name: "Fundamentals of Power Electronics", practicals: 12 }
        ],
        3: [
          { code: "313301", name: "Electrical Circuits & Networks", practicals: 14 },
          { code: "313302", name: "Electrical & Electronic Measurements", practicals: 14 },
          { code: "313303", name: "Electrical Machines - I", practicals: 16 },
          { code: "313304", name: "Electrical Power Generation", practicals: 10 }
        ],
        4: [
          { code: "314301", name: "Electrical Machines - II", practicals: 16 },
          { code: "314302", name: "Transmission & Distribution of Elec Power", practicals: 10 },
          { code: "314303", name: "Applied Power Electronics", practicals: 12 },
          { code: "314304", name: "Digital Electronics & Microcontroller Applications", practicals: 14 }
        ],
        5: [
          { code: "315301", name: "Switchgear & Protection", practicals: 12 },
          { code: "315302", name: "Energy Conservation & Audit", practicals: 10 },
          { code: "315303", name: "Industrial AC Machines", practicals: 14 },
          { code: "315304", name: "Utilization of Electrical Energy", practicals: 10 }
        ],
        6: [
          { code: "316301", name: "Installation, Commissioning & Maintenance", practicals: 12 },
          { code: "316302", name: "Electrical Drawing & CAD", practicals: 14 },
          { code: "316303", name: "Emerging Trends in Electrical Engg", practicals: 10 }
        ]
      }
    },
    {
      id: "etc",
      code: "EJ",
      name: "Electronics & Telecommunication",
      icon: "router",
      color: "var(--brand-etc)",
      description: "Focuses on analog/digital circuits, microcontroller applications, signal systems, and telecommunication networks.",
      semesters: {
        1: [
          { code: "311302", name: "Engineering Workshop Practice", practicals: 12 },
          { code: "311303", name: "Communication Skills (English)", practicals: 12 },
          { code: "311305", name: "Basic Science (Physics & Chemistry)", practicals: 16 }
        ],
        2: [
          { code: "312301", name: "Applied Science (Physics & Chemistry)", practicals: 16 },
          { code: "312302", name: "Electronic Devices & Circuits", practicals: 16 },
          { code: "312303", name: "Digital Techniques", practicals: 14 }
        ],
        3: [
          { code: "313301", name: "Applied Electronics", practicals: 14 },
          { code: "313302", name: "Electric Circuits & Networks", practicals: 12 },
          { code: "313303", name: "Electronics Measurements & Instrumentation", practicals: 14 },
          { code: "313304", name: "Principles of Electronic Communication", practicals: 12 }
        ],
        4: [
          { code: "314301", name: "Linear Integrated Circuits", practicals: 14 },
          { code: "314302", name: "Microcontroller & Applications", practicals: 16 },
          { code: "314303", name: "Basic Feedback Control System", practicals: 12 },
          { code: "314304", name: "Analog & Digital Communication", practicals: 12 }
        ],
        5: [
          { code: "315301", name: "Microwave & Radar Engineering", practicals: 12 },
          { code: "315302", name: "Computer Networks & Security", practicals: 14 },
          { code: "315303", name: "Embedded Systems", practicals: 14 },
          { code: "315304", name: "Mobile Communication", practicals: 12 }
        ],
        6: [
          { code: "316301", name: "Computer Communication Networks", practicals: 14 },
          { code: "316302", name: "Optical Fiber Communication", practicals: 12 },
          { code: "316303", name: "VLSI with VHDL", practicals: 14 }
        ]
      }
    }
  ],

  // Mapping of common subject codes to dynamic practical titles to make them look authentic
  practicalTemplates: {
    // Math, Physics, Chemistry
    "311303": [
      "Find area under curve using integration and standard formulas.",
      "Solve simultaneous equations with Cramer's Rule.",
      "Determine limits for rational algebraic expressions.",
      "Apply Napier's Rule to solve complex trigonometric equations.",
      "Calculate matrix transpose, determinants, and inverses.",
      "Find complex number modules and arguments.",
      "Perform vector dot and cross products.",
      "Find the angle between two lines using slope formulas.",
      "Apply derivative rules for algebraic expressions.",
      "Calculate equation of tangents and normals to a curve.",
      "Evaluate basic double integrals.",
      "Solve practical word problems using probability rules."
    ],
    "311305P": [
      "Use vernier calipers to measure dimensions of a cylinder.",
      "Use micrometer screw gauge to measure diameter of wire.",
      "Determine viscosity of given oil using Redwood viscometer.",
      "Find coefficient of thermal conductivity of bad conductor.",
      "Verify Snell's Law and determine refractive index of glass prism.",
      "Determine focal length of convex lens using u-v method.",
      "Measure wavelength of light using diffraction grating.",
      "Analyze characteristics of a photoelectric cell.",
      "Verify Joule's calorimeter constant for water.",
      "Determine acceleration due to gravity using simple pendulum.",
      "Verify Boyle's Law for gas pressure expansion.",
      "Study magnetic field intensity along the axis of circular coil."
    ],

    "311305C": [
      "Determine the hardness of given water sample.",
      "Determine the chloride content in given water sample.",
      "Determine the pH value of given solutions using pH paper and pH meter.",
      "Determine the conductivity of given solutions.",
      "Prepare standard solution of oxalic acid or potassium permanganate.",
      "Determine the percentage of copper in given brass sample.",
      "Determine the percentage of iron in given iron alloy.",
      "Determine the moisture content in coal.",
      "Determine the ash content in coal.",
      "Determine the calorific value of solid fuel using Bomb calorimeter.",
      "Determine the flash point and fire point of given lubricating oil.",
      "Determine the acid value of given lubricating oil."
    ], "311303": [
      "Determine pH value of various chemical solutions using pH paper.",
      "Measure hardness of water sample by EDTA titration method.",
      "Determine chloride content of a water sample.",
      "Determine rate of corrosion of a metal in acidic medium.",
      "Analyze proximate constituents of a coal sample.",
      "Determine saponification value of a lubricating oil sample.",
      "Determine moisture content of clay materials.",
      "Compare acid value of organic oils.",
      "Synthesize basic phenol-formaldehyde resin polymer.",
      "Determine flash and fire points of lubricating oils.",
      "Perform flame tests to identify basic metal cations.",
      "Conduct salt spray test to check corrosion resistance."
    ],
    // Computer programming, etc.
    "312302": [
      "Write a C program to display basic hello world message and layout.",
      "Implement simple calculator using basic arithmetic operators.",
      "Write C program using if-else to find largest of three numbers.",
      "Develop C program with switch-case to select day of the week.",
      "Use for and while loops to print prime numbers in a range.",
      "Write C program to reverse a number and check palindrome status.",
      "Implement one-dimensional array to search an element (linear search).",
      "Perform matrix addition and multiplication using 2D arrays.",
      "Create user defined functions to calculate factorial of a number.",
      "Demonstrate call by value and call by reference using pointers.",
      "Define structure for Student information and display the contents.",
      "Perform file write and read operations using standard C file I/O."
    ],
    "313301": [
      "Create a class for Box and compute volume using member functions.",
      "Implement function overloading to calculate area of shapes.",
      "Demonstrate use of default arguments in a constructor.",
      "Implement copy constructor and parameterized constructor in C++.",
      "Use friend function to access private members of two classes.",
      "Demonstrate single and multiple inheritance in C++ classes.",
      "Demonstrate hierarchical inheritance with employee profiles.",
      "Implement virtual functions to demonstrate runtime polymorphism.",
      "Overload unary and binary operators (+ and -) in a custom class.",
      "Create dynamic memory allocation using new and delete operators.",
      "Create a file stream to store and retrieve user logs.",
      "Handle divide-by-zero and array-out-of-bounds exceptions."
    ],
    "313302": [
      "Perform bubble sort and selection sort on an array of integers.",
      "Perform binary search on a sorted integer list.",
      "Implement a Stack using array and perform Push, Pop, Peek.",
      "Implement a Queue using array and perform Insertion, Deletion.",
      "Create a singly linked list and perform insertion at head/tail.",
      "Delete a node from a singly linked list at a given position.",
      "Implement Stack operations using a linked list.",
      "Convert infix algebraic expression to postfix notation.",
      "Traverse a binary tree using Inorder, Preorder, and Postorder.",
      "Perform search operation on a Binary Search Tree (BST).",
      "Represent a graph structure using adjacency matrix representation.",
      "Perform Breadth First Search (BFS) traversal on a graph."
    ],
    "313303": [
      "Create a database schema using SQL CREATE and ALTER statements.",
      "Insert, update, and delete table rows using SQL DML.",
      "Retrieve data using SELECT statements with WHERE, LIKE, and ORDER BY.",
      "Demonstrate usage of SQL aggregate functions (SUM, AVG, COUNT).",
      "Implement query grouping using GROUP BY and HAVING clauses.",
      "Perform inner join, left join, and right join on multiple tables.",
      "Create nested subqueries to extract complex dataset insights.",
      "Create and manage Views, Indexes, and Sequences in database.",
      "Implement PL/SQL block using conditional control statements.",
      "Create a PL/SQL cursor to fetch records from a table.",
      "Write a PL/SQL database trigger to log record modifications.",
      "Create stored procedures and functions with IN and OUT parameters."
    ],
    "315301": [
      "Install a guest operating system inside a Virtual Machine environment.",
      "Execute basic Unix command line utilities for directories and files.",
      "Write shell script to compute factorial and Fibonacci series.",
      "Configure user accounts, user groups, and file permissions in Linux.",
      "Implement FCFS (First Come First Serve) process scheduling algorithm.",
      "Implement SJF (Shortest Job First) process scheduling algorithm.",
      "Implement Round Robin process scheduling algorithm with quantum.",
      "Simulate Banker's algorithm for deadlock avoidance in system.",
      "Implement FIFO page replacement algorithm for memory management.",
      "Implement LRU (Least Recently Used) page replacement algorithm.",
      "Configure shared folders and remote desktop access on Linux/Windows.",
      "Monitor system processes using task managers, top, and kill commands."
    ],
    "315302": [
      "Write JS code to output a dynamically updated alert and prompt greeting.",
      "Implement JS form validation for email, phone, and password length.",
      "Create dynamic DOM manipulation: add and delete list items on click.",
      "Design an image slider carousel with autoplay and navigation arrows.",
      "Create digital clock using setInterval and Date functions.",
      "Perform API data fetch using fetch() and display in card grids.",
      "Store and load user preferences using localStorage APIs.",
      "Implement keypress event listeners to move an element on screen.",
      "Implement dark mode toggle using dynamic class body list switching.",
      "Create search filtering system for table items on keyup.",
      "Perform regular expression matching for zip code and text validation.",
      "Build a simple calculator UI using JS evaluation and button clicks."
    ]
  },

  // Fallback practical list if no subject specific templates are found
  getDefaultPracticals(subjectCode, subjectName) {
    const templates = this.practicalTemplates[subjectCode];
    if (templates) {
      return templates.map((aim, index) => ({
        number: index + 1,
        title: `Practical ${index + 1}: ${aim}`,
        duration: "2-3 Hours",
        difficulty: index < 4 ? "Easy" : index < 9 ? "Medium" : "Hard",
        likes: Math.floor(Math.random() * 80) + 20,
        downloads: Math.floor(Math.random() * 400) + 100
      }));
    }

    // Generate generalized aims based on subject name
    const genericAims = [
      `Introduction to fundamentals and setup of ${subjectName}.`,
      `Implement basic structural building blocks and compile code.`,
      `Design and verify simple input-output data structures.`,
      `Apply modular design concepts to solve domain problems.`,
      `Configure settings, variables, and parameters for stability.`,
      `Implement error handling and edge case check conditions.`,
      `Design intermediate workflows and evaluate metrics.`,
      `Integrate multiple modules together and verify interfaces.`,
      `Optimize performance and implement speed improvements.`,
      `Build real-life application scenarios using standard tools.`,
      `Conduct validation testing, check logs, and debug issues.`,
      `Prepare documentation, compile result tables, and summarize.`
    ];

    return genericAims.map((aim, index) => ({
      number: index + 1,
      title: `Practical ${index + 1}: ${aim}`,
      duration: "2 Hours",
      difficulty: index < 4 ? "Easy" : index < 9 ? "Medium" : "Hard",
      likes: Math.floor(Math.random() * 60) + 10,
      downloads: Math.floor(Math.random() * 250) + 50
    }));
  }
};
