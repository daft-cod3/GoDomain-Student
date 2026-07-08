const unitBlueprints = [
  {
    id: "unit-1",
    number: 1,
    label: "Unit 1",
    title: "Road Foundations",
    summary: "Monday to Friday lessons that build the core driving routine.",
    unlocked: true,
  },
  {
    id: "unit-2",
    number: 2,
    label: "Unit 2",
    title: "Live Road Reading",
    summary:
      "Monday to Friday lessons focused on live road reading and decision timing.",
    unlocked: true,
  },
  {
    id: "unit-3",
    number: 3,
    label: "Unit 3",
    title: "Safe Maneuvers",
    summary:
      "Monday to Friday lessons on parking, roundabouts, and emergency control.",
    unlocked: true,
  },
  {
    id: "unit-4",
    number: 4,
    label: "Unit 4",
    title: "Exam Readiness",
    summary:
      "Monday to Friday lessons for mock tests, revision loops, and final prep.",
    unlocked: true,
  },
];

const lessonBlueprints = [
  [
    {
      title: "What Is Driving?",
      subtitle:
        "What driving means, motor vehicle controls, clutch use, shifting gears, and the key features of the model town board.",
      icon: "book",
      focus: "Driving basics",
      overviewTitle: "Lesson 1 content",
      overviewSummary:
        "This lesson builds the learner's first understanding of what driving is, how the steering wheel, gears, brakes, clutch, accelerator, and mirrors work, and how the model town board is used during early practice.",
      overviewTopics: [
        {
          title: "What is driving?",
          points: [
            "Driving is the safe control and movement of a motor vehicle on a road or training board.",
            "A good driver combines observation, judgement, steering control, speed control, and obedience to traffic rules.",
            "Driving is not only moving the car. It is making correct decisions while protecting people, property, and traffic flow.",
          ],
        },
        {
          title: "Motor vehicle controls",
          points: [
            "Steering wheel: used to guide the direction of the vehicle smoothly and accurately.",
            "Gears: used to match engine power to vehicle speed and road conditions.",
            "Brakes: slow or stop the vehicle in a controlled way.",
            "Clutch: temporarily disconnects the engine from the gearbox so the driver can move off smoothly and change gears cleanly.",
            "Accelerator: increases engine power and vehicle movement.",
            "Mirrors: help the driver monitor traffic behind and at the sides before changing speed or direction.",
          ],
        },
        {
          title: "Clutch and shifting gears",
          points: [
            "The clutch disconnects the engine from the gearbox so the driver can select a new gear cleanly.",
            "Press the clutch fully before changing gears, select the gear, then release the clutch smoothly while balancing the accelerator.",
            "Good clutch use prevents stalling, jerking, and rough gear engagement during take-off or gear changes.",
          ],
        },
        {
          title: "Features of the model town board",
          points: [
            "The model town board normally includes junctions, lane markings, crossings, parking bays, signs, and turning routes.",
            "It helps a learner practise observation, lane position, stopping points, and parking routines before moving to busier roads.",
            "The board is used to train confidence in a controlled layout where instructions can be repeated step by step.",
          ],
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "What is driving?",
          duration: "8 min",
          detail:
            "Learn the meaning of driving and the responsibilities that come with moving a motor vehicle safely.",
        },
        {
          kind: "board",
          title: "Motor vehicle controls",
          duration: "10 min",
          detail:
            "Identify the steering wheel, gears, brakes, clutch, accelerator, and mirrors, then link each one to its job.",
        },
        {
          kind: "board",
          title: "Clutch use and shifting gears",
          duration: "9 min",
          detail:
            "Practise how the clutch is used, when to press it, how to release it smoothly, and how it supports gear changes.",
        },
        {
          kind: "board",
          title: "Model town board features",
          duration: "7 min",
          detail:
            "Walk through the features of the model town board and connect them to the first practical driving routines.",
        },
      ],
    },
    {
      title: "Model Town Board Road Options",
      subtitle:
        "Read each model town board road option, choose the correct lane, and follow the marked route through junctions, roundabouts, and exits.",
      icon: "star",
      focus: "Board road options",
      overviewTitle: "Lesson 2 content",
      overviewSummary:
        "This lesson uses animated model town board road options to show how a learner should read the route code, position early, follow lane arrows, and exit cleanly without drifting into the wrong lane.",
      overviewTopics: [
        {
          title: "Reading road option codes",
          points: [
            "Each model town board option uses a route code that tells the learner which road entry and road exit to follow.",
            "Read the code before moving so the first lane choice is made early instead of being corrected late.",
            "The GIF loops below help connect each code to the exact route shown on the board.",
          ],
        },
        {
          title: "Lane position and entry",
          points: [
            "Approach the board route in the correct lane before reaching the roundabout or junction mouth.",
            "Use the road arrows, broken lines, and lane separators to keep the vehicle committed to the chosen option.",
            "A stable entry keeps the route smooth and prevents last-second lane crossing.",
          ],
        },
        {
          title: "Roundabout and junction choice",
          points: [
            "Watch how each option enters, circulates, and leaves the roundabout while maintaining lane discipline.",
            "Signal and steer only after the route is confirmed by the marked road option.",
            "The safest choice is the one that follows the board markings without cutting across another lane.",
          ],
        },
        {
          title: "Exit, parking, and completion",
          points: [
            "After leaving the selected route, straighten the vehicle and prepare for the next instruction.",
            "Use the parking bays, crossings, and side-road markings as reference points for controlled completion.",
            "Repeat the GIF options until the route code, lane position, and final exit can be described without hesitation.",
          ],
        },
      ],
      roadOptionIllustrations: [
        {
          id: "mtb31",
          label: "Option 3-1",
          image: "/MTBgifs/MTB31.gif",
          text: "Displays the 3-1 board route, showing the vehicle committing to the marked lane, reading the roundabout arrows, and leaving by the selected exit without crossing lane boundaries.",
        },
        {
          id: "mtb312",
          label: "Option 3-1-2",
          image: "/MTBgifs/MTB312.gif",
          text: "Shows the extended 3-1-2 option, where the learner must keep the first decision stable and prepare early for the follow-up road choice after the initial exit.",
        },
        {
          id: "mtb32",
          label: "Option 3-2",
          image: "/MTBgifs/MTB32.gif",
          text: "Illustrates the 3-2 route with emphasis on approaching from the correct lane, holding a smooth curve through the board, and exiting only when the selected road is reached.",
        },
        {
          id: "mtb331",
          label: "Option 3-3-1",
          image: "/MTBgifs/MTB331.gif",
          text: "Demonstrates a multi-stage 3-3-1 route, helping the learner identify when to stay circulating and when to leave for the final instructed road option.",
        },
        {
          id: "mtb332",
          label: "Option 3-3-2",
          image: "/MTBgifs/MTB332.gif",
          text: "Displays the 3-3-2 variation, showing how a small change in the final route code changes the exit decision while the entry routine remains controlled.",
        },
        {
          id: "mtb411",
          label: "Option 4-1-1",
          image: "/MTBgifs/MTB411.gif",
          text: "Shows the 4-1-1 path from a different board approach, reinforcing early lane selection, lane discipline, and a clean finish at the instructed road.",
        },
        {
          id: "mtb412",
          label: "Option 4-1-2",
          image: "/MTBgifs/MTB412.gif",
          text: "Illustrates the 4-1-2 option, where the learner tracks the same entry family but adjusts the final choice to match the second road instruction.",
        },
        {
          id: "mtb421",
          label: "Option 4-2-1",
          image: "/MTBgifs/MTB421.gif",
          text: "Demonstrates the 4-2-1 route, highlighting controlled approach speed, clear road positioning, and route confirmation before the vehicle exits.",
        },
        {
          id: "mtb422",
          label: "Option 4-2-2",
          image: "/MTBgifs/MTB422.gif",
          text: "Displays the 4-2-2 road option, showing how to hold the vehicle in the planned lane and complete the second-road choice without late steering corrections.",
        },
        {
          id: "mtb431",
          label: "Option 4-3-1",
          image: "/MTBgifs/MTB431.gif",
          text: "Shows the 4-3-1 route, useful for practising a longer board read where the learner must keep scanning ahead while staying inside the correct lane path.",
        },
        {
          id: "mtb432",
          label: "Option 4-3-2",
          image: "/MTBgifs/MTB432.gif",
          text: "Illustrates the 4-3-2 variation, connecting the visible road arrows to the final exit choice so the learner does not confuse similar-looking routes.",
        },
        {
          id: "mtb441",
          label: "Option 4-4-1",
          image: "/MTBgifs/MTB441.gif",
          text: "Demonstrates the 4-4-1 option with a longer decision sequence, reinforcing patience, lane holding, and a precise exit at the instructed road.",
        },
        {
          id: "mtb442",
          label: "Option 4-4-2",
          image: "/MTBgifs/MTB442.gif",
          text: "Displays the 4-4-2 board path, showing how the final digit changes the finish while the learner keeps the earlier lane routine consistent.",
        },
        {
          id: "mtb443",
          label: "Option 4-4-3",
          image: "/MTBgifs/MTB443.gif",
          text: "Shows the 4-4-3 option, helping learners compare exit timing against the nearby 4-4 routes and avoid leaving the roundabout too early.",
        },
        {
          id: "mtb444",
          label: "Option 4-4-4",
          image: "/MTBgifs/MTB444.gif",
          text: "Illustrates the full 4-4-4 road option, where the learner follows the longest same-road family and completes only when the marked route reaches its final exit.",
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "Reading road option codes",
          duration: "8 min",
          detail:
            "Learn how the model town board road option codes describe the entry, path, and exit the vehicle must follow.",
        },
        {
          kind: "board",
          title: "Lane position and entry",
          duration: "7 min",
          detail:
            "Use the board markings and arrows to choose the correct lane before entering the route.",
        },
        {
          kind: "board",
          title: "Roundabout and junction choice",
          duration: "9 min",
          detail:
            "Follow each option through roundabouts and junctions while keeping the vehicle inside the planned lane.",
        },
        {
          kind: "board",
          title: "Exit, parking, and completion",
          duration: "8 min",
          detail:
            "Finish each road option cleanly by exiting at the correct road, straightening the vehicle, and preparing for the next instruction.",
        },
      ],
    },
    {
      title: "Road Markings",
      subtitle: "Use lane paint and road edges to read the road early.",
      icon: "video",
      focus: "Lane reading",
      overviewTitle: "Lesson 3 content",
      overviewSummary:
        "This lesson teaches the learner how painted road markings guide lane choice, speed decisions, and safe stopping before hazards become urgent.",
      overviewTopics: [
        {
          title: "Center line markings",
          points: [
            "Broken center lines normally allow overtaking when the road ahead is clear and safe.",
            "Solid center lines warn the driver to hold position because visibility, bends, or oncoming traffic make crossing unsafe.",
            "Double center lines demand stronger lane discipline and should be treated as a no-cross boundary unless road instructions allow otherwise.",
          ],
        },
        {
          title: "Lane arrows and turn bays",
          points: [
            "Directional arrows prepare the driver early for turning, merging, or choosing the correct lane at a junction.",
            "Turn bays separate turning traffic from through traffic so decisions can be made without blocking the full lane.",
            "Late lane changes near arrows increase risk because other drivers expect the marked direction to be followed.",
          ],
        },
        {
          title: "Edge lines and stop boxes",
          points: [
            "Edge lines help define the safe road boundary, especially where curbs, shoulders, or low light make road edges harder to judge.",
            "Stop lines and boxes mark where the vehicle should wait before a crossing, signal, or restricted area.",
            "Good drivers use these markings as early planning tools instead of reacting only at the final second.",
          ],
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "Center line markings",
          duration: "8 min",
          detail:
            "Learn what broken, solid, and double center lines mean and how they control overtaking and lane position.",
        },
        {
          kind: "board",
          title: "Lane arrows and turn bays",
          duration: "9 min",
          detail:
            "Use guided road layouts to read directional arrows, merge points, and turn-bay markings before reaching the junction.",
        },
        {
          kind: "signs",
          title: "Edge lines and stop boxes",
          duration: "7 min",
          detail:
            "Identify the markings that define road boundaries and exact stopping points around crossings and signals.",
        },
        {
          kind: "quiz",
          title: "Road markings quick check",
          duration: "5 min",
          detail:
            "Confirm that you can match common road markings to the right driving response without hesitation.",
        },
      ],
    },
    {
      title: "Junction Rules",
      subtitle: "Learn who moves first and where risk builds up fastest.",
      icon: "mic",
      focus: "Junction flow",
      overviewTitle: "Lesson 4 content",
      overviewSummary:
        "This lesson focuses on reading junctions early, deciding priority correctly, and entering or turning only when observation and timing are both clear.",
      overviewTopics: [
        {
          title: "Junction approach scan",
          points: [
            "A safe junction routine starts before the stop line by checking mirrors, speed, signs, pedestrians, and vehicles approaching from all sides.",
            "The driver should reduce speed early enough to think clearly rather than arriving too fast and making rushed decisions.",
            "Approach discipline creates more time to choose the correct lane, signal, and stopping point.",
          ],
        },
        {
          title: "Priority and right of way",
          points: [
            "Priority depends on road signs, road markings, traffic signals, and the traffic already established in the junction.",
            "Giving way means waiting without pressure when another road user clearly has the safer legal claim to move first.",
            "Uncertain drivers should pause and reassess rather than forcing entry into a narrowing gap.",
          ],
        },
        {
          title: "Turning at junctions",
          points: [
            "Left and right turns require mirror checks, correct lane position, a signal, and a final look before the steering input begins.",
            "Pedestrians, cyclists, and motorcycles often create the highest hidden risk during the final turn phase.",
            "A smooth turn keeps the vehicle controlled while still leaving space for others already using the road.",
          ],
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "Junction approach scan",
          duration: "8 min",
          detail:
            "Build the early observation routine that prepares you for stopping, giving way, or entering safely.",
        },
        {
          kind: "board",
          title: "Priority and right of way",
          duration: "10 min",
          detail:
            "Read signs, markings, and traffic position correctly so you know who should move first at the junction.",
        },
        {
          kind: "board",
          title: "Turning at junctions",
          duration: "9 min",
          detail:
            "Practise lane position, steering timing, and final observations for safer left and right turns.",
        },
        {
          kind: "quiz",
          title: "Junction decision quiz",
          duration: "5 min",
          detail:
            "Test whether you can choose safe priority decisions under short scenario-based pressure.",
        },
      ],
    },
    {
      title: "Hazard Awareness",
      subtitle: "Spot pedestrians, blind corners, and sudden stops sooner.",
      icon: "dumbbell",
      focus: "Hazard scan",
      overviewTitle: "Lesson 5 content",
      overviewSummary:
        "This lesson trains the learner to notice hazards earlier, predict what may go wrong next, and adjust space and speed before the danger becomes immediate.",
      overviewTopics: [
        {
          title: "Spotting early hazards",
          points: [
            "Hazards often appear first as clues such as brake lights, movement near the roadside, blocked views, or changing traffic speed.",
            "Seeing these clues early gives the driver time to plan instead of reacting suddenly.",
            "A good hazard scan moves far ahead, nearby, to mirrors, and back ahead again in a steady loop.",
          ],
        },
        {
          title: "Blind corners and hidden movement",
          points: [
            "Parked vehicles, walls, bends, and vegetation can hide people, cyclists, or oncoming traffic until the last moment.",
            "When visibility is restricted, the safe response is to reduce speed and widen observation rather than hoping the path stays clear.",
            "Hidden movement should be expected in school areas, markets, and narrow residential roads.",
          ],
        },
        {
          title: "Space and speed response",
          points: [
            "Once a hazard is identified, the driver chooses a response using speed reduction, lane position, horn use when necessary, and extra following distance.",
            "The safest response is usually the earliest smooth one, not the harshest late correction.",
            "Leaving space around the vehicle protects time for a second decision if the first hazard changes unexpectedly.",
          ],
        },
      ],
      steps: [
        {
          kind: "theory",
          title: "Spotting early hazards",
          duration: "8 min",
          detail:
            "Learn the visual clues that show risk is building before a pedestrian, vehicle, or obstacle fully enters your path.",
        },
        {
          kind: "board",
          title: "Blind corners and hidden movement",
          duration: "9 min",
          detail:
            "Work through restricted-view scenarios so you adjust speed and observation before the hidden hazard appears.",
        },
        {
          kind: "board",
          title: "Space and speed response",
          duration: "9 min",
          detail:
            "Practise the smooth control changes that create more room and more time when danger starts to build.",
        },
        {
          kind: "quiz",
          title: "Hazard scan quiz",
          duration: "5 min",
          detail:
            "Check that you can recognize risk clues quickly and choose the safest early response.",
        },
      ],
    },
  ],
  [
    {
      title: "Speed Management",
      subtitle: "Match the road, not just the speed sign.",
      icon: "dumbbell",
      focus: "Speed control",
    },
    {
      title: "Lane Discipline",
      subtitle: "Stay stable through merges, turns, and lane changes.",
      icon: "book",
      focus: "Lane discipline",
    },
    {
      title: "Overtaking Basics",
      subtitle: "Plan safe passes with time, space, and visibility.",
      icon: "star",
      focus: "Safe overtaking",
    },
    {
      title: "Pedestrian Zones",
      subtitle: "Handle school areas, crossings, and shared streets.",
      icon: "video",
      focus: "Pedestrian safety",
    },
    {
      title: "Night Driving",
      subtitle: "See further, react slower, and control glare correctly.",
      icon: "mic",
      focus: "Night routine",
    },
  ],
  [
    {
      title: "Parking Routine",
      subtitle: "Break parking down into clean, repeatable steps.",
      icon: "book",
      focus: "Parking setup",
    },
    {
      title: "Hill Starts",
      subtitle: "Hold control on an incline without panic or rollback.",
      icon: "dumbbell",
      focus: "Hill start",
    },
    {
      title: "Roundabouts",
      subtitle: "Read gaps, exits, and lane choice before entry.",
      icon: "star",
      focus: "Roundabout reading",
    },
    {
      title: "Emergency Response",
      subtitle: "React fast and keep the vehicle stable under pressure.",
      icon: "mic",
      focus: "Emergency response",
    },
    {
      title: "Highway Etiquette",
      subtitle: "Blend speed, spacing, and smooth lane changes.",
      icon: "video",
      focus: "Highway flow",
    },
  ],
  [
    {
      title: "Mock Theory",
      subtitle: "Test your recall under exam-like timing.",
      icon: "star",
      focus: "Theory practice",
    },
    {
      title: "Case Drills",
      subtitle: "Solve scenario-based decisions with confidence.",
      icon: "video",
      focus: "Case analysis",
    },
    {
      title: "Sign Memory",
      subtitle: "Speed up recognition with short repetition cycles.",
      icon: "book",
      focus: "Sign memory",
    },
    {
      title: "Final Revision",
      subtitle: "Tighten the weak points before assessment day.",
      icon: "mic",
      focus: "Revision loop",
    },
    {
      title: "Assessment Warmup",
      subtitle: "Run a final confidence check before the exam.",
      icon: "dumbbell",
      focus: "Exam warmup",
    },
  ],
  [
    {
      title: "Full Mock Test",
      subtitle: "Simulate the real test under timed conditions.",
      icon: "star",
      focus: "Mock test",
    },
    {
      title: "Weak Spot Repair",
      subtitle: "Target the areas that still need the most work.",
      icon: "dumbbell",
      focus: "Weak spots",
    },
    {
      title: "Instructor Debrief",
      subtitle: "Review feedback and apply corrections before the test.",
      icon: "mic",
      focus: "Debrief",
    },
    {
      title: "Confidence Drill",
      subtitle: "Build calm and control through repeated short runs.",
      icon: "book",
      focus: "Confidence",
    },
    {
      title: "Test Day Ready",
      subtitle: "Final checklist and mental preparation for the road test.",
      icon: "video",
      focus: "Test day",
    },
  ],
];

