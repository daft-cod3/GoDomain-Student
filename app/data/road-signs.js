const prioritySigns = [
  {
    id: "stop",
    label: "Stop",
    caption: "Come to a complete stop before moving through the junction.",
    shape: "octagon",
    family: "priority",
    text: "STOP",
    placement:
      "Placed at high-risk junctions, railway approaches, and intersections with restricted visibility.",
    reason:
      "It forces every driver to pause and confirm the road is clear before joining moving traffic.",
    penalties: [
      "A traffic citation, fine, or demerit points may follow if you roll through it.",
      "Ignoring it can also increase liability when a collision happens at the junction.",
    ],
    precautions: [
      "Stop fully before the line, not after it.",
      "Scan both directions again before accelerating away.",
    ],
  },
  {
    id: "give-way",
    label: "Give way",
    caption: "Yield to road users already on the priority road.",
    shape: "yield",
    family: "priority",
    text: "YIELD",
    placement:
      "Common at merge points, roundabout entries, and minor roads joining major roads.",
    reason:
      "It reduces conflict by making drivers on the less protected approach wait for safe gaps.",
    penalties: [
      "Failure to yield can lead to a fine and fault assignment after a crash.",
      "Unsafe entry may also trigger dangerous-driving penalties.",
    ],
    precautions: [
      "Slow early and be ready to stop if the gap closes.",
      "Watch for pedestrians, cyclists, and motorcycles before entering.",
    ],
  },
  {
    id: "priority-road",
    label: "Priority road",
    caption: "Traffic on this road has right of way at upcoming intersections.",
    shape: "diamond",
    family: "priority",
    text: "P",
    placement:
      "Installed along through-routes where uninterrupted flow is needed across several junctions.",
    reason:
      "It tells drivers on the marked road that cross traffic should yield unless another sign overrides it.",
    penalties: [
      "Cross traffic that fails to respect the sign may face right-of-way offences.",
      "Misreading the sign can lead to careless entry and collision responsibility.",
    ],
    precautions: [
      "Stay alert even when you have priority because other drivers can still make mistakes.",
      "Check for new signs that end or modify the priority section.",
    ],
  },
  {
    id: "end-priority-road",
    label: "End priority",
    caption:
      "The priority section ends and the next junction needs extra caution.",
    shape: "diamond",
    family: "priority",
    mark: "slash",
    placement:
      "Placed shortly before the point where a priority route returns to normal junction rules.",
    reason:
      "It prevents drivers from assuming they still have right of way after the protected stretch has ended.",
    penalties: [
      "Driving through the next junction as if you still have priority may result in a right-of-way offence.",
      "Causing an avoidable conflict can also trigger careless-driving action.",
    ],
    precautions: [
      "Reduce speed and reassess the junction ahead.",
      "Look for stop, yield, traffic-light, or roundabout controls after the sign.",
    ],
  },
  {
    id: "priority-over-oncoming",
    label: "Priority over oncoming",
    caption:
      "You may pass the narrow section first while oncoming traffic waits.",
    shape: "square",
    family: "priority",
    text: ">",
    placement:
      "Installed before narrow bridges, pinch points, and roadworks where only one direction should move at a time.",
    reason:
      "It manages single-lane conflicts by giving one approach the legal right to move first.",
    penalties: [
      "If you misuse the sign and create a blockage, you may still be cited for obstruction or careless driving.",
      "Collisions inside the narrow section can carry full liability if you entered unsafely.",
    ],
    precautions: [
      "Check that the space is actually clear before entering.",
      "Do not force the priority if a vulnerable road user is already inside the section.",
    ],
  },
  {
    id: "give-priority-to-oncoming",
    label: "Give priority to oncoming",
    caption:
      "Oncoming traffic has the right to pass first through the narrow section.",
    shape: "square",
    family: "priority",
    text: "<",
    placement:
      "Used on the approach that must wait at a single-lane bridge, roadworks lane, or choke point.",
    reason:
      "It prevents drivers from entering a narrow space when there is not enough room for two-way movement.",
    penalties: [
      "Entering against the sign can lead to obstruction and right-of-way offences.",
      "If you trap another vehicle in the restricted section, penalties may increase after the incident.",
    ],
    precautions: [
      "Stop before the entry if oncoming traffic is already committed.",
      "Wait for the full route to clear instead of squeezing through late.",
    ],
  },
];