const completionBlueprint = {};

const progressiveLessonContent = {
  "Speed Management": {
    summary:
      "This lesson moves from simple speed limits into choosing a speed that matches traffic, visibility, road surface, and stopping distance.",
    topics: [
      {
        title: "Reading the safe speed",
        points: [
          "Start with the posted limit, then reduce speed when traffic, weather, pedestrians, or road shape demand it.",
          "A safe speed leaves enough time to stop smoothly if the situation changes.",
          "Speed choice should be settled before the hazard, not during the hazard.",
        ],
      },
      {
        title: "Following distance",
        points: [
          "Leave more space when speed rises because stopping distance grows quickly.",
          "Increase the gap in rain, dust, traffic queues, and when following heavy vehicles.",
          "A steady gap protects the driver from harsh braking and late swerves.",
        ],
      },
      {
        title: "Speed changes before turns",
        points: [
          "Brake before the bend or turn, then steer with the vehicle already settled.",
          "Avoid entering junctions while still reducing speed aggressively.",
          "Smooth speed changes make signals and lane position easier for other road users to read.",
        ],
      },
    ],
  },
  "Lane Discipline": {
    summary:
      "This lesson develops stable lane holding after speed control, adding mirror checks, lane choice, and controlled merging.",
    topics: [
      {
        title: "Choosing the correct lane early",
        points: [
          "Use signs, arrows, and the planned direction to choose the lane before the road becomes busy.",
          "Late lane choices create pressure and can force unsafe crossing of lane markings.",
          "The correct lane is the one that matches the next legal movement, not the shortest path.",
        ],
      },
      {
        title: "Holding lane position",
        points: [
          "Keep the vehicle centered with small steering corrections instead of drifting and correcting sharply.",
          "Use road edges, center lines, and vehicles ahead as reference points.",
          "Stable lane holding gives motorcycles and pedestrians clearer space around the vehicle.",
        ],
      },
      {
        title: "Merging and lane changes",
        points: [
          "Check mirrors, signal, confirm the gap, then move gradually into the lane.",
          "Never start a lane change just because the signal is on; the gap must be safe first.",
          "Cancel the signal and settle speed once the vehicle is fully in the new lane.",
        ],
      },
    ],
  },
  "Overtaking Basics": {
    summary:
      "This lesson builds on lane discipline by teaching when overtaking is legal, visible, and worth doing.",
    topics: [
      {
        title: "When not to overtake",
        points: [
          "Do not overtake near bends, junctions, crossings, hills, solid lines, or unclear views.",
          "Avoid overtaking when the gain is small but the risk is high.",
          "If the vehicle ahead is turning or slowing for a hazard, wait and reassess.",
        ],
      },
      {
        title: "Planning the pass",
        points: [
          "Check mirrors and oncoming traffic before moving out.",
          "Confirm there is enough space to pass and return without forcing another road user to brake.",
          "Use a clear signal only after the decision is safe.",
        ],
      },
      {
        title: "Returning safely",
        points: [
          "Return to the lane only after the passed vehicle is visible in the mirror.",
          "Do not cut back sharply or slow immediately after overtaking.",
          "Cancel the signal and rebuild a safe following distance.",
        ],
      },
    ],
  },
  "Pedestrian Zones": {
    summary:
      "This lesson turns hazard scanning toward people on foot, especially around schools, crossings, markets, and shared streets.",
    topics: [
      {
        title: "Predicting pedestrian movement",
        points: [
          "Look for children, parked vehicles, bus stops, shops, and road edges where people may step out.",
          "A pedestrian looking away may still enter the road, so reduce speed before the risk is close.",
          "Eye contact helps, but it does not replace slowing and covering the brake.",
        ],
      },
      {
        title: "Crossings and waiting points",
        points: [
          "Approach crossings at a speed that allows a calm stop before the line.",
          "Never block a crossing while waiting in traffic.",
          "Check both sides of the crossing before moving again after pedestrians clear.",
        ],
      },
      {
        title: "Shared road spaces",
        points: [
          "In busy pedestrian areas, keep speed low and leave extra side clearance.",
          "Use the horn only as a warning when necessary, not to pressure people.",
          "Be ready for sudden stops from vehicles ahead reacting to pedestrians.",
        ],
      },
    ],
  },
  "Night Driving": {
    summary:
      "This lesson adds low-light decisions: headlight use, glare control, speed reduction, and spotting hidden road users.",
    topics: [
      {
        title: "Lighting and visibility",
        points: [
          "Use headlights early enough to see and be seen, not only when the road is fully dark.",
          "Dip headlights for oncoming traffic and when following another vehicle closely.",
          "Dirty windscreens and weak lights reduce reaction time at night.",
        ],
      },
      {
        title: "Managing glare",
        points: [
          "Look slightly left of bright oncoming lights while keeping the lane visible.",
          "Slow down if glare hides pedestrians, cyclists, road edges, or markings.",
          "Avoid staring at high beams because recovery takes time.",
        ],
      },
      {
        title: "Night speed choice",
        points: [
          "Drive at a speed that allows stopping within the distance lit by the headlights.",
          "Leave more following distance because judging speed and distance is harder at night.",
          "Expect unlit road users near settlements and shoulders.",
        ],
      },
    ],
  },
  "Parking Routine": {
    summary:
      "This lesson begins the maneuver unit by breaking parking into setup, reference points, steering timing, and final correction.",
    topics: [
      {
        title: "Parking setup",
        points: [
          "Choose a legal, visible, and safe parking space before slowing sharply.",
          "Signal early and position the vehicle so traffic can understand the plan.",
          "Check mirrors and blind spots before leaving the normal lane position.",
        ],
      },
      {
        title: "Reference points",
        points: [
          "Use mirrors, curb lines, bay markings, and vehicle corners as fixed guides.",
          "Move slowly enough that small steering corrections can be made calmly.",
          "Stop and reset if the angle becomes unsafe instead of forcing the vehicle in.",
        ],
      },
      {
        title: "Finishing safely",
        points: [
          "Straighten the wheels and secure the vehicle before opening doors.",
          "Leave enough space for other road users and nearby parked vehicles.",
          "Before moving off, check all sides and signal only when ready to rejoin.",
        ],
      },
    ],
  },
  "Hill Starts": {
    summary:
      "This lesson builds from parking control into clutch, brake, and observation timing on slopes.",
    topics: [
      {
        title: "Holding the vehicle",
        points: [
          "Use the parking brake or foot brake to prevent rollback before moving off.",
          "Find the biting point gently before releasing the brake.",
          "Avoid rushing the pedals because sudden release can stall or roll the vehicle.",
        ],
      },
      {
        title: "Moving off uphill",
        points: [
          "Check mirrors, signal if needed, and confirm the path is clear before releasing the brake.",
          "Add enough power for the slope while easing the clutch smoothly.",
          "Keep steering steady and build speed only after the vehicle is moving cleanly.",
        ],
      },
      {
        title: "Downhill control",
        points: [
          "Select a gear that helps control speed before the slope becomes steep.",
          "Use brakes smoothly instead of coasting with the clutch down.",
          "Increase following distance because gravity lengthens stopping distance.",
        ],
      },
    ],
  },
  Roundabouts: {
    summary:
      "This lesson combines signs, lanes, priority, and exit timing for controlled roundabout decisions.",
    topics: [
      {
        title: "Approach and lane choice",
        points: [
          "Read signs and arrows early so the correct lane is chosen before the entry line.",
          "Reduce speed while checking traffic already circulating.",
          "Give way to traffic with priority and wait without edging forward into danger.",
        ],
      },
      {
        title: "Circulating safely",
        points: [
          "Hold the selected lane and avoid cutting across the roundabout.",
          "Watch for motorcycles, cyclists, and vehicles changing lanes late.",
          "Keep speed low enough to respond if another driver makes a poor choice.",
        ],
      },
      {
        title: "Exit timing",
        points: [
          "Signal at the correct time so other road users know the exit plan.",
          "Check mirrors before leaving the roundabout.",
          "Straighten into the correct lane after the exit and cancel the signal.",
        ],
      },
    ],
  },
  "Emergency Response": {
    summary:
      "This lesson teaches controlled reactions after the learner has practised normal maneuvers and roundabouts.",
    topics: [
      {
        title: "Emergency braking",
        points: [
          "Brake firmly while keeping the steering straight when a sudden stop is needed.",
          "Avoid swerving unless braking alone cannot avoid the danger.",
          "After stopping, check mirrors and secure the vehicle if needed.",
        ],
      },
      {
        title: "Tyre or control problem",
        points: [
          "Hold the steering wheel firmly and reduce speed gradually.",
          "Avoid harsh braking if the vehicle feels unstable.",
          "Move to a safe place only when the path is clear.",
        ],
      },
      {
        title: "After an incident",
        points: [
          "Warn other road users with hazard lights or a safe warning triangle where required.",
          "Protect passengers and move away from traffic if it is safe.",
          "Report the incident and do not create a second hazard.",
        ],
      },
    ],
  },
  "Highway Etiquette": {
    summary:
      "This lesson extends lane and speed skills to higher-speed roads where spacing, signaling, and patience matter more.",
    topics: [
      {
        title: "Joining a highway",
        points: [
          "Use the acceleration lane to match traffic speed when safe.",
          "Check mirrors and blind spots before merging.",
          "Do not force entry; adjust speed to take a clear gap.",
        ],
      },
      {
        title: "Keeping highway space",
        points: [
          "Maintain a larger following distance than on town roads.",
          "Keep left or in the normal lane unless overtaking or following road instructions.",
          "Avoid sudden braking because traffic behind is moving faster.",
        ],
      },
      {
        title: "Exiting smoothly",
        points: [
          "Move into the exit lane early after mirror checks and signaling.",
          "Reduce speed on the exit lane, not in the fast traffic lane.",
          "Watch for vehicles cutting across late near exits.",
        ],
      },
    ],
  },
  "Mock Theory": {
    summary:
      "This lesson starts exam readiness with timed theory recall across signs, markings, priority, and safety routines.",
    topics: [
      {
        title: "Timed question rhythm",
        points: [
          "Read the full question before choosing an answer.",
          "Eliminate clearly unsafe options first.",
          "Mark uncertain questions for review instead of losing time early.",
        ],
      },
      {
        title: "Rule recall",
        points: [
          "Connect signs and markings to the action they require.",
          "Use priority rules to decide who moves first in scenario questions.",
          "Check whether the safest answer is legal, visible, and predictable.",
        ],
      },
      {
        title: "Reviewing mistakes",
        points: [
          "Group missed questions by topic so revision is targeted.",
          "Rewrite the correct rule in one short sentence.",
          "Repeat the missed card before taking another mock attempt.",
        ],
      },
    ],
  },
  "Case Drills": {
    summary:
      "This lesson turns theory knowledge into scenario decisions with changing traffic, pedestrians, and road signs.",
    topics: [
      {
        title: "Reading the full scene",
        points: [
          "Identify the road layout, signs, markings, traffic, and vulnerable road users first.",
          "Avoid answering from one clue while ignoring a bigger hazard.",
          "State the safest first action before choosing the final answer.",
        ],
      },
      {
        title: "Decision order",
        points: [
          "Control speed before steering or signaling when risk is rising.",
          "Give priority when the legal or safer claim belongs to another road user.",
          "Choose the option that leaves the most time and space.",
        ],
      },
      {
        title: "Explaining the answer",
        points: [
          "A good case answer can be explained with rule, risk, and response.",
          "If two answers seem legal, choose the one that reduces danger earlier.",
          "Use each explanation as a flashcard for faster recall.",
        ],
      },
    ],
  },
  "Sign Memory": {
    summary:
      "This lesson sharpens recognition speed so signs are understood before the vehicle reaches the decision point.",
    topics: [
      {
        title: "Shape and color clues",
        points: [
          "Use sign shape and color to identify the family before reading details.",
          "Warning signs prepare the driver to slow and search for the hazard.",
          "Regulatory signs tell the driver what must or must not be done.",
        ],
      },
      {
        title: "Meaning to action",
        points: [
          "Every sign should trigger a specific driving response.",
          "If the sign is missed, use road markings and traffic behavior as backup clues.",
          "Repeat signs in short groups to avoid mixing similar symbols.",
        ],
      },
      {
        title: "Fast recall check",
        points: [
          "Name the sign, its location, and the correct response within a few seconds.",
          "Separate confusing signs and compare them side by side.",
          "Review missed signs again the next day.",
        ],
      },
    ],
  },
  "Final Revision": {
    summary:
      "This lesson pulls weak areas into a final revision loop before the assessment warmup.",
    topics: [
      {
        title: "Finding weak points",
        points: [
          "Review missed cards, slow answers, and topics that still need prompts.",
          "Prioritize safety-critical mistakes over easy score gains.",
          "Build a short list of topics to repeat before the final check.",
        ],
      },
      {
        title: "Mixed practice",
        points: [
          "Mix signs, markings, priority, hazards, and maneuvers so recall is flexible.",
          "Avoid practising only the most comfortable topic.",
          "Explain each answer aloud to confirm the rule is understood.",
        ],
      },
      {
        title: "Confidence pass",
        points: [
          "Repeat only the cards that were missed or guessed.",
          "Stop when answers are accurate and calm, not when the session feels long.",
          "Keep the final routine short enough to stay fresh.",
        ],
      },
    ],
  },
  "Assessment Warmup": {
    summary:
      "This lesson prepares the learner for the final assessment with calm checks, route awareness, and mistake recovery.",
    topics: [
      {
        title: "Pre-test routine",
        points: [
          "Check documents, vehicle controls, mirrors, seat position, and safety basics before starting.",
          "Listen fully to instructions before moving.",
          "Ask for clarification if an instruction is not heard clearly.",
        ],
      },
      {
        title: "During the assessment",
        points: [
          "Drive normally and safely instead of trying to impress with speed.",
          "Use mirrors, signals, position, speed, and look as a repeatable routine.",
          "If a small mistake happens, recover safely and continue calmly.",
        ],
      },
      {
        title: "Final readiness check",
        points: [
          "Confirm the weakest topic has been reviewed once more.",
          "Prioritize smooth observation and legal decisions.",
          "End with a short confidence pass instead of heavy last-minute cramming.",
        ],
      },
    ],
  },
};