const prohibitorySigns = [
  {
    id: "no-entry",
    label: "No entry",
    caption: "Entry is forbidden from this direction.",
    shape: "circle",
    family: "prohibitory",
    mark: "bar",
    placement:
      "Placed at one-way exits, restricted compounds, and roads that must not be entered from a given side.",
    reason:
      "It prevents head-on conflicts and keeps traffic flowing in the intended direction.",
    penalties: [
      "Driving past it can attract a heavy fine, points, or prosecution depending on the location.",
      "Entering a controlled area against the sign may also void insurance claims after a crash.",
    ],
    precautions: [
      "Look for a legal alternative route before turning.",
      "Check lane arrows and road markings before approaching the sign.",
    ],
  },
  {
    id: "no-parking",
    label: "No parking",
    caption: "Parking is not allowed within the marked stretch.",
    shape: "circle",
    family: "prohibitory",
    text: "P",
    mark: "slash",
    placement:
      "Used near bus stops, junction corners, school gates, and emergency access areas.",
    reason:
      "It keeps visibility open and prevents parked vehicles from blocking flow or emergency movement.",
    penalties: [
      "You may receive a parking ticket, wheel clamp, or towing charge.",
      "Blocking a critical access point can lead to a higher penalty.",
    ],
    precautions: [
      "Read any time plates below the sign before leaving the vehicle.",
      "Move to a clearly marked legal parking zone instead of stopping nearby.",
    ],
  },
  {
    id: "no-stopping",
    label: "No stopping",
    caption: "Do not stop, wait, or park in this area.",
    shape: "circle",
    family: "prohibitory",
    text: "X",
    placement:
      "Common on clearways, emergency routes, and stretches where any halt creates immediate danger or congestion.",
    reason:
      "It protects traffic flow where even a brief stop can cause queues or block sight lines.",
    penalties: [
      "Stopping can trigger instant enforcement, fines, or vehicle removal.",
      "Causing a hazardous obstruction may lead to further charges.",
    ],
    precautions: [
      "Keep moving unless an emergency makes stopping unavoidable.",
      "Plan drop-off and pickup points before entering the restricted stretch.",
    ],
  },
  {
    id: "speed-limit-50",
    label: "50 km/h",
    caption: "Maximum legal speed is fifty kilometres per hour.",
    shape: "circle",
    family: "prohibitory",
    text: "50",
    placement:
      "Placed at the start of urban streets, work zones, and areas with high pedestrian activity.",
    reason:
      "It matches the road environment to a safer speed for stopping distance and impact reduction.",
    penalties: [
      "Speeding can result in fines, points, licence suspension, or court action.",
      "Higher excess speeds often carry stricter penalties and insurance consequences.",
    ],
    precautions: [
      "Check your speed early after passing the sign.",
      "Adjust further down if traffic, weather, or visibility makes 50 km/h unsafe.",
    ],
  },
  {
    id: "no-u-turn",
    label: "No U-turn",
    caption: "Do not reverse direction at this point.",
    shape: "circle",
    family: "prohibitory",
    text: "U",
    mark: "slash",
    placement:
      "Used near medians, junctions, school zones, and roads with limited turning space.",
    reason:
      "It prevents turning conflicts where a U-turn would cut across fast or complex traffic streams.",
    penalties: [
      "Illegal turning can bring a fine and licence points.",
      "If the turn causes a crash or near-miss, further dangerous-driving action may follow.",
    ],
    precautions: [
      "Continue to the next legal turning point or roundabout.",
      "Do not improvise a multi-point turn on a live carriageway.",
    ],
  },
  {
    id: "no-overtaking",
    label: "No overtaking",
    caption: "Passing another moving vehicle is prohibited here.",
    shape: "circle",
    family: "prohibitory",
    text: "OV",
    mark: "slash",
    placement:
      "Placed on bends, hills, bridges, and roads with poor forward visibility.",
    reason:
      "It removes risky overtaking where drivers cannot clearly judge opposing traffic or escape space.",
    penalties: [
      "Illegal overtaking can lead to serious fines, points, or prosecution.",
      "If the manoeuvre endangers others, the penalty usually increases sharply.",
    ],
    precautions: [
      "Stay behind the lead vehicle until the restriction ends.",
      "Use extra following distance so you are not pressured into a late pass.",
    ],
  },
  {
    id: "no-left-turn",
    label: "No left turn",
    caption: "Turning left is not allowed at the junction ahead.",
    shape: "circle",
    family: "prohibitory",
    text: "L",
    mark: "slash",
    placement:
      "Installed at busy junctions, one-way systems, and crossings where left-turn conflicts are high.",
    reason:
      "It keeps vehicles away from turn paths that would interfere with heavy flow or vulnerable users.",
    penalties: [
      "Disobeying it can result in a moving-traffic fine or prosecution.",
      "Entering a prohibited turn lane may also trigger camera enforcement.",
    ],
    precautions: [
      "Watch the advance directional signs and lane arrows before the junction.",
      "Use the signed alternative turn or next permitted access point.",
    ],
  },
  {
    id: "no-horns",
    label: "No horns",
    caption: "Use of the horn is restricted in this area.",
    shape: "circle",
    family: "prohibitory",
    text: "H",
    mark: "slash",
    placement:
      "Often found near hospitals, schools, and quiet zones where noise control matters.",
    reason:
      "It reduces unnecessary noise and protects sensitive environments without removing true emergency use.",
    penalties: [
      "Improper horn use can lead to a noise or traffic offence.",
      "Repeated or aggressive use may escalate the penalty.",
    ],
    precautions: [
      "Rely on speed control and observation instead of sound warnings.",
      "Use the horn only when an immediate safety threat exists and the law allows it.",
    ],
  },
];

const warningSigns = [
  {
    id: "sharp-bend-left",
    label: "Sharp bend",
    caption: "A strong bend appears ahead and needs early speed reduction.",
    shape: "triangle",
    family: "warning",
    text: "BEND",
    placement:
      "Placed before a severe curve where the alignment changes quickly and sight distance is reduced.",
    reason:
      "It gives drivers enough time to lower speed and choose a stable lane position before the bend.",
    penalties: [
      "There is usually no direct penalty for the sign itself, but failing to slow can lead to speeding or careless-driving offences.",
      "Crashing after ignoring the warning can increase liability.",
    ],
    precautions: [
      "Brake before the bend, not during the sharpest point.",
      "Hold a smooth steering line and avoid overtaking.",
    ],
  },
  {
    id: "crossroad-ahead",
    label: "Crossroad ahead",
    caption: "An intersection is approaching and cross traffic may appear.",
    shape: "triangle",
    family: "warning",
    text: "CROSS",
    placement:
      "Set in advance of junctions where the road layout makes cross traffic less obvious.",
    reason:
      "It prepares drivers for new conflict points and a possible change in right-of-way decisions.",
    penalties: [
      "Ignoring the warning can lead indirectly to right-of-way or careless-driving penalties.",
      "If you enter too fast and cause a crash, enforcement becomes more severe.",
    ],
    precautions: [
      "Ease off the accelerator and scan left and right early.",
      "Look for stop, yield, or traffic-light control as you close in.",
    ],
  },
  {
    id: "school-ahead",
    label: "School ahead",
    caption: "Expect children, school patrols, and sudden crossing movement.",
    shape: "triangle",
    family: "warning",
    text: "SCH",
    placement:
      "Installed before school entrances, pedestrian crossings, and school-zone speed transitions.",
    reason:
      "Children may be less predictable, so the sign prompts earlier speed and scanning adjustments.",
    penalties: [
      "Speeding or failing to give way in a school zone often carries heavier penalties.",
      "Endangering children can lead to major licence and insurance consequences.",
    ],
    precautions: [
      "Reduce speed before reaching the active school area.",
      "Watch pavements, parked vehicles, and crossing supervisors closely.",
    ],
  },
  {
    id: "slippery-road",
    label: "Slippery road",
    caption: "Surface grip may reduce, especially in rain or loose material.",
    shape: "triangle",
    family: "warning",
    text: "SKID",
    placement:
      "Used near polished asphalt, steep shaded sections, spill-prone routes, and bridge decks.",
    reason:
      "It warns drivers that stopping distance and steering control may degrade suddenly.",
    penalties: [
      "The sign itself is advisory, but losing control through excessive speed can lead to careless-driving charges.",
      "Collisions caused by poor adjustment can attract full liability.",
    ],
    precautions: [
      "Increase following distance and reduce speed smoothly.",
      "Avoid harsh braking, fast steering, and abrupt acceleration.",
    ],
  },
  {
    id: "pedestrian-crossing",
    label: "Pedestrian crossing",
    caption: "A marked crossing is near and people may step onto the road.",
    shape: "triangle",
    family: "warning",
    text: "PED",
    placement:
      "Placed in advance of zebra crossings, signal crossings, and busy foot traffic areas.",
    reason:
      "It alerts drivers to expect sudden changes from pedestrians entering the carriageway.",
    penalties: [
      "Failing to yield at a crossing can lead to fines and points.",
      "Hitting or endangering a pedestrian usually leads to serious enforcement.",
    ],
    precautions: [
      "Cover the brake and watch both sides of the crossing approach.",
      "Do not overtake vehicles that are already slowing for the crossing.",
    ],
  },
  {
    id: "steep-descent",
    label: "Steep descent",
    caption: "A downhill section ahead may quickly increase vehicle speed.",
    shape: "triangle",
    family: "warning",
    text: "HILL",
    placement:
      "Posted before long or steep descents where braking distance and vehicle control become critical.",
    reason:
      "It reminds drivers to select the right gear and control speed before gravity builds momentum.",
    penalties: [
      "There may be no direct sign penalty, but brake failure or loss of control can lead to major offences.",
      "Heavy vehicles may face extra enforcement if downhill control rules are ignored.",
    ],
    precautions: [
      "Choose an appropriate gear before starting down the slope.",
      "Use controlled braking and leave more space than usual.",
    ],
  },
  {
    id: "narrow-bridge",
    label: "Narrow bridge",
    caption: "The bridge ahead restricts lane width and side clearance.",
    shape: "triangle",
    family: "warning",
    text: "BRDG",
    placement:
      "Installed before old bridges, temporary bridges, and constricted crossings with reduced clearance.",
    reason:
      "It warns drivers to line up early and avoid meeting conflicts in the narrowed section.",
    penalties: [
      "There is usually no direct penalty for the warning sign, but side-swiping or obstruction may lead to enforcement.",
      "Driving too fast into the bridge can result in careless-driving charges after an incident.",
    ],
    precautions: [
      "Center the vehicle early and slow before entry.",
      "Yield where necessary and avoid overtaking near the bridge.",
    ],
  },
];