function getProgressiveLessonContent(lessonBlueprint) {
  return progressiveLessonContent[lessonBlueprint.title] ?? null;
}

function createDefaultLessonContent(unit, lessonBlueprint, lessonNumber) {
  const progressiveContent = getProgressiveLessonContent(lessonBlueprint);
  if (progressiveContent) {
    const steps = [
      ...progressiveContent.topics.map((topic, index) => ({
        kind: index === 0 ? "theory" : "board",
        title: topic.title,
        duration: `${8 + index} min`,
        detail: topic.points[0],
      })),
      {
        kind: "quiz",
        title: `${lessonBlueprint.focus} checkpoint`,
        duration: "5 min",
        detail:
          progressiveContent.topics.at(-1)?.points.at(-1) ??
          "Confirm the safest first action before moving on.",
      },
    ];

    return {
      overviewTitle: `Lesson ${lessonNumber} content`,
      overviewSummary: progressiveContent.summary,
      overviewTopics: progressiveContent.topics,
      steps,
    };
  }

  const focus = lessonBlueprint.focus ?? lessonBlueprint.title;
  const lowerFocus = focus.toLowerCase();
  const topics = [
    {
      title: `${focus} setup`,
      points: [
        `Identify the main ${lowerFocus} cues before the vehicle reaches the decision point.`,
        `Connect ${lowerFocus} to mirrors, speed, position, and the next safe action.`,
        `Use ${unit.title} routines so the lesson stays connected to the wider driving path.`,
      ],
    },
    {
      title: `${focus} road reading`,
      points: [
        `Scan ahead, near, and behind before committing to the ${lowerFocus} response.`,
        "Choose the calmest safe action early instead of correcting late.",
        `Explain the reason for each ${lowerFocus} decision in one short sentence.`,
      ],
    },
    {
      title: `${focus} practice loop`,
      points: [
        `Repeat the ${lowerFocus} routine slowly until the order feels automatic.`,
        "Reset after each attempt and name the one detail that should improve.",
        "Keep the routine short, visible, and tied to the road situation in front of you.",
      ],
    },
    {
      title: `${focus} checkpoint`,
      points: [
        `Match each ${lowerFocus} scenario to the safest first response.`,
        "Confirm the signal, lane, speed, and observation steps before finishing.",
        "Use missed answers as the next flash-card review target.",
      ],
    },
  ];

  const steps = topics.map((topic, index) => ({
    kind: index === 3 ? "quiz" : index === 0 ? "theory" : "board",
    title: topic.title,
    duration: index === 3 ? "5 min" : `${7 + index} min`,
    detail: topic.points[0],
  }));

  return {
    overviewTitle: `Lesson ${lessonNumber} content`,
    overviewSummary:
      lessonBlueprint.overviewSummary ??
      `${lessonBlueprint.title} builds ${lowerFocus} through short flash cards, visual checks, and a final checkpoint tied to ${unit.label}.`,
    overviewTopics: topics,
    steps,
  };
}