const informativeSigns = [
  {
    id: "parking",
    label: "Parking",
    caption: "A legal parking area is available ahead or beside the road.",
    shape: "square",
    family: "informative",
    text: "P",
    placement:
      "Placed near designated bays, off-street car parks, and public parking facilities.",
    reason:
      "It helps drivers find legal stopping locations instead of using unsafe or prohibited shoulders.",
    penalties: [
      "There is no penalty for the sign itself, but parking outside the designated area can still be enforced.",
      "Misreading additional plates may result in a ticket or clamp.",
    ],
    precautions: [
      "Check any time, payment, or vehicle-class restrictions attached below the sign.",
      "Enter and leave the bay slowly while watching pedestrians.",
    ],
  },
  {
    id: "hospital",
    label: "Hospital",
    caption: "Hospital services are available nearby.",
    shape: "square",
    family: "informative",
    text: "H",
    placement:
      "Installed on routes leading to hospitals, emergency wings, and medical access corridors.",
    reason:
      "It guides drivers and emergency visitors quickly to essential medical facilities.",
    penalties: [
      "There is no penalty tied to the sign, but obstructing hospital access roads can bring enforcement.",
      "Parking or sounding horns unlawfully in the zone may still be penalized.",
    ],
    precautions: [
      "Expect ambulances and priority vehicles near the facility.",
      "Keep noise low and obey any hospital-zone restrictions.",
    ],
  },
  {
    id: "bus-stop",
    label: "Bus stop",
    caption: "Public transport stops here or just ahead.",
    shape: "square",
    family: "informative",
    text: "BUS",
    placement:
      "Positioned at official boarding points on urban routes and highway service corridors.",
    reason:
      "It marks where buses will enter or leave the lane and where passengers may gather close to traffic.",
    penalties: [
      "Blocking the stop, parking in it, or passing unsafely may attract traffic fines.",
      "Endangering boarding passengers can lead to stronger sanctions.",
    ],
    precautions: [
      "Watch for buses rejoining the lane and passengers stepping out.",
      "Do not stop in the marked bay unless authorized.",
    ],
  },
  {
    id: "fuel-station",
    label: "Fuel station",
    caption: "Fuel and basic service support are available nearby.",
    shape: "square",
    family: "informative",
    text: "FUEL",
    placement:
      "Used along long-distance routes, urban corridors, and service roads leading to filling stations.",
    reason:
      "It helps drivers plan fuel stops early instead of making sudden risky turns or lane changes.",
    penalties: [
      "No direct penalty attaches to the sign, but unsafe late manoeuvres into the station can be enforced.",
      "Breaking station access rules may also result in private-site penalties.",
    ],
    precautions: [
      "Signal and position early before turning into the station.",
      "Watch for vehicles exiting slowly or rejoining traffic suddenly.",
    ],
  },
  {
    id: "one-way",
    label: "One way",
    caption: "Traffic on this road moves in a single direction.",
    shape: "square",
    family: "informative",
    text: "ONE",
    placement:
      "Placed at entries to one-way streets and repeated at key junctions within the system.",
    reason:
      "It guides lane choice and prevents drivers from turning into opposing flow.",
    penalties: [
      "Driving against the one-way direction can bring heavy fines and licence penalties.",
      "A collision while going the wrong way usually attracts serious liability.",
    ],
    precautions: [
      "Confirm the direction before turning onto the street.",
      "Check for matching no-entry signs at the opposite end.",
    ],
  },
  {
    id: "first-aid",
    label: "First aid",
    caption: "Basic medical assistance is available nearby.",
    shape: "square",
    family: "informative",
    text: "AID",
    placement:
      "Common near service areas, highway stops, and organized public facilities.",
    reason:
      "It helps road users locate immediate medical help before reaching a full hospital facility.",
    penalties: [
      "There is no direct penalty for this sign, but blocking access to the facility may be enforced.",
      "Abusing reserved stopping space can also attract penalties.",
    ],
    precautions: [
      "Slow down early if you intend to turn into the facility.",
      "Keep the entrance clear for emergency access.",
    ],
  },
  {
    id: "pedestrian-subway",
    label: "Pedestrian subway",
    caption: "A pedestrian underpass is provided nearby.",
    shape: "square",
    family: "informative",
    text: "SUB",
    placement:
      "Installed near major roads where pedestrians are directed to cross below traffic level.",
    reason:
      "It channels foot traffic toward safer crossing points and reduces mid-road crossing risk.",
    penalties: [
      "There is no direct penalty for the sign, but drivers must still obey any nearby pedestrian controls.",
      "Stopping on the approach or blocking the access path may still be enforced.",
    ],
    precautions: [
      "Expect pedestrians to gather near the entrance and exit points.",
      "Keep speeds controlled because people may still surface near the road edge.",
    ],
  },
];