function createSubLessons(unit, lessonNumber, focus, lessonBlueprint) {
  const completedCount = completionBlueprint[unit.id]?.[lessonNumber - 1] ?? 0;
  const content = lessonBlueprint.steps?.length
    ? { steps: lessonBlueprint.steps }
    : createDefaultLessonContent(unit, lessonBlueprint, lessonNumber);

  return content.steps.map((template, index) => ({
    id: `${unit.id}-lesson-${lessonNumber}-step-${index + 1}`,
    title: template.title ?? `${focus} step ${index + 1}`,
    kind: template.kind,
    duration: template.duration,
    detail: template.detail,
    completed: unit.unlocked ? index < completedCount : false,
  }));
}

function createLesson(unit, lessonBlueprint, lessonNumber, globalIndex) {
  const defaultContent =
    lessonBlueprint.overviewTopics?.length && lessonBlueprint.steps?.length
      ? null
      : createDefaultLessonContent(unit, lessonBlueprint, lessonNumber);
  const lessons = createSubLessons(
    unit,
    lessonNumber,
    lessonBlueprint.focus,
    lessonBlueprint,
  );

  return {
    id: `${unit.id}-lesson-${lessonNumber}`,
    index: globalIndex,
    label: `Lesson ${String(lessonNumber).padStart(2, "0")}`,
    title: lessonBlueprint.title,
    subtitle: lessonBlueprint.subtitle,
    icon: lessonBlueprint.icon,
    unitId: unit.id,
    unitNumber: unit.number,
    unitLabel: unit.label,
    lessonNumber,
    isLocked: !unit.unlocked,
    overviewTitle:
      lessonBlueprint.overviewTitle ?? defaultContent?.overviewTitle,
    overviewSummary:
      lessonBlueprint.overviewSummary ?? defaultContent?.overviewSummary,
    overviewTopics:
      lessonBlueprint.overviewTopics ?? defaultContent?.overviewTopics,
    roadOptionIllustrations: lessonBlueprint.roadOptionIllustrations,
    lessons,
  };
}

let globalLessonIndex = 1;

export const learningUnits = unitBlueprints.map((unit, unitIndex) => {
  const lessons = lessonBlueprints[unitIndex].map(
    (lessonBlueprint, lessonIndex) =>
      createLesson(unit, lessonBlueprint, lessonIndex + 1, globalLessonIndex++),
  );
  const completedSubLessons = lessons.reduce(
    (sum, lesson) =>
      sum + lesson.lessons.filter((entry) => entry.completed).length,
    0,
  );
  const totalSubLessons = lessons.reduce(
    (sum, lesson) => sum + lesson.lessons.length,
    0,
  );
  const completedLessons = lessons.filter((lesson) =>
    lesson.lessons.every((entry) => entry.completed),
  ).length;

  return {
    ...unit,
    lessons,
    completedSubLessons,
    totalSubLessons,
    completedLessons,
    progress: totalSubLessons
      ? Math.round((completedSubLessons / totalSubLessons) * 100)
      : 0,
  };
});

export const learningDays = learningUnits.flatMap((unit) => unit.lessons);

export const learningDayIds = learningDays.map((lesson) => lesson.id);

export const learningOverview = {
  totalUnits: learningUnits.length,
  totalLessons: learningDays.length,
  totalSubLessons: learningDays.reduce(
    (sum, lesson) => sum + lesson.lessons.length,
    0,
  ),
  unlockedLessons: learningDays.filter((lesson) => !lesson.isLocked).length,
};

export function getLearningDay(dayId) {
  return learningDays.find((lesson) => lesson.id === dayId);
}

export function getLearningUnit(unitId) {
  return learningUnits.find((unit) => unit.id === unitId);
}

export function getLearningDayHref(dayId) {
  return `/content/${dayId}`;
}

export function getSubLessonHref(lessonId, stepId) {
  return `/subLearn/${lessonId}/${stepId}`;
}

export function getLearningStep(dayId, stepId) {

  const lesson = getLearningDay(dayId);

  if (!lesson) {
    return null;
  }

  const step = lesson.lessons.find((entry) => entry.id === stepId);

  if (!step) {
    return null;
  }

  return { lesson, step };
}

export function getLearningStepHref(dayId, stepId) {
  return `/content/${dayId}/steps/${stepId}`;
}