export const roadSignCategories = [
  {
    id: "regulatory",
    title: "Regulatory",
    description:
      "Mandatory instructions and right-of-way rules used on active roads.",
    groups: [
      {
        id: "priority",
        title: "Priority",
        description:
          "Signs that control right of way at junctions and conflict points.",
        signs: prioritySigns,
      },
      {
        id: "prohibitory",
        title: "Prohibitory",
        description: "Mandatory restrictions on movement, speed, and access.",
        signs: prohibitorySigns,
      },
    ],
  },
  {
    id: "warning",
    title: "Warning",
    description:
      "Advance notice of hazards, changes in alignment, and risk points.",
    groups: [
      {
        id: "warning-core",
        title: "Warning signs",
        description:
          "Hazard signs that require a slower and more observant approach.",
        signs: warningSigns,
      },
    ],
  },
  {
    id: "informative",
    title: "Informative",
    description:
      "Signs that point out services, facilities, and travel support.",
    groups: [
      {
        id: "informative-core",
        title: "Informative signs",
        description:
          "Service and direction support for smooth route decisions.",
        signs: informativeSigns,
      },
    ],
  },
];

export const roadSigns = roadSignCategories.flatMap((category) =>
  category.groups.flatMap((group) =>
    group.signs.map((sign) => ({
      ...sign,
      categoryId: category.id,
      categoryTitle: category.title,
      groupId: group.id,
      groupTitle: group.title,
    })),
  ),
);

export const roadSignIds = roadSigns.map((sign) => sign.id);

export function getRoadSignById(signId) {
  return roadSigns.find((sign) => sign.id === signId);
}

export function getRoadSignHref(signId) {
  return `/road-signs/${signId}`;
}
